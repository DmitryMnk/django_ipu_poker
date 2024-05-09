from django.contrib.auth import logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render
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


class CreateBRowView(LoginRequiredMixin, CreateView):
    template_name = 'users/create_row.html'
    model = BlackListRow
    fields = 'col_1', 'col_2', 'col_3', 'col_4', 'col_5', 'col_6',
    success_url = reverse_lazy('admin_panel')

    def get_context_data(self, **kwargs):
        context = super(CreateBRowView, self).get_context_data(**kwargs)
        context.update({
            'list_info': 'Добавить строку в черный лист',
            'title': 'Добавить в черный лист'
        })
        return context


class UpdateWRowView(LoginRequiredMixin, UpdateView):
    template_name = 'users/update.html'
    model = WhiteListRow
    fields = 'col_1', 'col_2', 'col_3'
    success_url = reverse_lazy('admin_panel')

    def get_context_data(self, **kwargs):
        context = super(UpdateWRowView, self).get_context_data(**kwargs)
        context.update({
            'list_info': 'Редактировать строку белого листа',
            'title': 'Редактировать строку б.л.'
        })
        return context


class UpdateBRowView(LoginRequiredMixin, UpdateView):
    template_name = 'users/update.html'
    model = BlackListRow
    fields = 'col_1', 'col_2', 'col_3', 'col_4', 'col_5', 'col_6',
    success_url = reverse_lazy('admin_panel')

    def get_context_data(self, **kwargs):
        context = super(UpdateBRowView, self).get_context_data(**kwargs)
        context.update({
            'list_info': 'Редактировать строку черного листа',
            'title': 'Редактировать строку ч.л.'
        })
        return context


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
