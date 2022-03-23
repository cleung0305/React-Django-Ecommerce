from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse

# rest imports
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product, Order, OrderItem, Review, ShippingAddress
from .serializers import ProductSerializer

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    return Response('Hello')

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.filter(isPublished=True)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)