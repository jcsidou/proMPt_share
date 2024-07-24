from rest_framework import viewsets
from .models import Model, Category, Role, Prompt
from .serializers import ModelSerializer, CategorySerializer, RoleSerializer, PromptSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.exceptions import TokenError 
import logging
import json

logger = logging.getLogger(__name__)
class ModelViewSet(viewsets.ModelViewSet):
    queryset = Model.objects.all()
    serializer_class = ModelSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class PromptViewSet(viewsets.ModelViewSet):
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = Prompt.objects.all()
        model = self.request.query_params.get('model')
        category = self.request.query_params.get('category')
        if model:
            queryset = queryset.filter(model=model)
        if category:
            queryset = queryset.filter(categories__id=category)
        return queryset

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        print("Received data:", data)  # Log dos dados recebidos
        if 'temperature' in data and data['temperature'] == '':
            data['temperature'] = None
        if 'categories' in data:
            data['categories'] = json.loads(data['categories'])
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        print(request.data)  # Log para verificar os dados recebidos
        return super().post(request, *args, **kwargs)
    
class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            logger.info(f"Received refresh token: {refresh_token}")
            token = RefreshToken(refresh_token)
            token.blacklist()
            logger.info("Token blacklisted successfully")
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except KeyError as e:
            logger.error(f"KeyError: {e}")
            return Response({"detail": "Refresh token not provided."}, status=status.HTTP_400_BAD_REQUEST)
        except TokenError as e:
            logger.error(f"TokenError: {e}")
            return Response({"detail": "Invalid refresh token."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Exception: {e}")
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)