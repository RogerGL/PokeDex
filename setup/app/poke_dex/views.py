from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import requests
from django.core.cache import cache  

def fetch_pokemon_data(pokemon_name):
   
    cached_data = cache.get(pokemon_name)
    if cached_data:
        return cached_data
    
    base_url = "https://pokeapi.co/api/v2/"
    url = f"{base_url}pokemon/{pokemon_name}/"
    
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
       
        cache.set(pokemon_name, {
            "name": data["name"],
            "id": data["id"],
            "type": data["types"],
            "sprite" : data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
        }, 3600)  
        
        return {
            "name": data["name"],
            "id": data["id"],
            "type": data["types"],
            "sprite" : data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
        }
    else:
        return {"error": "Falha na requisição"}

def index(request):
    return render(request, 'poke_dex/index.html')

def pokemon_info(request, pokemon_name):
    data = fetch_pokemon_data(pokemon_name)
    
    if "error" in data:
        return JsonResponse(data, status=400)
    else:
        return JsonResponse(data)
