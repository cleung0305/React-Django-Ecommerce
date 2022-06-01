# rest imports
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from base.models import Product, Review
from base.serializers import ProductSerializer

# Create your views here.

@api_view(['GET'])
def getProducts(request): # get all products
    products = Product.objects.filter(isPublished=True).order_by('-created_at')
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk): # get single product
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getProductList(request): # get product list admin page
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample',
        brand='Sample',
        category='Sample',
        description='Sample',
        price=0,
        countInStock=0,
        isPublished=False
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
        data = request.data

        product.name = data['name']
        product.brand = data['brand']
        product.category = data['category']
        product.description = data['description']
        product.price = data['price']
        product.countInStock = data['countInStock']
        product.isPublished = data['isPublished']

        product.save()

        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    except Product.DoesNotExist:
        message = {'detail': 'Product with this ID does not exist'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk) -> Response:
    try:
        productToDelete = Product.objects.get(_id=pk)
        productName = productToDelete.name
        productToDelete.delete()
        return Response(f'Product {productName} has been deleted')
    except Product.DoesNotExist:
        message = {'detail': 'Product with this ID does not exist'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def uploadImage(request):
    data = request.data

    productId = data['productId']
    product = Product.objects.get(_id=productId)

    product.image = request.FILES.get('image')
    product.save()
    return Response('Image uploaded')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 User already wrote a review
    if product.review_set.filter(user=user).exists():
        message = {'detail': 'You have reviewed this product'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    # 2 User submitted a review w/o rating
    elif data['rating'] == 0 or data['rating'] == None:
        message = {'detail': 'Please provide a rating'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    # 3 Submit Review
    review = Review.objects.create(
        user=user,
        product=product,
        name=user.first_name,
        rating=data['rating'],
        comment=data['comment']
    )
    # ---Rating change on Product is handled by signal---
    
    return Response('Review posted')