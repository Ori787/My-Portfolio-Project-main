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
    // Updated selectors to match new HTML structure
    this.answers = [
      this.getElement<HTMLElement>(".a1 h3.mytext"),
      this.getElement<HTMLElement>(".a2 h3.mytext"),
      this.getElement<HTMLElement>(".a3 h3.mytext"),
      this.getElement<HTMLElement>(".a4 h3.mytext")
    ];
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
    // Note: We only have 4 answer options in the new HTML, so we'll skip a5
  }

  setCounter(current: number, total: number) {
    this.counter.innerHTML = `${current}/${total}`;
  }

  showScore(score: number, total: number) {
    // Create a modern modal instead of alert
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/20">
        <div class="text-center">
          <h2 class="text-3xl font-bold mb-6 text-white">Quiz Complete!</h2>
          <p class="text-2xl font-bold mb-6 text-white">You Scored: ${score}/${total}</p>
          <button class="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400/30" onclick="this.closest('.fixed').remove()">
            Close
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  disableAnswerButtons() {
    const buttons = Array.from(this.playground.querySelectorAll<HTMLButtonElement>(".mybtn"));
    buttons.forEach(b => {
      b.disabled = true;
      b.classList.add('opacity-50', 'cursor-not-allowed');
    });
  }

  enableAnswerButtons() {
    const buttons = Array.from(this.playground.querySelectorAll<HTMLButtonElement>(".mybtn"));
    buttons.forEach(b => {
      b.disabled = false;
      b.classList.remove('opacity-50', 'cursor-not-allowed');
    });
  }

  showCorrectAnswer(selectedButton: HTMLButtonElement, isCorrect: boolean) {
    // Add visual feedback
    if (isCorrect) {
      selectedButton.classList.add('bg-green-500', 'border-green-400');
      selectedButton.classList.remove('bg-white/20', 'border-white/30');
    } else {
      selectedButton.classList.add('bg-red-500', 'border-red-400');
      selectedButton.classList.remove('bg-white/20', 'border-white/30');
    }
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
    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const myText = btn.parentElement?.querySelector(".mytext") as HTMLElement | null;
        if (!myText) return;
        const selectedAnswer = myText.textContent;
        const correctAnswer = questionArr[this.currentQuestionIndex].rightAnswer;
        const isCorrect = selectedAnswer === correctAnswer;
        
        if (isCorrect) {
          correctAnswersCounter++;
        }
        
        this.ui.showCorrectAnswer(btn, isCorrect);
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
        
        // Reset button styles
        const buttons = Array.from(this.ui.playground.querySelectorAll<HTMLButtonElement>(".mybtn"));
        buttons.forEach(btn => {
          btn.classList.remove('bg-green-500', 'border-green-400', 'bg-red-500', 'border-red-400');
          btn.classList.add('bg-white/20', 'border-white/30');
        });
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
    console.error("Quiz failed to load:", err);
    alert("Quiz failed to load: " + err);
  }
});