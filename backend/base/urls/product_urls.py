from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name="get-products"),
    path('<str:pk>/', views.getProduct, name="get-product"),
    path('admin/all-products/', views.getProductList, name="get-all-products"),
    path('admin/create/', views.createProduct, name="create-product"),
    path('admin/update-product/<str:pk>/', views.updateProduct, name="update-product"),
    path('admin/delete-product/<str:pk>/', views.deleteProduct, name="delete-product"),
]
