const question = document.getElementById("question");
const choices = document.getElementById("choices");
const btn = document.getElementById("btn");
const result = document.getElementById("result");
const scoreLabel = document.querySelector("#result > p");

const quizSet = [
  {
    q: "Commonly used data types do not include?",
    c: ["Strings", "Booleans", "Alert", "Numbers"]
  },
  {
    q: "The condition in an if / else statement is enclosed within ____.?",
    c: ["Quotes", "Curly brackets", "Parentheses", "Square blackets"]
  },
  {
    q:
      "The ___ tag set provides information to the browser about your webpage including the author name and keywords.",
    c: ["html", "meta", "head", "body"]
  },
  {
    q: "What does CSS stand for??",
    c: [
      "Cascading Style Sheets",
      "Custom Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets"
    ]
  }
];

let currentNum = 0;
let isAnswered;
let score = 0;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
}

function checkAnswer(li) {
  // if(isAnswered === true){
  if (isAnswered) {
    return;
  }
  isAnswered = true;

  if (li.textContent === quizSet[currentNum].c[0]) {
    li.classList.add("correct");
    score++;
  } else {
    li.classList.add("wrong");
  }
  btn.classList.remove("disabled");
}

function setQuiz() {
  isAnswered = false;
  question.textContent = quizSet[currentNum].q;
  console.log("test1");

  while (choices.firstChild) {
    choices.removeChild(choices.firstChild);
  }

  const shuffledChoices = shuffle([...quizSet[currentNum].c]);
  shuffledChoices.forEach(choice => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.addEventListener("click", () => {
      checkAnswer(li);
    });
    choices.appendChild(li);
  });

  if (currentNum === quizSet.length - 1) {
    btn.textContent = "Show Score";
  }
  console.log("test2");
}

setQuiz();

btn.addEventListener("click", () => {
  if (btn.classList.contains("disabled")) {
    return;
  }
  btn.classList.add("disabled");

  if (currentNum === quizSet.length - 1) {
    // console.log(`Score: ${score}/ ${quizSet.length}`);
    scoreLabel.textContent = `Score: ${score}/ ${quizSet.length}`;
    result.classList.remove("hidden");
  } else {
    currentNum++;
    setQuiz();
  }
});
