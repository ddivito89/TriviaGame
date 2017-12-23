var puzzles = [
  {
    "question": "how much blah one",
    "answers": [
      {
        "answer": "1",
        "correct": true
      }, {
        "answer": "2",
        "correct": false
      }, {
        "answer": "3",
        "correct": false
      }, {
        "answer": "4",
        "correct": false
      }
    ]
  }, {
    "question": "how much blah two",
    "answers": [
      {
        "answer": "5",
        "correct": false
      }, {
        "answer": "6",
        "correct": false
      }, {
        "answer": "7",
        "correct": true
      }, {
        "answer": "8",
        "correct": false
      }
    ]
  }, {
    "question": "how much blah three",
    "answers": [
      {
        "answer": "9",
        "correct": false
      }, {
        "answer": "10",
        "correct": false
      }, {
        "answer": "11",
        "correct": false
      }, {
        "answer": "12",
        "correct": true
      }
    ]
  }
]

$(document).ready(function() {

  $("#startButton").click(function() {
    var currentPuzzle = 0;
    var wins = 0;
    var losses = 0;
    var intervalId;

    var timer = {
      start: function() {
        timer.time = 21;
        intervalId = setInterval(function() {
          timer.count()
        }, 1000);
      },
      stop: function() {
        clearInterval(intervalId);
      },
      count: function() {

        timer.time--;
        $("#timer").text(timer.time)
        if (timer.time <= 0) {
          losses++
          currentPuzzle++
          if (currentPuzzle < puzzles.length) {
            $("#timer").text('')
            newGame(currentPuzzle, wins, losses)
          } else {
            alert("no more puzzles")
            resetGame()
          }
        }
      }
    }

    function newGame(puzzleNum, wins, losses) {
      clearInterval(intervalId);
      timer.time = 21;
      timer.start()
      $("#score").text(`Wins: ${wins}  Losses: ${losses}`)
      var qDiv = $("#question")
      var aDiv = $("#answers")
      var puzzle = puzzles[puzzleNum];
      var question = $(`<p>${puzzle.question}</p>`);
      //empty divs
      qDiv.empty()
      aDiv.empty()
      //print question
      qDiv.html(question)
      for (var i = 0; i < puzzle.answers.length; i++) {
        var answer = $(`<p>${puzzle.answers[i].answer}</p>`);
        answer.prop("answer", `${puzzle.answers[i].answer}`)
        answer.prop("correct", `${puzzle.answers[i].correct}`)
        answer.addClass("answer")
        aDiv.append(answer)
      }

      $(".answer").click(function() {
        if (this.correct === true) {
          alert("you win!");
          wins++
          $("#timer").text('')
        } else {
          alert("you lose :(");
          losses++
          $("#timer").text('')
        }
        currentPuzzle++
        if (currentPuzzle < puzzles.length) {
          newGame(currentPuzzle, wins, losses)
        } else {
          alert("no more puzzles")
          resetGame()
        }
      });
    };

    function resetGame() {
      currentPuzzle = 0;
      wins = 0;
      losses = 0;
      newGame(currentPuzzle, wins, losses)
    }
    resetGame()

  });

});
