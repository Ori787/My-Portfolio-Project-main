const favBtn = document.querySelector(".starimg") as HTMLElement | null;
const addBtn = document.querySelector(".plusimg") as HTMLElement | null;
const myInput = document.querySelector("#myInput") as HTMLInputElement | null;
const container = document.querySelector(".container") as HTMLElement | null;
const favDiv = document.querySelector(".fav-list") as HTMLElement | null;
const check = document.querySelector(".checkimg") as HTMLElement | null;
const question = document.querySelector(".question") as HTMLElement | null;

const listArr: string[] = [];

const addToArray = (): void => {
  if (!addBtn || !myInput) return;
  addBtn.addEventListener("click", () => {
    const inputValue = myInput.value.trim();
    if (inputValue !== "") {
      listArr.push(inputValue);
    }
    console.log(listArr);
  });
};

addToArray();

const addToList = (): void => {
  if (!addBtn || !myInput || !container) return;
  addBtn.addEventListener("click", () => {
    const newListColumn = document.createElement("li");
    container.appendChild(newListColumn);
    const inputValue = myInput.value.trim();
    newListColumn.textContent = inputValue;
    const arrToString = JSON.stringify(listArr);
    localStorage.setItem("Current Array", arrToString);
  });
};

addToList();

const appendInFavDiv = (): void => {
  if (!check || !favDiv) return;
  check.addEventListener("click", () => {
    const myFavList = localStorage.getItem("Current Array");
    if (myFavList) {
      const parsedlist: string[] = JSON.parse(myFavList);

      favDiv.innerHTML = "";

      parsedlist.forEach((item: string) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        favDiv.appendChild(listItem);
      });
    }
  });
};

appendInFavDiv();

const showFavList = (): void => {
  if (!favBtn || !favDiv || !container || !question) return;
  favBtn.addEventListener("click", () => {
    favDiv.style.display = "block";
    container.style.display = "none";
    question.style.display = "none";
  });
};

showFavList();