import axios from "axios";

let apiUrl: string = "https://pokeapi.co/api/v2/pokemon";
const characterPlace = document.querySelector(
  ".characterplace"
) as HTMLElement | null;
const searchInput = document.querySelector(
  "#searchinput"
) as HTMLInputElement | null;
const nameElement = document.querySelector(
  ".characterplace h1"
) as HTMLElement | null;
const picElement = document.querySelector("#pic") as HTMLImageElement | null;
const expElement = document.querySelector(
  ".characterplace h2"
) as HTMLElement | null;

const updateImg = (imgurl: string): void => {
  if (picElement) {
    picElement.src = imgurl;
  }
};

const pokedexData = async (): Promise<void> => {
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    console.log(data);

    if (searchInput) {
      searchInput.addEventListener("keydown", async (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const character = searchInput.value.trim();

          if (character) {
            apiUrl = `https://pokeapi.co/api/v2/pokemon/${character}`;

            const newResponse = await axios.get(apiUrl);

            const name: string = newResponse.data.name;
            if (nameElement) {
              nameElement.innerText = `${name}`;
            }

            const imageUrl: string = newResponse.data.sprites.front_default;
            updateImg(imageUrl);

            const exp: number = newResponse.data.base_experience;
            if (expElement) {
              expElement.innerText = `Base EXP:${exp}`;
            }
          }
        }
      });
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

pokedexData();
