# rest imports
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer, OrderSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        message = {'detail': 'No Order Item'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST) #Error when no item in cart
    else:
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            subtotal_price=data['subtotalPrice'],
            tax_price=data['taxPrice'],
            shipping_price=data['shippingPrice'],
            total_price=data['totalPrice'],
        )

        if (data['shippingAddress']['aptAddress'] != ""):
            apt_address = data['shippingAddress']['aptAddress']
        else:
            apt_address = ""

        shipping = ShippingAddress.objects.create(
            order=order,
            street_address=data['shippingAddress']['streetAddress'],
            apt_address=apt_address,
            city=data['shippingAddress']['city'],
            state=data['shippingAddress']['state'],
            zip=data['shippingAddress']['zip'],
            shipping_price=data['shippingPrice'],
        )

        for item in orderItems:
            product = Product.objects.get(_id=item['productId'])
            orderItem = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                quantity=item['qty'],
                price=item['price'],
                image=product.image.url,
            )

            product.countInStock -= orderItem.quantity
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)