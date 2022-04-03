from django.urls import path
from . import views

urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.registerUser, name='register-user'),
    path('users/profile/', views.getUserProfile, name="get-users-profile"),
    path('users/', views.getUsers, name="get-users"),
    path('products/', views.getProducts, name="get-products"),
    path('products/<str:pk>/', views.getProduct, name="get-product"),
]
