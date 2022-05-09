from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

# rest imports
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from base.serializers import UserSerializer, UserSerializerWithToken

# SimpleJWT imports
from rest_framework_simplejwt.views import TokenObtainPairView
from base.serializers import MyTokenObtainPairSerializer

# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView): #Customize JWT token View
    serializer_class = MyTokenObtainPairSerializer #Initialize the Token serializer

@api_view(['POST'])
def registerUser(request) -> Response:
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email address already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request) -> Response: # Checkout your user profile
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()
    
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request) -> Response: # Checkout your user profile
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request) -> Response: # get all users in the database
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk) -> Response:
    userToDelete = User.objects.get(id=pk)
    if userToDelete.is_staff:
        message = {'detail': 'You cannot delete an admin user'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    else:
        userToDelete.delete()
        return Response('User is deleted')