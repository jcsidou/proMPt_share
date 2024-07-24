from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ModelViewSet, CategoryViewSet, RoleViewSet, PromptViewSet, RegisterView, LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

router = DefaultRouter()
router.register(r'models', ModelViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'roles', RoleViewSet)
router.register(r'prompts', PromptViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),  # Adicione esta linha
]
