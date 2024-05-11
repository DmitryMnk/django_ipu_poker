from django.shortcuts import render
from django.views.generic import TemplateView
from .models import *


def get_table():
    w_headers = WhiteListHeaders.objects.all()
    b_headers = BlackListHeaders.objects.all()
    b_rows = BlackListRow.objects.all()
    w_rows = WhiteListRow.objects.all()
    return w_headers, b_headers, b_rows, w_rows


class MainView(TemplateView):
    template_name = 'main_page/main.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update({
            'title': ''
        })
        return context


class TablesView(TemplateView):
    template_name = 'main_page/lists.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        w_headers, b_headers, b_rows, w_rows = get_table()
        context.update({
            'title': 'Черный список',
            'w_headers': w_headers,
            'b_headers': b_headers,
            'w_rows': w_rows,
            'b_rows': b_rows
        })
        return context