from django.contrib import admin
from django.urls import path, include
from app.poke_dex import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.poke_dex.urls')),
    path('pokemon/<str:pokemon_name>/', views.pokemon_info, name='pokemon_info'),
]
