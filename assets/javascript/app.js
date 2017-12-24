var puzzles = [
  {
    "question": "how much blah one",
    "answers": [
      "1", "2", "3", "4"
    ],
    "correct": "1",
    "image":"./assets/images/cartman.jpg"
  }, {
    "question": "how much blah one",
    "answers": [
      "11", "22", "33", "44"
    ],
    "correct": "22",
    "image":"./assets/images/kenny.png"
  }, {
    "question": "how much blah one",
    "answers": [
      "111", "222", "333", "4444"
    ],
    "correct": "333",
    "image":"./assets/images/kyle.png"
  }
]

$(document).ready(function() {

  $("#startButton").click(function() {
    $("#startButton").hide()
    var currentPuzzle = 0;
    var wins = 0;
    var losses = 0;
    var intervalId;
    var intervalBetween;
    var tDiv = $("#timer")
    var qDiv = $("#question")
    var aDiv = $("#answers")
    var sDiv = $("#score")
    var correct = ''
    var image = ''
    var answerSelected = false;

    var timer = {
      time: 20,
      start: function() {
        countdownInt = setInterval(function() {
          timer.count()
        }, 1000);
      },
      count: function() {
        timer.time--;
        tDiv.text(`Time Remaining: ${timer.time}`)
        if (timer.time <= 0) {
          gameOver("Times Up")
        }
      }
    }

    function newGame(puzzleNum, wins, losses) {
      answerSelected = false;
      timer.time = 20;
      timer.start()
      sDiv.text(`Wins: ${wins}  Losses: ${losses}`)
      var puzzle = puzzles[puzzleNum];
      var question = $(`<p>${puzzle.question}</p>`);
      correct = puzzle.correct
      image = puzzle.image
      //empty divs
      qDiv.empty()
      aDiv.empty()
      tDiv.empty()
      //print question
      tDiv.text(`Time Remaining: ${timer.time}`)
      qDiv.html(question)
      for (var i = 0; i < puzzle.answers.length; i++) {
        var answer = $(`<p>${puzzle.answers[i]}</p>`);
        answer.prop("answer", `${puzzle.answers[i]}`)
        answer.prop("correct", `${puzzle.correct}`)
        answer.addClass("answer")
        aDiv.append(answer)
      }

      $(".answer").click(function() {
        if (answerSelected === false) {
          gameOver(this.answer)
          answerSelected = true;
        }

      });
    };

    function gameOver(answer) {
      console.log(`You selected ${answer}`)
      console.log(`Correct answer was ${correct}`)
      clearInterval(countdownInt)
      if (answer === correct) {
        wins++;
        qDiv.html("Correct!")
        aDiv.html(`<img src="${image}"/>`)
      } else {
        losses++;
        qDiv.html("Wrong :(")
        aDiv.html(`<img src="${image}"/>`)
      }
      currentPuzzle++;
      sDiv.text(`Wins: ${wins}  Losses: ${losses}`)
      var y = 0;
      intervalBetween = setInterval(function() {
        if (y === 3) {
          if (currentPuzzle < puzzles.length) {
            clearInterval(intervalBetween)
            newGame(currentPuzzle, wins, losses)
          } else {
            clearInterval(intervalBetween)
            qDiv.empty()
            aDiv.empty()
            tDiv.empty()
            $("#startButton").show()
            $("#startButton").text("Play Again")
          }
        };
        y++;
      }, 1000);
    }

    function resetGame() {
      currentPuzzle = 0;
      wins = 0;
      losses = 0;
      newGame(currentPuzzle, wins, losses)
    }
    resetGame()
  });
});
