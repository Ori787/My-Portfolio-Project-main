import { Question } from "./questionclass.js";

let correctAnswersCounter = 0;
 
const questionArr: Question[] = [
  new Question("The capital of Lithuania is:", "Vilnius", "Madeira", "Jurmala", "Riga", "Innsbruck", "Vilnius"),
  new Question("Which continent is Zimbabwe in?", "Oceania", "America", "Africa", "Europe", "Asia", "Africa"),
  new Question("Which state is Los Angeles in?", "state of Israel", "America", "Texas", "California", "Florida", "California"),
  new Question("The capital of France is:", "Madrid", "Lisbon", "Berlin", "Rome", "Paris", "Paris"),
  new Question("Which river is the longest in the world?", "Nile", "Amazon", "Mississippi", "Yangtze", "Danube", "Nile"),
  new Question("What is the largest desert in the world?", "Sahara", "Arctic", "Gobi", "Kalahari", "Atacama", "Sahara"),
  new Question("Which country is known as the Land of the Rising Sun?", "China", "India", "Japan", "Australia", "Russia", "Japan"),
  new Question("Which mountain range spans the border between Europe and Asia?", "Himalayas", "Andes", "Rocky Mountains", "Alps", "Ural Mountains", "Ural Mountains"),
  new Question("What is the largest country by land area in the world?", "United States", "Canada", "Russia", "China", "Brazil", "Russia"),
  new Question("Which ocean is the largest on Earth?", "Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Arctic Ocean", "Pacific Ocean", "Pacific Ocean"),
  new Question("Which African country is known as the 'Rainbow Nation'?", "Nigeria", "Ghana", "South Africa", "Kenya", "Egypt", "South Africa"),
  new Question("In which country would you find the city of Marrakech?", "Saudi Arabia", "Morocco", "Egypt", "Tunisia", "Algeria", "Morocco"),
  new Question("Which European city is famous for its canals and gondolas?", "Barcelona", "Venice", "Amsterdam", "Prague", "Vienna", "Venice"),
  new Question("What is the largest freshwater lake by surface area in the world?", "Lake Victoria", "Lake Baikal", "Lake Superior", "Great Bear Lake", "Caspian Sea", "Lake Superior"),
  new Question("Which country is known as the 'Land of the Midnight Sun'?", "Norway", "Canada", "Russia", "Sweden", "Finland", "Norway"),
  new Question("In which country is the Great Wall located?", "Japan", "India", "China", "South Korea", "Vietnam", "China"),
  new Question("What is the smallest continent in the world?", "Africa", "Asia", "North America", "Australia", "Europe", "Australia"),
  new Question("Which country is known as the 'Land of Fire and Ice'?", "Iceland", "Greenland", "Norway", "Canada", "Sweden", "Iceland"),
  new Question("What is the capital of Brazil?", "Buenos Aires", "Rio de Janeiro", "Sao Paulo", "Brasilia", "Bogota", "Brasilia"),
  new Question("Which African river is the longest in the world?", "Nile", "Congo", "Niger", "Zambezi", "Orange", "Nile"),
  new Question("Which country is known as the 'Land of the Rising Sun'?", "China", "India", "Japan", "Australia", "Russia", "Japan"),
  new Question("In which country is the city of Petra, famous for its rock-cut architecture, located?", "Egypt", "Greece", "Turkey", "Jordan", "Lebanon", "Jordan"),
  new Question("What is the highest mountain in North America?", "Mount Kilimanjaro", "Mount Everest", "Mount McKinley", "Mount Fuji", "Mount St. Helens", "Mount McKinley"),
  new Question("Which country is known as the 'Land of the Rising Sun'?", "China", "India", "Japan", "Australia", "Russia", "Japan"),
  new Question("What is the largest desert in the world?", "Sahara", "Arctic", "Gobi", "Kalahari", "Atacama", "Sahara"),
];

class QuizUI {
  caption: HTMLElement;
  answers: HTMLElement[];
  counter: HTMLElement;
  nextBtn: HTMLButtonElement;
  playground: HTMLElement;
  playAgainBtn: HTMLButtonElement;

  constructor() {
    this.caption = this.getElement<HTMLElement>("#caption");
    this.answers = [1, 2, 3, 4, 5].map(i =>
      this.getElement<HTMLElement>(`.a${i} .mytext`)
    );
    this.counter = this.getElement<HTMLElement>("#counterplace");
    this.nextBtn = this.getElement<HTMLButtonElement>("#nextquestion");
    this.playground = this.getElement<HTMLElement>("#playground");
    this.playAgainBtn = this.getElement<HTMLButtonElement>("#playagainbtn");
  }

  getElement<T extends HTMLElement>(selector: string): T {
    const el = document.querySelector(selector);
    if (!el) throw new Error(`Element not found: ${selector}`);
    return el as T;
  }

  setQuestion(idx: number) {
    const q = questionArr[idx];
    this.caption.innerHTML = q.question;
    this.answers[0].innerHTML = q.a1;
    this.answers[1].innerHTML = q.a2;
    this.answers[2].innerHTML = q.a3;
    this.answers[3].innerHTML = q.a4;
    this.answers[4].innerHTML = q.a5;
  }

  setCounter(current: number, total: number) {
    this.counter.innerHTML = `${current}/${total}`;
  }

  showScore(score: number, total: number) {
    alert(`You Scored: ${score}/${total}!`);
  }

  disableAnswerButtons() {
    const buttons = Array.from(this.playground.querySelectorAll<HTMLButtonElement>(".mybtn"));
    buttons.forEach(b => (b.disabled = true));
  }

  enableAnswerButtons() {
    const buttons = Array.from(this.playground.querySelectorAll<HTMLButtonElement>(".mybtn"));
    buttons.forEach(b => (b.disabled = false));
  }
}

class QuizController {
  private ui: QuizUI;
  private currentQuestionIndex = 0;
  private totalQuestions: number;

  constructor(ui: QuizUI) {
    this.ui = ui;
    this.totalQuestions = questionArr.length;
    this.ui.setQuestion(this.currentQuestionIndex);
    this.ui.setCounter(1, this.totalQuestions);
    this.setupAnswerListeners();
    this.setupNextListener();
    this.setupPlayAgain();
  }

  setupAnswerListeners() {
    const buttons = Array.from(
      this.ui.playground.querySelectorAll<HTMLButtonElement>(".mybtn")
    );
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const myText = btn.parentElement?.querySelector(".mytext") as HTMLElement | null;
        if (!myText) return;
        const selectedAnswer = myText.textContent;
        const correctAnswer = questionArr[this.currentQuestionIndex].rightAnswer;
        if (selectedAnswer === correctAnswer) {
          alert("You're Right!");
          correctAnswersCounter++;
        } else {
          alert("You're False!");
        }
        this.ui.disableAnswerButtons();
      });
    });
  }

  setupNextListener() {
    this.ui.nextBtn.addEventListener("click", () => {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < this.totalQuestions) {
        this.ui.setQuestion(this.currentQuestionIndex);
        this.ui.setCounter(this.currentQuestionIndex + 1, this.totalQuestions);
        this.ui.enableAnswerButtons();
      } else {
        this.ui.showScore(correctAnswersCounter, this.totalQuestions);
      }
    });
  }

  setupPlayAgain() {
    this.ui.playAgainBtn.addEventListener("click", () => {
      location.reload();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    const ui = new QuizUI();
    new QuizController(ui);
  } catch (err) {
    alert("Quiz failed to load: " + err);
  }
});