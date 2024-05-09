from django.contrib import admin
from .models import *

admin.site.register(WhiteListHeaders)
admin.site.register(BlackListHeaders)
admin.site.register(BlackListRow)
admin.site.register(WhiteListRow)
