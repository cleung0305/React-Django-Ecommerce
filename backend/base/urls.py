from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="get-routes"),
    path('products/', views.getProducts, name="get-products"),
    path('products/<str:pk>', views.getProduct, name="get-product"),
]
