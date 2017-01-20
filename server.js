var express = require('express'),
    app = express(),
    http = require('http'),
    socketIo = require('socket.io');
var server = http.createServer(app);
var io = socketIo.listen(server);
server.listen(process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
console.log("Server running on http://127.0.0.1:3000");


var line_history = [];


io.on('connection', function (socket) {
    for (var i in line_history) {
        socket.emit('draw_line', { line: line_history[i] });
    }

    
    socket.on('draw_line', function (data) {
        line_history.push(data.line);
        io.emit('draw_line', { line: data.line });
        console.log("i : " + i + "line_history[i] : " + line_history[i]);
        
    });
});


