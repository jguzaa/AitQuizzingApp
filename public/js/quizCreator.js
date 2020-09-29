var socket = io();
var questionNum = 1; //Starts at two because question 1 is already present

function updateDatabase() {
    var questions = [];
    var name = document.getElementById('name').value;
    for (var i = 1; i <= questionNum; i++) {
        var question = document.getElementById('q' + i).innerHTML;
        var questionType = document.getElementById('qType' + i).value;
        var subAns = document.getElementById('subAns' + i).innerHTML;
        var answer1 = document.getElementById(i + 'a1').innerHTML;
        var answer2 = document.getElementById(i + 'a2').innerHTML;
        var answer3 = document.getElementById(i + 'a3').innerHTML;
        var answer4 = document.getElementById(i + 'a4').innerHTML;
        var objCorrect = document.getElementById('correct' + i).value;
        var objChoice = [answer1, answer2, answer3, answer4];
        var time = document.getElementById('time' + i).value;
        questions.push({ "question": question, "questionType": questionType, "subAns": subAns, "objChoice": objChoice, "objCorrect": objCorrect, "time": time })
    }

    var quiz = { id: 0, "name": name, "questions": questions };
    socket.emit('newQuiz', quiz);
}

function addQuestion() {
    questionNum += 1;

    var questionsDiv = document.getElementById('allQuestions');

    var newQuestionDiv = document.createElement('div');

    var questionLabel = document.createElement('label');
    var questionField = document.createElement('div');

    var questionTypeLabel = document.createElement('label');
    var questionTypeField = document.createElement('select');

    var option1 = document.createElement('option')
    var option2 = document.createElement('option')
    var option3 = document.createElement('option')

    var objQField = document.createElement('div')
    var subQField = document.createElement('div')

    var jScript = document.createElement('script')
    var jScript2 = document.createElement('script')

    var answer1Label = document.createElement('label');
    var answer1Field = document.createElement('div');

    var answer2Label = document.createElement('label');
    var answer2Field = document.createElement('div');

    var answer3Label = document.createElement('label');
    var answer3Field = document.createElement('div');

    var answer4Label = document.createElement('label');
    var answer4Field = document.createElement('div');

    var correctLabel = document.createElement('label');
    var correctField = document.createElement('input');

    var timeLabel = document.createElement('label');
    var timeField = document.createElement('input');

    questionLabel.innerHTML = "Question " + String(questionNum) + ": ";
    questionField.setAttribute('id', 'q' + String(questionNum));

    questionTypeLabel.innerHTML = "Choose a type of question: ";
    questionTypeLabel.setAttribute('for', 'questionType');

    questionTypeField.setAttribute('name', 'questionType');
    questionTypeField.setAttribute('id', 'qType' + String(questionNum));
    questionTypeField.setAttribute('onchange', 'qSwap'+String(questionNum)+'()');

    option1.setAttribute('value', 'none')
    option1.innerHTML = "Please Select"
    option2.setAttribute('value', 'objQ')
    option2.innerHTML = "Objective"
    option3.setAttribute('value', 'subQ')
    option3.innerHTML = "Subjective"

    objQField.setAttribute('id','objQuestion'+String(questionNum))
    objQField.setAttribute('style','display: none;')

    subQField.setAttribute('id','subQuestion'+String(questionNum))
    subQField.setAttribute('style','display: none;')

    subQField.innerHTML = '<div id="subAns' + String(questionNum) + '"></div>'

    jScript.innerHTML = `

    function addQF` + String(questionNum) + `(){
        $('#q` + String(questionNum) + `').summernote({
            callbacks: {
                onChange: function (contents, $editable) {
                    document.getElementById('q` + String(questionNum) +`').innerHTML = contents;
                }
            }
        });
    }

    function qSwap` + String(questionNum) + `() {

        $('#subAns` + String(questionNum) + `').summernote(
            {
                toolbar: [
                    ['para', ['paragraph']]
                ],
                callbacks: {
                    onChange: function (contents, $editable) {
                        document.getElementById("subAns` + String(questionNum) + `").innerHTML = contents;
                    }
                }
            }
        );

        $('#` + String(questionNum) + `a1').summernote({
            callbacks: {
                onChange: function (contents, $editable) {
                    document.getElementById('` + String(questionNum) + `a1').innerHTML = contents;
                }
            }
        });

        $('#` + String(questionNum) + `a2').summernote({
            callbacks: {
                onChange: function (contents, $editable) {
                    document.getElementById('` + String(questionNum) + `a2').innerHTML = contents;
                }
            }
        });

        $('#` + String(questionNum) + `a3').summernote({
            callbacks: {
                onChange: function (contents, $editable) {
                    document.getElementById('` + String(questionNum) + `a3').innerHTML = contents;
                }
            }
        });

        $('#` + String(questionNum) + `a4').summernote({
            callbacks: {
                onChange: function (contents, $editable) {
                    document.getElementById('` + String(questionNum) + `a4').innerHTML = contents;
                }
            }
        });

        var type = document.getElementById("qType` + String(questionNum) + `").value;
        if (type == "objQ") {
            document.getElementById("objQuestion` + String(questionNum) + `").style.display = "block";
            document.getElementById("subQuestion` + String(questionNum) + `").style.display = "none";
        } else if (type == "subQ") {
            document.getElementById("objQuestion` + String(questionNum) + `").style.display = "none";
            document.getElementById("subQuestion` + String(questionNum) + `").style.display = "block";
        } else {
            document.getElementById("objQuestion` + String(questionNum) + `").style.display = "none";
            document.getElementById("subQuestion` + String(questionNum) + `").style.display = "none";
        }
    }
    `

    jScript2.innerHTML = `
    addQF` + String(questionNum) + `()
    `

    answer1Label.innerHTML = "Answer 1: ";
    answer2Label.innerHTML = " Answer 2: ";
    answer3Label.innerHTML = "Answer 3: ";
    answer4Label.innerHTML = " Answer 4: ";
    correctLabel.innerHTML = "Correct Answer (1-4): ";

    answer1Field.setAttribute('id', String(questionNum) + "a1");
    answer2Field.setAttribute('id', String(questionNum) + "a2");
    answer3Field.setAttribute('id', String(questionNum) + "a3");
    answer4Field.setAttribute('id', String(questionNum) + "a4");
    correctField.setAttribute('id', 'correct' + String(questionNum));
    correctField.setAttribute('type', 'number');

    timeLabel.innerHTML = "Time (Second) : "
    timeField.setAttribute('id', 'time' + String(questionNum));
    timeField.setAttribute('type', 'number');

    newQuestionDiv.setAttribute('id', 'question-field');//Sets class of div

    newQuestionDiv.appendChild(questionLabel);
    newQuestionDiv.appendChild(questionField);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(questionTypeLabel);
    newQuestionDiv.appendChild(questionTypeField);
    questionTypeField.appendChild(option1)
    questionTypeField.appendChild(option2)
    questionTypeField.appendChild(option3)
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(subQField);
    newQuestionDiv.appendChild(objQField);
    objQField.appendChild(answer1Label);
    objQField.appendChild(answer1Field);
    objQField.appendChild(answer2Label);
    objQField.appendChild(answer2Field);
    objQField.appendChild(answer3Label);
    objQField.appendChild(answer3Field);
    objQField.appendChild(answer4Label);
    objQField.appendChild(answer4Field);
    objQField.appendChild(document.createElement('br'));
    objQField.appendChild(correctLabel);
    objQField.appendChild(correctField);
    newQuestionDiv.appendChild(jScript);
    newQuestionDiv.appendChild(jScript2);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(timeLabel);
    newQuestionDiv.appendChild(timeField);

    questionsDiv.appendChild(document.createElement('br'));//Creates a break between each question
    questionsDiv.appendChild(newQuestionDiv);//Adds the question div to the screen

    newQuestionDiv.style.backgroundColor = randomColor();
}

//Called when user wants to exit quiz creator
function cancelQuiz() {
    if (confirm("Are you sure you want to exit? All work will be DELETED!")) {
        window.location.href = "../";
    }
}

socket.on('startGameFromCreator', function (data) {
    window.location.href = "../../host/?id=" + data;
});

function randomColor() {

    var colors = ['#4CAF50', '#f94a1e', '#3399ff', '#ff9933'];
    var randomNum = Math.floor(Math.random() * 4);
    return colors[randomNum];
}

function setBGColor() {
    var randColor = randomColor();
    document.getElementById('question-field').style.backgroundColor = randColor;
}








