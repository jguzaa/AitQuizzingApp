var socket = io();

var params = jQuery.deparam(window.location.search); //Gets the id from url

var timer;

var time;

//When host connects to server
socket.on('connect', function() {

    //Tell server that it is host connection from game view
    socket.emit('host-join-game', params);
});

socket.on('noGameFound', function() {
    window.location.href = '../../'; //Redirect user to 'join game' page
});

socket.on('gameQuestions', function(data) {

    document.getElementById('questionNum').innerHTML = 'Question : ' + data.qNum + ' / ' + data.qLength;

    if (data.qtype == 'subQ') {
        document.getElementById("subQ").style.display = "block";
        document.getElementById("objQ").style.display = "none";
    } else {
        document.getElementById("subQ").style.display = "none";
        document.getElementById("objQ").style.display = "block";
    }

    document.getElementById('question').innerHTML = data.q1;
    document.getElementById('answer1').innerHTML = data.a1;
    document.getElementById('answer2').innerHTML = data.a2;
    document.getElementById('answer3').innerHTML = data.a3;
    document.getElementById('answer4').innerHTML = data.a4;

    time = parseInt(data.time);
    document.getElementById('playersAnswered').innerHTML = "Players Answered 0 / " + data.playersInGame;
    updateTimer();
});

socket.on('updatePlayersAnswered', function(data) {
    document.getElementById('playersAnswered').innerHTML = "Players Answered " + data.playersAnswered + " / " + data.playersInGame;
});

socket.on('questionOver', function(playerData, questionType, subAns, objCorrect) {
    clearInterval(timer);
    var answer1 = 0;
    var answer2 = 0;
    var answer3 = 0;
    var answer4 = 0;
    var answerCorrect = 0;
    var answerIncorrect = 0;
    var total = 0;

    //Hide elements on page
    document.getElementById('playersAnswered').style.display = "none";
    document.getElementById('timerText').style.display = "none";

    if (questionType == 'subQ') {

        document.getElementById('subAns').innerHTML = "The answer is :<br>" + subAns;

        //remove space btw char
        var subAnsTemp = subAns.replace(/ /g, '');
        subAnsTemp = subAnsTemp.replace(/<p>/g, '');
        subAnsTemp = subAnsTemp.replace(/<\/p>/g, '');
        subAnsTemp = subAnsTemp.replace(/&nbsp;/g, '');
        subAnsTemp = subAnsTemp.replace(/<br>/g, '');

        for (var i = 0; i < playerData.length; i++) {

            var ansTemp = '';
            //remove space btw char
            if (playerData[i].gameData.answer != 0) {
                ansTemp = (playerData[i].gameData.answer).replace(/ /g, '');
                ansTemp = ansTemp.replace(/<p>/g, '');
                ansTemp = ansTemp.replace(/<\/p>/g, '');
                ansTemp = ansTemp.replace(/&nbsp;/g, '');
                ansTemp = ansTemp.replace(/<br>/g, '');
            }

            if (ansTemp == subAnsTemp) {
                answerCorrect += 1;
            } else {
                answerIncorrect += 1;
            }
            total += 1;
        }

        //Gets values for graph
        answerCorrect = answerCorrect / total * 100;
        answerIncorrect = answerIncorrect / total * 100;

        document.getElementById('squareCorrect').style.display = "inline-block";
        document.getElementById('squareIncorrect').style.display = "inline-block";

        document.getElementById('squareCorrect').style.height = answerCorrect + "px";
        document.getElementById('squareIncorrect').style.height = answerIncorrect + "px";

    } else {
        //Shows user correct answer with effects on elements
        if (objCorrect == 1) {
            document.getElementById('answer2').style.filter = "grayscale(50%)";
            document.getElementById('answer3').style.filter = "grayscale(50%)";
            document.getElementById('answer4').style.filter = "grayscale(50%)";
            var current = document.getElementById('answer1').innerHTML;
            document.getElementById('answer1').innerHTML = "&#10004" + " " + current;
        } else if (objCorrect == 2) {
            document.getElementById('answer1').style.filter = "grayscale(50%)";
            document.getElementById('answer3').style.filter = "grayscale(50%)";
            document.getElementById('answer4').style.filter = "grayscale(50%)";
            var current = document.getElementById('answer2').innerHTML;
            document.getElementById('answer2').innerHTML = "&#10004" + " " + current;
        } else if (objCorrect == 3) {
            document.getElementById('answer1').style.filter = "grayscale(50%)";
            document.getElementById('answer2').style.filter = "grayscale(50%)";
            document.getElementById('answer4').style.filter = "grayscale(50%)";
            var current = document.getElementById('answer3').innerHTML;
            document.getElementById('answer3').innerHTML = "&#10004" + " " + current;
        } else if (objCorrect == 4) {
            document.getElementById('answer1').style.filter = "grayscale(50%)";
            document.getElementById('answer2').style.filter = "grayscale(50%)";
            document.getElementById('answer3').style.filter = "grayscale(50%)";
            var current = document.getElementById('answer4').innerHTML;
            document.getElementById('answer4').innerHTML = "&#10004" + " " + current;
        }

        for (var i = 0; i < playerData.length; i++) {
            if (playerData[i].gameData.answer == 1) {
                answer1 += 1;
            } else if (playerData[i].gameData.answer == 2) {
                answer2 += 1;
            } else if (playerData[i].gameData.answer == 3) {
                answer3 += 1;
            } else if (playerData[i].gameData.answer == 4) {
                answer4 += 1;
            }
            total += 1;
        }

        //Gets values for graph
        answer1 = answer1 / total * 100;
        answer2 = answer2 / total * 100;
        answer3 = answer3 / total * 100;
        answer4 = answer4 / total * 100;

        document.getElementById('square1').style.display = "inline-block";
        document.getElementById('square2').style.display = "inline-block";
        document.getElementById('square3').style.display = "inline-block";
        document.getElementById('square4').style.display = "inline-block";

        document.getElementById('square1').style.height = answer1 + "px";
        document.getElementById('square2').style.height = answer2 + "px";
        document.getElementById('square3').style.height = answer3 + "px";
        document.getElementById('square4').style.height = answer4 + "px";
    }

    document.getElementById('nextQButton').style.display = "block";

});

function nextQuestion() {
    document.getElementById('nextQButton').style.display = "none";

    document.getElementById('square1').style.display = "none";
    document.getElementById('square2').style.display = "none";
    document.getElementById('square3').style.display = "none";
    document.getElementById('square4').style.display = "none";
    document.getElementById('squareCorrect').style.display = "none";
    document.getElementById('squareIncorrect').style.display = "none";

    document.getElementById('answer1').style.filter = "none";
    document.getElementById('answer2').style.filter = "none";
    document.getElementById('answer3').style.filter = "none";
    document.getElementById('answer4').style.filter = "none";

    document.getElementById("subQ").style.display = "none";
    document.getElementById("objQ").style.display = "none";

    document.getElementById('playersAnswered').style.display = "block";
    document.getElementById('timerText').style.display = "block";
    document.getElementById('num').innerHTML = "";
    document.getElementById('subAns').innerHTML = "Please type the answer in text field";
    socket.emit('nextQuestion'); //Tell server to start new question
}

function updateTimer() {
    timer = setInterval(function() {
        time -= 1;
        document.getElementById('num').textContent = " " + time;
        if (time == 0) {
            socket.emit('timeUp');
        }
    }, 1000);
}
socket.on('GameOver', function(data) {
    document.getElementById('nextQButton').style.display = "none";
    document.getElementById('square1').style.display = "none";
    document.getElementById('square2').style.display = "none";
    document.getElementById('square3').style.display = "none";
    document.getElementById('square4').style.display = "none";
    document.getElementById('squareCorrect').style.display = "none";
    document.getElementById('squareIncorrect').style.display = "none";
    document.getElementById('subAns').style.display = "none";

    document.getElementById('answer1').style.display = "none";
    document.getElementById('answer2').style.display = "none";
    document.getElementById('answer3').style.display = "none";
    document.getElementById('answer4').style.display = "none";
    document.getElementById('timerText').innerHTML = "";
    document.getElementById('question').innerHTML = "GAME OVER";
    document.getElementById('playersAnswered').innerHTML = "";

    document.getElementById('winner1').style.display = "block";
    document.getElementById('winner2').style.display = "block";
    document.getElementById('winner3').style.display = "block";
    document.getElementById('winner4').style.display = "block";
    document.getElementById('winner5').style.display = "block";
    document.getElementById('winnerTitle').style.display = "block";

    document.getElementById('winner1').innerHTML = "1. " + data.num1;
    if (data.num2 != "")
        document.getElementById('winner2').innerHTML = "2. " + data.num2;
    if (data.num3 != "")
        document.getElementById('winner3').innerHTML = "3. " + data.num3;
    if (data.num4 != "")
        document.getElementById('winner4').innerHTML = "4. " + data.num4;
    if (data.num5 != "")
        document.getElementById('winner5').innerHTML = "5. " + data.num5;
});



socket.on('getTime', function(player) {
    socket.emit('time', {
        player: player,
        time: time
    });
});