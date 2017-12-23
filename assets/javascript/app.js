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
  var currentPuzzle = 0;
  var wins = 0;
  var losses = 0;

  function newGame(puzzleNum) {
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
  };

  newGame(currentPuzzle)

  $(".answer").click(function() {
    console.log(`${this.answer}`);
    console.log(`${this.correct}`);
  });


});
