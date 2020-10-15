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
    var tbody = document.getElementById('game-list');
    for (var i = 0; i < Object.keys(data).length; i++) {

        var tr = document.createElement('tr');
        var tdName = document.createElement('td');
        var tdOptions = document.createElement('td');
        var startButton = document.createElement('button');
        var editButton = document.createElement('button');
        var deleteButton = document.createElement('button');
        var reviewButton = document.createElement('button');

        startButton.innerHTML = 'Start quiz'
        editButton.innerHTML = 'Edit quiz'
        deleteButton.innerHTML = 'delete'
        reviewButton.innerHTML = 'Review student answer'

        tdName.innerHTML = data[i].name;

        reviewButton.setAttribute('onClick', "reviewAns('" + data[i]._id + "')");

        startButton.setAttribute('onClick', "startGame('" + data[i]._id + "')");
        startButton.setAttribute('id', 'gameButton');

        tdName.setAttribute('class', 'text-center')
        tdOptions.setAttribute('class', 'text-center')

        tdOptions.appendChild(startButton);
        tdOptions.appendChild(editButton);
        tdOptions.appendChild(deleteButton);
        tdOptions.appendChild(reviewButton);

        tr.appendChild(tdName);
        tr.appendChild(tdOptions);

        tbody.appendChild(tr);
    }

});

function startGame(data) {
    window.location.href = "/host/" + "?id=" + data;
}

function reviewAns(data) {
    window.location.href = "/review/" + "?id=" + data;
}