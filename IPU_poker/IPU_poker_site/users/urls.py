from django.urls import path

from .views import *

urlpatterns = [
    path('login_admin/', LoginAdminView.as_view(), name='login'),
    path('logout_admin/', logout_view, name='logout'),
    path('admin_panel/', AdminPanelView.as_view(), name='admin_panel'),
    path('create_wrow/', CreateWRowView.as_view(), name='create_wrow'),
    path('create_brow/', CreateBRowView.as_view(), name='create_brow'),
    path('update_brow/<int:pk>', UpdateBRowView.as_view(), name='update_brow'),
    path('update_wrow/<int:pk>', UpdateWRowView.as_view(), name='update_wrow'),
    path('update_bhead/<int:pk>', UpdateBHeadView.as_view(), name='update_bhead'),
    path('update_whead/<int:pk>', UpdateWHeadView.as_view(), name='update_whead'),
    path('delete_wrow/<int:pk>', delete_wrow, name='delete_wrow'),
    path('delete_brow/<int:pk>', delete_brow, name='delete_brow'),
]