const numbers = document.querySelectorAll(".number"),
  operators = document.querySelectorAll(".operator"),
  result = document.querySelector(".result"),
  clear = document.querySelector(".clear"),
  equal = document.querySelector(".equal");

let final = "";
let lastChar = "";
let octalCase = false;
let resultsGiven = false; // when clicked equals button, turns true, when new number is pressed, turns false

const showClickedNums = (event) => {
  const clickedNum = event.target.value;

  // No * or / at the beginning
  if (final === "" && (clickedNum === "*" || clickedNum === "/")) {
    return;
  } // No operators in a row
  else if (
    ["*", "/", "+", "-"].includes(lastChar) &&
    ["*", "/", "+", "-"].includes(clickedNum)
  ) {
    return;
  } else {
    // No octal literals
    if (Number(clickedNum) >= 0 && octalCase) {
      return;
    } else {
      if (["*", "/", "+", "-", ""].includes(lastChar) && clickedNum === "0") {
        octalCase = true;
      } else {
        octalCase = false;
      }

      //replace final result number if new number is pressed
      if (Number(clickedNum) >= 0 && resultsGiven) {
        clearResults();
      }

      final = `${final}${clickedNum}`;
      lastChar = clickedNum;
      result.innerText = final;
      resultsGiven = false;
    }
  }
};

numbers.forEach(function (number) {
  number.addEventListener("click", showClickedNums);
});

operators.forEach(function (operator) {
  operator.addEventListener("click", showClickedNums);
});

function clearResults() {
  final = "";
  result.innerText = final;
  resultsGiven = false;
}

clear.addEventListener("click", clearResults);

equal.addEventListener("click", () => {
  if (final) {
    // No operators come before equal
    if (["*", "/", "+", "-"].includes(lastChar)) {
      return;
    }

    final = eval(final);
    result.innerText = final;
    resultsGiven = true;
  }
});
