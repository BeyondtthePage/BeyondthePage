const correctAnswers = {
  q1: "b",
  q2: "a",
  q3: "c",
  q4: "b",
  q5: "a",
  q6: "c",
  q7: "b",
  q8: "a",
  q9: "c",
  q10: "c"
};

const explanations = {
  q1: "Enkidu is created as an equal capable of challenging Gilgamesh and limiting his abuse of royal power.",

  q2: "Bread, beer, clothing, grooming, work, and relationships mark Enkidu’s gradual entry into organized human society.",

  q3: "Gilgamesh knows that humans die, so he hopes a dangerous achievement will preserve his name after death.",

  q4: "Humbaba is frightening, but he is also the divinely appointed guardian of the Cedar Forest, making his killing morally uncertain.",

  q5: "Gilgamesh lists Ishtar’s former lovers and argues that her love eventually brings suffering and destruction.",

  q6: "The divine council judges the heroes for killing Humbaba and the Bull of Heaven and decides that Enkidu must die.",

  q7: "Enkidu’s death makes mortality personal. Gilgamesh sees his own future in his friend’s death and begins searching for immortality.",

  q8: "Uta-napishti became immortal because of a unique divine decision after the flood, not through a method Gilgamesh can repeat.",

  q9: "Sleep temporarily removes consciousness and control. Gilgamesh’s failure proves that he cannot escape the ordinary needs of a mortal body.",

  q10: "The walls represent lasting human work, civilization, memory, and communal achievement rather than literal bodily immortality."
};

const checkButton = document.getElementById("check-answers");
const resetButton = document.getElementById("reset-quiz");
const resultBox = document.getElementById("quiz-result");

checkButton.addEventListener("click", function () {
  let score = 0;
  let answered = 0;

  Object.keys(correctAnswers).forEach(function (question) {
    const selected = document.querySelector(
      `input[name="${question}"]:checked`
    );

    const explanationBox = document.getElementById(
      `explanation-${question}`
    );

    if (!selected) {
      explanationBox.textContent = "Please select an answer.";
      explanationBox.className = "answer-explanation unanswered";
      return;
    }

    answered += 1;

    if (selected.value === correctAnswers[question]) {
      score += 1;
      explanationBox.textContent =
        `Correct. ${explanations[question]}`;
      explanationBox.className = "answer-explanation correct";
    } else {
      explanationBox.textContent =
        `Not quite. ${explanations[question]}`;
      explanationBox.className = "answer-explanation incorrect";
    }
  });

  if (answered < 10) {
    resultBox.innerHTML = `
      <h2>Almost finished</h2>
      <p>You answered ${answered} of 10 questions. Complete the remaining questions and check again.</p>
    `;

    resultBox.classList.add("visible");
    return;
  }

  let message = "";

  if (score === 10) {
    message = "Excellent—you have a very strong understanding of the epic.";
  } else if (score >= 8) {
    message = "Very good—you understand the major events and ideas.";
  } else if (score >= 6) {
    message = "Good beginning. Review the explanations for the questions you missed.";
  } else {
    message = "Review the tablet guides and try the quiz again.";
  }

  resultBox.innerHTML = `
    <h2>Your Score: ${score}/10</h2>
    <p>${message}</p>
  `;

  resultBox.classList.add("visible");
  resultBox.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

resetButton.addEventListener("click", function () {
  document.getElementById("gilgamesh-quiz").reset();

  document.querySelectorAll(".answer-explanation").forEach(function (box) {
    box.textContent = "";
    box.className = "answer-explanation";
  });

  resultBox.innerHTML = "";
  resultBox.classList.remove("visible");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
