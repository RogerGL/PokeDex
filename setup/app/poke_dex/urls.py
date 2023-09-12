from django.urls import path
from app.poke_dex.views import index

urlpatterns = [
    path('', index),
]
