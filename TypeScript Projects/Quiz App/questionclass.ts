class Question {
  question: string;
  a1: string;
  a2: string;
  a3: string;
  a4: string;
  a5: string;
  rightAnswer: string;

  constructor(
    question: string,
    a1: string,
    a2: string,
    a3: string,
    a4: string,
    a5: string,
    rightAnswer: string
  ) {
    this.question = question;
    this.a1 = a1;
    this.a2 = a2;
    this.a3 = a3;
    this.a4 = a4;
    this.a5 = a5;
    this.rightAnswer = rightAnswer;
  }
}

export { Question };
