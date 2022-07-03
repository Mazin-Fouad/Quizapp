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
    question: 'Which outfield player appeared in the Champions League final in three different decades?',
    answer_1: 'Paul Scholes',
    answer_2: 'Zinedine Zidane',
    answer_3: 'Carles Puyol',
    answer_4: 'Ryan Giggs',
    right_answer: 4,
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
    right_answer: 2,
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

/**
 * function init() ist für Initialisieren der App, Fragenzähler bekommen Json Array Länge.
 * Diese Function ruft die showQuestion();
 */
function init() {
  document.getElementById('all-questions').innerHTML = questions.length;
  showQuestion();
}

/**
 * Diese Funktion sorgt zum verteilen von Fragen und Antworten von Json Array auf die gewünschten HTML Elemente.
 * let question = questions[currentQuestion]; = wir rufen den ersten Block von dem Json Array (Siehe Zeile 56).
 */
function showQuestion() {
  let question = questions[currentQuestion];
  document.getElementById('question-text').innerHTML = question['question'];
  document.getElementById('answer-1').innerHTML = question['answer_1'];
  document.getElementById('answer-2').innerHTML = question['answer_2'];
  document.getElementById('answer-3').innerHTML = question['answer_3'];
  document.getElementById('answer-4').innerHTML = question['answer_4'];
}

function answer(selection) {
  let question = questions[currentQuestion];
  console.log('The selected Answer is from', selection);
  let selectedQuestionNumber = selection.slice(-1);
  console.log('selectedQuestionNumber is', selectedQuestionNumber);
  console.log('Current Question is', question['right_answer']);

  if (selectedQuestionNumber == question['right_answer']) {
    console.log('Right Answer');
  } else {
    console.log('Wrong Answer!');
  }
}
