from django.urls import path
from .views import UserList, UserDatail

urlpatterns = [
    path('users/', UserList.as_view()),
    path('users/<int:pk>/', UserDatail.as_view()),
]
