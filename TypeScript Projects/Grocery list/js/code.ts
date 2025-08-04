// Grocery List functionality
const favBtn = document.querySelector(".starimg") as HTMLElement | null;
const addBtn = document.querySelector(".plusimg") as HTMLElement | null;
const myInput = document.querySelector("#myInput") as HTMLInputElement | null;
const container = document.querySelector(".container") as HTMLElement | null;
const favDiv = document.querySelector(".fav-list") as HTMLElement | null;
const check = document.querySelector(".checkimg") as HTMLElement | null;
const question = document.querySelector(".question") as HTMLElement | null;

const listArr: string[] = [];

// Load saved list from localStorage on page load
const loadSavedList = (): void => {
  const savedList = localStorage.getItem("Current Array");
  if (savedList && container) {
    const parsedList: string[] = JSON.parse(savedList);
    listArr.push(...parsedList);

    // Display saved items
    parsedList.forEach((item: string) => {
      const listItem = document.createElement("li");
      listItem.className =
        "bg-white/10 backdrop-blur-md rounded-xl p-4 mb-3 text-white border border-white/20 hover:bg-white/20 transition-all duration-300";
      listItem.textContent = item;
      container.appendChild(listItem);
    });
  }
};

const addToArray = (): void => {
  if (!addBtn || !myInput) return;
  addBtn.addEventListener("click", () => {
    const inputValue = myInput.value.trim();
    if (inputValue !== "") {
      listArr.push(inputValue);
      myInput.value = ""; // Clear input after adding
      console.log(listArr);
    }
  });
};

const addToList = (): void => {
  if (!addBtn || !myInput || !container) return;
  addBtn.addEventListener("click", () => {
    const inputValue = myInput.value.trim();
    if (inputValue !== "") {
      listArr.push(inputValue);

      const newListColumn = document.createElement("li");
      newListColumn.className =
        "bg-white/10 backdrop-blur-md rounded-xl p-4 mb-3 text-white border border-white/20 hover:bg-white/20 transition-all duration-300 animate-pop-in";
      container.appendChild(newListColumn);
      newListColumn.textContent = inputValue;

      // Save to localStorage
      const arrToString = JSON.stringify(listArr);
      localStorage.setItem("Current Array", arrToString);

      myInput.value = ""; // Clear input after adding
      console.log(listArr);
    }
  });
};

const appendInFavDiv = (): void => {
  if (!check || !favDiv) return;
  check.addEventListener("click", () => {
    const myFavList = localStorage.getItem("Current Array");
    if (myFavList) {
      const parsedlist: string[] = JSON.parse(myFavList);

      favDiv.innerHTML = "";

      parsedlist.forEach((item: string) => {
        const listItem = document.createElement("li");
        listItem.className =
          "bg-white/10 backdrop-blur-md rounded-xl p-4 mb-3 text-white border border-white/20 hover:bg-white/20 transition-all duration-300";
        listItem.textContent = item;
        favDiv.appendChild(listItem);
      });

      // Hide question after saving
      if (question) {
        question.classList.add("hidden");
      }
    }
  });
};

const showFavList = (): void => {
  if (!favBtn || !favDiv || !container || !question) return;
  favBtn.addEventListener("click", () => {
    favDiv.style.display = "block";
    container.style.display = "none";
    question.style.display = "none";
  });

  // Add click handler to switch back to main list
  addBtn?.addEventListener("click", () => {
    showMainList();
  });
};

const showMainList = (): void => {
  if (!favDiv || !container || !question) return;
  // This function will be called from other places, not as an event listener
  favDiv.style.display = "none";
  container.style.display = "block";
  question.style.display = "block";
};

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadSavedList();
  addToList();
  appendInFavDiv();
  showFavList();
  showMainList();
});
