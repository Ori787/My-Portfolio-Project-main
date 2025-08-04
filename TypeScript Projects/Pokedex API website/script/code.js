"use strict";
// Pokedex API functionality
let apiUrl = "https://pokeapi.co/api/v2/pokemon";
const characterPlace = document.querySelector("#characterplace");
const searchInput = document.querySelector("#searchinput");
const nameElement = document.querySelector("#name");
const picElement = document.querySelector("#pic");
const expElement = document.querySelector("#exp");
const updateImg = (imgurl) => {
    if (picElement) {
        picElement.src = imgurl;
        picElement.alt = "Pokémon profile picture";
    }
};
const showError = (message) => {
    if (nameElement) {
        nameElement.innerText = `Error: ${message}`;
    }
    if (picElement) {
        picElement.src = "";
        picElement.alt = "No image available";
    }
    if (expElement) {
        expElement.innerText = "";
    }
};
const showLoading = () => {
    if (nameElement) {
        nameElement.innerText = "Loading...";
    }
    if (expElement) {
        expElement.innerText = "";
    }
};
const pokedexData = async () => {
    try {
        if (searchInput) {
            searchInput.addEventListener("keydown", async (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    const character = searchInput.value.trim().toLowerCase();
                    if (character) {
                        showLoading();
                        try {
                            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${character}`);
                            if (!response.ok) {
                                throw new Error(`Pokémon not found: ${character}`);
                            }
                            const data = await response.json();
                            console.log(data);
                            const name = data.name;
                            if (nameElement) {
                                nameElement.innerText =
                                    name.charAt(0).toUpperCase() + name.slice(1);
                            }
                            const imageUrl = data.sprites.front_default;
                            if (imageUrl) {
                                updateImg(imageUrl);
                            }
                            else {
                                if (picElement) {
                                    picElement.src = "";
                                    picElement.alt = "No image available";
                                }
                            }
                            const exp = data.base_experience;
                            if (expElement) {
                                expElement.innerText = `Base EXP: ${exp}`;
                            }
                        }
                        catch (error) {
                            console.error("Error fetching Pokémon:", error);
                            showError(error instanceof Error
                                ? error.message
                                : "Failed to fetch Pokémon");
                        }
                    }
                }
            });
        }
    }
    catch (error) {
        console.error("Error initializing Pokedex:", error);
        showError("Failed to initialize Pokedex");
    }
};
// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    pokedexData();
});
//# sourceMappingURL=code.js.map