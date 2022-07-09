let questions = [
  {
    question: 'Which player scored the fastest hat-trick in the Premier League?',
    answer_1: 'Sadio Mane',
    answer_2: 'Luis Saurez',
    answer_3: 'Cristiano Ronaldo',
    answer_4: 'Thierry Henry',
    right_answer: 1,
  },

  {
    question: 'In whichorld Cup did Diego Maradona score his infamous "Hand of God" goal?',
    answer_1: '1982 Spain',
    answer_2: '1986 Mexico',
    answer_3: '1990 Italy',
    answer_4: '1994 USA',
    right_answer: 2,
  },

  {
    question: 'Who won the Champions League Final in 2006?',
    answer_1: 'FC Bayern',
    answer_2: 'Real Madrid',
    answer_3: 'FC Bacelona',
    answer_4: 'Manchester United',
    right_answer: 3,
  },

  {
    question: 'Which outfield player appeared in the Champions League final in three different decades?',
    answer_1: 'Paul Scholes',
    answer_2: 'Zinedine Zidane',
    answer_3: 'Carles Puyol',
    answer_4: 'Ryan Giggs',
    right_answer: 4,
  },
  {
    question: 'Messi has won a record number of "Ballon Or" awards - how many?',
    answer_1: '5',
    answer_2: '6',
    answer_3: '7',
    answer_4: '8',
    right_answer: 3,
  },

  {
    question: 'In which year was the first European Championship held?',
    answer_1: '1930',
    answer_2: '1940',
    answer_3: '1950',
    answer_4: '1960',
    right_answer: 4,
  },
];

let currentQuestion = 0;
let rightQuestions = 0;
let audioSucces = new Audio('sound_effects/correct.mp3');
let audioWrong = new Audio('sound_effects/wrong.mp3');
let audioApplaus = new Audio('sound_effects/applaus.mp3');

/**
 * Start running the App
 */
function init() {
  document.getElementById('question-body').style = 'display: none';
  document.getElementById('question-footer').style = 'display: none';
  document.getElementById('progress').style = 'display: none';
  document.getElementById('welcome-message').style = '';
}

/**
 * Delete Start Scrren and show Quetion Body.
 */
function startShowQuestion() {
  document.getElementById('welcome-message').style = 'display: none';
  document.getElementById('progress').style = '';
  document.getElementById('question-footer').style = '';
  document.getElementById('question-body').style = '';
  showQuestion();
}

/**
 * Show next Question or End Screen
 */
function showQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    progressBar();
    showQuizScreen();
  }
}

function gameIsOver() {
  return currentQuestion >= questions.length;
}

/**
 * Dynamic Progreesbar, function called from showQuestion().
 */
function progressBar() {
  let percent = (currentQuestion + 1) / questions.length;
  percent = Math.round(percent * 100);
  document.getElementById('progress-bar').innerHTML = `${percent}%`;
  document.getElementById('progress-bar').style = `width: ${percent}%`;
}

/**
 * End Screen will be showed, function called from showQuestion()
 */
function showEndScreen() {
  document.getElementById('question-body').style = 'display: none';
  document.getElementById('question-footer').style = 'display: none';
  document.getElementById('end-screen').style = '';
  document.getElementById('amount-of-questions').innerHTML = questions.length;
  document.getElementById('amount-of-right-answers').innerHTML = rightQuestions;
  playApplausSound();
}

/**
 * If all questions are correctly answerd, applause sound will play.
 * Function called from showEndScreen();
 */
function playApplausSound() {
  if (rightQuestions === questions.length) {
    audioApplaus.play();
  }
}

/**
 * Quiz Screen will be showed, function called from showQuestion().
 */
function showQuizScreen() {
  let question = questions[currentQuestion];
  document.getElementById('question-counter').innerHTML = currentQuestion + 1;
  document.getElementById('all-questions').innerHTML = questions.length;
  document.getElementById('question-text').innerHTML = question['question'];
  document.getElementById('answer_1').innerHTML = `<span class="letter">A</span> ${question['answer_1']}`;
  document.getElementById('answer_2').innerHTML = `<span class="letter">B</span> ${question['answer_2']}`;
  document.getElementById('answer_3').innerHTML = `<span class="letter">C</span> ${question['answer_3']}`;
  document.getElementById('answer_4').innerHTML = `<span class="letter">D</span> ${question['answer_4']}`;
  answersFieldClickable();
}

/**
 * If the answer is correct, answer field will marked in green
 * if the answer is wrong, answer field will marked in red + right field in green
 */
function answer(selection) {
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1);
  if (answerIsCorrect(selectedQuestionNumber, question)) {
    rightAnswer(selection);
  } else {
    wrongAnswer(selection);
  }
  getNextButtonEnabled();
}

function answerIsCorrect(selectedQuestionNumber, question) {
  return selectedQuestionNumber == question['right_answer'];
}

function rightAnswer(selection) {
  document.getElementById(selection).parentNode.classList.add('bg-success');
  audioSucces.play();
  rightQuestions++;
  answersFieldUnclickable();
}

function wrongAnswer(selection) {
  let question = questions[currentQuestion];
  let idOfRightAnswer = `answer_${question['right_answer']}`;
  document.getElementById(selection).parentNode.classList.add('bg-danger');
  document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
  audioWrong.play();
  answersFieldUnclickable();
}

function getNextButtonEnabled() {
  document.getElementById('next-btn').disabled = false;
}

/**
 * To show the next quetions after answer the previous one
 */
function showNextQuetion() {
  currentQuestion++;
  document.getElementById('next-btn').disabled = true;
  resetAnswersFields();
  showQuestion();
}

/**
 * All Anwers fields will be reset after click of Next btn.
 */
function resetAnswersFields() {
  resetGreenFields();
  resetRedFields();
}

function resetGreenFields() {
  document.getElementById('answer_1').parentNode.classList.remove('bg-success');
  document.getElementById('answer_2').parentNode.classList.remove('bg-success');
  document.getElementById('answer_3').parentNode.classList.remove('bg-success');
  document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function resetRedFields() {
  document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
}

function restartGame() {
  document.getElementById('end-screen').style = 'display: none';
  currentQuestion = 0;
  rightQuestions = 0;
  init();
}

function answersFieldClickable() {
  document.getElementById('answer-parent1').style.pointerEvents = 'auto';
  document.getElementById('answer-parent2').style.pointerEvents = 'auto';
  document.getElementById('answer-parent3').style.pointerEvents = 'auto';
  document.getElementById('answer-parent4').style.pointerEvents = 'auto';
}

function answersFieldUnclickable() {
  document.getElementById('answer-parent1').style.pointerEvents = 'none';
  document.getElementById('answer-parent2').style.pointerEvents = 'none';
  document.getElementById('answer-parent3').style.pointerEvents = 'none';
  document.getElementById('answer-parent4').style.pointerEvents = 'none';
}
