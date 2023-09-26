document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("button-search");
    const input = document.getElementById("input_poke");
    const pokemonImage = document.getElementById("pokemonImage");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    
    let currentPokemonId = 1;

    
    function loadDefaultPokemon() {
        getPokemonInfo(currentPokemonId);
    }

    button.addEventListener("click", function () {
        const inputValue = input.value.trim();
        getPokemonInfo(inputValue);
        input.value = "";
    });
    
    prevButton.addEventListener("click", function () {
        const previousPokemonId = currentPokemonId - 1;
        if (previousPokemonId >= 1) {
            currentPokemonId = previousPokemonId;
            getPokemonInfo(currentPokemonId);
    
            input.value = "";
        }
    });
    
    nextButton.addEventListener("click", function () {
        if (input.value.trim() !== "") {
            
            const inputValue = input.value.trim();
            getPokemonInfo(inputValue);
        } else {
            
            const nextPokemonId = currentPokemonId + 1;
            currentPokemonId = nextPokemonId;
            getPokemonInfo(currentPokemonId);
    
            
            input.value = "";
        }
    });

    function getPokemonInfo(pokemonId) {
        const cachedData = localStorage.getItem(`pokemon_${pokemonId}`);
        if (cachedData) {
            
            const data = JSON.parse(cachedData);
            updatePage(data);
        } else {
            
            fetch(`/pokemon/${pokemonId}/`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na requisição.');
                    }
                    return response.json();
                })
                .then(data => {
                    if ("error" in data) {
                        alert(data["error"]);
                    } else {
                        localStorage.setItem(`pokemon_${pokemonId}`, JSON.stringify(data));
                        updatePage(data);
                    }
                })
                .catch(error => {
                    console.error(error);
                    alert('Erro na requisição.');
                });
        }
    }

    function updatePage(data) {
        document.getElementById("label_id").textContent = data["id"] + " - ";
        document.getElementById("label_name").textContent = data["name"];
        pokemonImage.src = data["sprite"];
    }

    loadDefaultPokemon();
});
