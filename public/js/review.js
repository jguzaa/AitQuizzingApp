var socket = io();

var params = jQuery.deparam(window.location.search); //Gets data from url

socket.on('connect', function() {
    socket.emit('requestWrongAns', params.id);
});

socket.on('wrongAnsReturn', function(wAnswers) {
    debugger;
    var table = document.getElementById('quiz-table');
    for (i = 0; i < wAnswers.length; i++) {
        var question = wAnswers[i][0];

        var thead = document.createElement('thead');
        thead.innerHTML = question;
        table.appendChild(thead);

        var tbody = document.createElement('tbody');

        for (j = 0; j < wAnswers[i][1].length; j++) {
            var stdName = wAnswers[i][1][j][0];
            var wAns = wAnswers[i][1][j][1];

            var tr = document.createElement('tr');
            var thStdName = document.createElement('td');
            var thStdAns = document.createElement('td');

            thStdName.innerHTML = '<p>' + stdName + '</p>';
            thStdAns.innerHTML = wAns;

            tr.appendChild(thStdName);
            tr.appendChild(thStdAns);

            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
    }

});