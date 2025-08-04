// Pokedex API functionality
let apiUrl: string = "https://pokeapi.co/api/v2/pokemon";
const characterPlace = document.querySelector(
  "#characterplace"
) as HTMLElement | null;
const searchInput = document.querySelector(
  "#searchinput"
) as HTMLInputElement | null;
const nameElement = document.querySelector("#name") as HTMLElement | null;
const picElement = document.querySelector("#pic") as HTMLImageElement | null;
const expElement = document.querySelector("#exp") as HTMLElement | null;

const updateImg = (imgurl: string): void => {
  if (picElement) {
    picElement.src = imgurl;
    picElement.alt = "Pokémon profile picture";
  }
};

const showError = (message: string): void => {
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

const showLoading = (): void => {
  if (nameElement) {
    nameElement.innerText = "Loading...";
  }
  if (expElement) {
    expElement.innerText = "";
  }
};

const pokedexData = async (): Promise<void> => {
  try {
    if (searchInput) {
      searchInput.addEventListener("keydown", async (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const character = searchInput.value.trim().toLowerCase();

          if (character) {
            showLoading();

            try {
              const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${character}`
              );

              if (!response.ok) {
                throw new Error(`Pokémon not found: ${character}`);
              }

              const data = await response.json();
              console.log(data);

              const name: string = data.name;
              if (nameElement) {
                nameElement.innerText =
                  name.charAt(0).toUpperCase() + name.slice(1);
              }

              const imageUrl: string = data.sprites.front_default;
              if (imageUrl) {
                updateImg(imageUrl);
              } else {
                if (picElement) {
                  picElement.src = "";
                  picElement.alt = "No image available";
                }
              }

              const exp: number = data.base_experience;
              if (expElement) {
                expElement.innerText = `Base EXP: ${exp}`;
              }
            } catch (error) {
              console.error("Error fetching Pokémon:", error);
              showError(
                error instanceof Error
                  ? error.message
                  : "Failed to fetch Pokémon"
              );
            }
          }
        }
      });
    }
  } catch (error) {
    console.error("Error initializing Pokedex:", error);
    showError("Failed to initialize Pokedex");
  }
};

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  pokedexData();
});
