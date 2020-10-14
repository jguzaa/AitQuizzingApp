var socket = io();

debugger;

document.getElementById("heading").innerHTML = 'Welcome ' + sessionStorage.getItem("name");

//get quiz which this teacher created
socket.on('connect', function() {
    socket.emit('requestDbNames', {
        tName: sessionStorage.getItem("name")
    });
});

socket.on('gameNamesData', function(data) {
    for (var i = 0; i < Object.keys(data).length; i++) {
        var div = document.getElementById('game-list');
        var button = document.createElement('button');

        button.innerHTML = data[i].name;
        button.setAttribute('onClick', "startGame('" + data[i].id + "')");
        button.setAttribute('id', 'gameButton');

        div.appendChild(button);
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createElement('br'));
    }
});

function startGame(data) {
    window.location.href = "/host/" + "?id=" + data;
}