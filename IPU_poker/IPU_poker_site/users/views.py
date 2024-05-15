from django.contrib.auth import logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render, get_object_or_404
from django.urls import reverse_lazy
from django.utils.translation import gettext
from django.views.generic import TemplateView, CreateView, UpdateView

from main_page.views import get_table

from main_page.models import *


class LoginAdminView(LoginView):
    template_name = 'users/login.html'

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('admin_panel')
        return render(request, self.template_name, self.get_context_data())


def logout_view(request: HttpRequest):
    logout(request)
    return redirect('login')


class AdminPanelView(LoginRequiredMixin, TemplateView):
    template_name = 'users/admin_panel.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        w_headers, b_headers, b_rows, w_rows = get_table()
        context.update({
            'title': 'Админ панель',
            'w_headers': w_headers,
            'b_headers': b_headers,
            'w_rows': w_rows,
            'b_rows': b_rows
        })
        return context


class CreateWRowView(LoginRequiredMixin, CreateView):
    template_name = 'users/create_row.html'
    model = WhiteListRow
    fields = 'col_1', 'col_2', 'col_3'
    success_url = reverse_lazy('admin_panel')

    def get_context_data(self, **kwargs):
        context = super(CreateWRowView, self).get_context_data(**kwargs)
        context.update({
            'list_info': 'Добавить строку в черный лист',
            'title': 'Добавить в белый лист'
        })
        return context


class CreateBRowView(LoginRequiredMixin, TemplateView):
    template_name = 'users/create_brow.html'

    def get_context_data(self, **kwargs):
        context = super(CreateBRowView, self).get_context_data(**kwargs)
        context.update({
            'list_info': 'Добавить строку в черный лист',
            'title': 'Добавить в черный лист'
        })
        return context

    @staticmethod
    def post(request):
        data = request.POST
        new_row = BlackListRow.objects.create(
            col_1=data['col_1'],
            col_3=data['col_3'],
            col_4=data['col_4'],
            col_5=data['col_5'],
            col_6=data['col_6'],
        )
        new_row.save()
        contacts = data.getlist('col_2')
        for contact in contacts:
            new_contact = ContactItem.objects.create(
                name=contact
            )
            new_contact.save()
            new_row.col_2.add(new_contact)

        return redirect('admin_panel')


class UpdateWRowView(LoginRequiredMixin, UpdateView):
    template_name = 'users/update.html'
    model = WhiteListRow
    fields = 'col_1', 'col_2', 'col_3'
    success_url = reverse_lazy('admin_panel')

    def get_context_data(self, **kwargs):
        context = super(UpdateWRowView, self).get_context_data(**kwargs)
        pk = self.get_object().pk
        row = WhiteListRow.objects.get(pk=pk)
        context.update({
            'list_info': 'Редактировать строку белого листа',
            'title': 'Редактировать строку б.л.',
        })
        return context


class UpdateBRowView(LoginRequiredMixin, TemplateView):
    template_name = 'users/updateb.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        pk = self.kwargs['pk']
        row = get_object_or_404(BlackListRow, pk=pk)
        context.update({
            'list_info': 'Редактировать строку черного листа',
            'title': 'Редактировать строку ч.л.',
            'row': row
        })
        return context

    def post(self, request, pk):
        row = get_object_or_404(BlackListRow, pk=pk)
        data = request.POST
        BlackListRow.objects.filter(pk=pk).update(
            col_1=data['col_1'],
            col_3=data['col_3'],
            col_4=data['col_4'],
            col_5=data['col_5'],
            col_6=data['col_6'],
        )

        for obj in row.col_2.all():
            row.col_2.remove(obj)
            obj.delete()

        contacts = data.getlist('col_2')
        for contact in contacts:
            new_contact = ContactItem.objects.create(
                name=contact
            )
            new_contact.save()
            row.col_2.add(new_contact)

        return redirect('admin_panel')


class UpdateBHeadView(LoginRequiredMixin, UpdateView):
    template_name = 'users/update.html'
    model = BlackListHeaders
    fields = 'name',
    success_url = reverse_lazy('admin_panel')

    def get_context_data(self, **kwargs):
        context = super(UpdateBHeadView, self).get_context_data(**kwargs)
        context.update({
            'list_info': 'Редактировать заголовок черного листа',
            'title': 'Редактировать заголовок ч.л.'
        })
        return context


class UpdateWHeadView(LoginRequiredMixin, UpdateView):
    template_name = 'users/update.html'
    model = WhiteListHeaders
    fields = 'name',
    success_url = reverse_lazy('admin_panel')

    def get_context_data(self, **kwargs):
        context = super(UpdateWHeadView, self).get_context_data(**kwargs)
        context.update({
            'list_info': 'Редактировать заголовок белого листа',
            'title': 'Редактировать заголовок б.л.'
        })
        return context


def delete_wrow(request: HttpRequest, pk: int) -> HttpResponse:
    if not request.user.is_authenticated:
        return redirect('main')
    try:
        row = WhiteListRow.objects.get(pk=pk)
        row.delete()
        return redirect('admin_panel')
    except Exception as error:
        return redirect('admin_panel')


def delete_brow(request: HttpRequest, pk: int) -> HttpResponse:
    if not request.user.is_authenticated:
        return redirect('main')
    try:
        row = BlackListRow.objects.get(pk=pk)
        row.delete()
        return redirect('admin_panel')
    except Exception as error:
        return redirect('admin_panel')
