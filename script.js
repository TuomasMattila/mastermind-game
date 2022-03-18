const button = document.getElementById("submit-button");
const gameboard = document.getElementById("gameboard");
const winText = document.getElementById("win-text");
const colors = ["red", "green", "blue", "orange", "yellow"];
let correctAnswer = [];
setupCorrectAnswer();

// Clickable dots
let guessDots = document.querySelectorAll(".dot.unselected");
let hintDots = document.querySelectorAll(".dot.hint");

guessDots.forEach(element => {
    element.addEventListener("click", () => {
        element.style.backgroundColor = colors[(colors.indexOf(element.style.backgroundColor) + 1) % colors.length];
    });
});

button.addEventListener("click", (e) => {
    checkAnswer();
});

function checkAnswer() {
    let guessColors = [];

    // Collect answer colors
    guessDots.forEach(dot => {
        if (dot.style.backgroundColor === "") {
            return;
        }
        guessColors.push(dot.style.backgroundColor);
    });

    // If not all dots have color, do not proceed
    if (guessColors.length != 4) {
        return;
    }

    // Check how many colors are correct and how many of them are in the right place
    let correct = 0;
    let correctColor = 0;
    for (let i = 0; i < colors.length; i++) {
        if (guessColors.includes(colors[i]) && correctAnswer.includes(colors[i])) {
            if (guessColors.filter(c => c === colors[i]).length >= correctAnswer.filter(c => c === colors[i]).length) {
                correctColor += correctAnswer.filter(c => c === colors[i]).length;
            } else {
                correctColor += guessColors.filter(c => c === colors[i]).length;
            }
        }
    }
    for (let i = 0; i < 4; i++) {
        if (guessColors[i] === correctAnswer[i]) {
            correct++;
            correctColor--;
        }
    }

    if (correct === 4) {
        button.style.display = "none";
        hintDots.forEach(hint => {
            hint.style.backgroundColor = "black";
        });
        winText.style.display = "block";
    } else {
        addNewRow(correct, correctColor);
    }

}

function addNewRow(blacks, whites) {
    let hints = [];

    guessDots.forEach(dot => {
        dot.classList.remove("unselected");
    })

    for (let i = 0; i < blacks; i++) {
        hints.push("black");
    }
    for (let i = 0; i < whites; i++) {
        hints.push("white");
    }

    for (let i = 0; i < hintDots.length; i++) {
        hintDots[i].style.backgroundColor = hints[i];
        hintDots[i].classList.remove("hint");
    }

    gameboard.innerHTML += `<div class="gamerow">
    <div class="number">${document.getElementsByClassName("gamerow").length + 1}</div>
    <div class="result">
        <div class="dot hint"></div>
        <div class="dot hint"></div>
        <div class="dot hint"></div>
        <div class="dot hint"></div>
    </div>
    <div class="answer">
        <div class="dot unselected"></div>
        <div class="dot unselected"></div>
        <div class="dot unselected"></div>
        <div class="dot unselected"></div>
    </div>
    </div>`;

    guessDots = document.querySelectorAll(".dot.unselected");
    hintDots = document.querySelectorAll(".dot.hint");

    guessDots.forEach(element => {
        element.addEventListener("click", () => {
            element.style.backgroundColor = colors[(colors.indexOf(element.style.backgroundColor) + 1) % colors.length];
        });
    });

}

function setupCorrectAnswer() {
    for (let i = 0; i < 4; i++) {
        correctAnswer.push(colors[Math.floor(Math.random() * colors.length)]);
    }
}