var socket = io();
var playerAnswered = false;
var correct = false;
var name;
var score = 0;

var params = jQuery.deparam(window.location.search); //Gets the id from url

socket.on('connect', function () {
    //Tell server that it is host connection from game view
    socket.emit('player-join-game', params);
});

socket.on('noGameFound', function () {
    window.location.href = '../../';//Redirect user to 'join game' page 
});

function answerSubmitted(ans) {
    if (playerAnswered == false) {
        playerAnswered = true;

        if(ans == 0){ 
            socket.emit('playerAnswer', document.getElementById('subAns').innerHTML);
        }else{
            socket.emit('playerAnswer', ans);//Sends player answer to server
        }

        //Hiding answer field from user
        document.getElementById("sub").style.display = "none";
        document.getElementById("obj").style.display = "none";
        document.getElementById('message').style.display = "block";
        document.getElementById('message').innerHTML = "Answer Submitted! Waiting on other players...";

    }
}

//Get results on last question
socket.on('answerResult', function (data) {
    if (data == true) {
        correct = true;
    }
});

socket.on('questionOver', function (data) {
    if (correct == true) {
        document.body.style.backgroundColor = "#4CAF50";
        document.getElementById('message').style.display = "block";
        document.getElementById('message').innerHTML = "Correct!";
    } else {
        document.body.style.backgroundColor = "#f94a1e";
        document.getElementById('message').style.display = "block";
        document.getElementById('message').innerHTML = "Incorrect!";
    }
    document.getElementById("sub").style.display = "none";
    document.getElementById("obj").style.display = "none";
    document.getElementById('subAns').innerHTML = '';
    $('#subAns').summernote('reset');

    socket.emit('getScore');
});

socket.on('newScore', function (data) {
    document.getElementById('scoreText').innerHTML = "Score: " + data;
});

socket.on('nextQuestionPlayer', function (questionType) {
    correct = false;
    playerAnswered = false;

    if (questionType == 'subQ') {
        document.getElementById("sub").style.display = "block";
        document.getElementById("obj").style.display = "none";
    } else {
        document.getElementById("sub").style.display = "none";
        document.getElementById("obj").style.display = "block";
    }
    
    document.getElementById('message').style.display = "none";
    document.body.style.backgroundColor = "white";

});

socket.on('hostDisconnect', function () {
    window.location.href = "../../";
});

socket.on('playerGameData', function (playerData, questionType) {
    for (var i = 0; i < playerData.length; i++) {
        if (playerData[i].playerId == socket.id) {
            document.getElementById('nameText').innerHTML = "Name: " + playerData[i].name;
            document.getElementById('scoreText').innerHTML = "Score: " + playerData[i].gameData.score;
        }
    }
    if (questionType == 'subQ') {
        document.getElementById("sub").style.display = "block";
        document.getElementById("obj").style.display = "none";
    } else {
        document.getElementById("sub").style.display = "none";
        document.getElementById("obj").style.display = "block";
    }
});

socket.on('GameOver', function () {
    document.body.style.backgroundColor = "#FFFFFF";
    document.getElementById('answer1').style.visibility = "hidden";
    document.getElementById('answer2').style.visibility = "hidden";
    document.getElementById('answer3').style.visibility = "hidden";
    document.getElementById('answer4').style.visibility = "hidden";
    document.getElementById('sub').style.visibility = "hidden";
    document.getElementById('message').style.display = "block";
    document.getElementById('message').innerHTML = "GAME OVER";
});

