// QuizService.js - Verwaltet Quiz-Fragen und Logik

const QUIZ_QUESTIONS = [
    {
      question: "Welcher Verein gewann die erste Bundesliga-Saison 1963/64?",
      options: ["Bayern München", "Borussia Dortmund", "1. FC Köln", "Hamburger SV"],
      correctAnswer: 2
    },
    {
      question: "Wer ist Rekordtorschütze der Bundesliga?",
      options: ["Gerd Müller", "Robert Lewandowski", "Klaus Fischer", "Jupp Heynckes"],
      correctAnswer: 0
    },
    {
      question: "Welcher Club stieg nie aus der Bundesliga ab?",
      options: ["Hamburger SV", "Borussia Dortmund", "Bayern München", "Werder Bremen"],
      correctAnswer: 2
    },
    {
      question: "Wer hält den Rekord für die meisten Bundesliga-Einsätze als Spieler?",
      options: ["Manfred Kaltz", "Oliver Kahn", "Karl-Heinz Körbel", "Sepp Maier"],
      correctAnswer: 2
    },
    {
      question: "In welchem Jahr wurde die Frauen-Bundesliga gegründet?",
      options: ["1990", "1997", "2001", "1982"],
      correctAnswer: 0
    },
    {
      question: "Wie viele Tore erzielte Robert Lewandowski in der Saison 2020/21?",
      options: ["35", "40", "41", "38"],
      correctAnswer: 2
    },
    {
      question: "Welcher Trainer gewann die meisten Bundesliga-Titel?",
      options: ["Ottmar Hitzfeld", "Jupp Heynckes", "Udo Lattek", "Pep Guardiola"],
      correctAnswer: 2
    },
    {
      question: "Welcher Spieler hat die Torjägerkanone am häufigsten gewonnen?",
      options: ["Gerd Müller", "Robert Lewandowski", "Klaus Fischer", "Pierre-Emerick Aubameyang"],
      correctAnswer: 0
    },
    {
      question: "Wie heißt das Stadion von Borussia Dortmund?",
      options: ["Allianz Arena", "Signal Iduna Park", "Volksparkstadion", "Veltins-Arena"],
      correctAnswer: 1
    },
    {
      question: "Welcher Verein stieg in der Saison 2021/22 in die 2. Bundesliga ab?",
      options: ["Arminia Bielefeld", "Greuther Fürth", "Hertha BSC", "VfB Stuttgart"],
      correctAnswer: 0
    }
  ];
  
  class QuizService {
    constructor() {
      this.questions = [...QUIZ_QUESTIONS];
      this.currentIndex = 0;
      this.score = 0;
      this.totalQuestions = this.questions.length;
    }
  
    // Holt die aktuelle Frage
    getCurrentQuestion() {
      if (this.currentIndex < this.questions.length) {
        return this.questions[this.currentIndex];
      }
      return null;
    }
  
    // Prüft eine Antwort und geht zur nächsten Frage
    answerQuestion(answerIndex) {
      const currentQuestion = this.getCurrentQuestion();
      const isCorrect = currentQuestion && answerIndex === currentQuestion.correctAnswer;
      
      if (isCorrect) {
        this.score++;
      }
      
      this.currentIndex++;
      
      return {
        isCorrect,
        isComplete: this.currentIndex >= this.questions.length,
        nextQuestion: this.getCurrentQuestion(),
        score: this.score,
        totalQuestions: this.totalQuestions
      };
    }
  
    // Quiz zurücksetzen
    reset() {
      this.currentIndex = 0;
      this.score = 0;
      // Fragen mischen für neue Quizrunde
      this.shuffleQuestions();
      return this.getCurrentQuestion();
    }
  
    // Mischt die Fragen für mehr Abwechslung
    shuffleQuestions() {
      for (let i = this.questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
      }
    }
  
    // Quiz auf bestimmte Anzahl Fragen begrenzen
    limitQuestions(count = 5) {
      this.shuffleQuestions();
      this.questions = this.questions.slice(0, count);
      this.totalQuestions = this.questions.length;
      return this;
    }
  }
  
  export default QuizService;
  
  
  export function getQuizQuestion(askedQuestions = []) {
    const availableQuestions = QUIZ_QUESTIONS.filter(
      q => !askedQuestions.includes(q.question)
    );
    if (availableQuestions.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
  }
  