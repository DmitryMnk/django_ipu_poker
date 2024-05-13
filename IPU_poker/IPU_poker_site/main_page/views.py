from sqlite3 import OperationalError

from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.template import RequestContext
from django.views.generic import TemplateView
from django.db import connection

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
            'title': 'Главная - ipokerunion'
        })
        return context


class TablesView(TemplateView):
    template_name = 'main_page/lists.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        title = 'Черный список - ipokerunion'
        try:
            if not connection.introspection.table_names():
                raise OperationalError
            else:
                w_headers, b_headers, b_rows, w_rows = get_table()
                context.update({
                    'status': True,
                    'title': title,
                    'w_headers': w_headers,
                    'b_headers': b_headers,
                    'w_rows': w_rows,
                    'b_rows': b_rows
                })
        except OperationalError as e:
            context.update({
                'status': False,
                'title': title,
            })
        return context
