var socket = io();

// using params like this, I think it only works in Chrome.
var params = new URLSearchParams(window.location.search);
if (!params.has('name') || !params.has('chatroom')) {
    window.location = 'index.html';
    throw new Error("Name and chatroom are required.");
}

var user = {
    name: params.get('name'),
    chatroom: params.get('chatroom')
}

socket.on('connect', function() {
    console.log('Connected to Server');

    socket.emit('enterChat', user, function(res) {
        //console.log("connected users: ", res);
        renderUsers(res);
    })
});

socket.on('disconnect', function() {

    console.log('Disconnected from Server');

});

// listen info from server
socket.on('sendMessage', function(message) {
    renderMessages(message, false);
    scrollBottom();
});

// private messages
socket.on('privateMessage', function(message) {
    console.log('Private message: ', message);
})

// listen user changes (User connects or disconects from chatroom)
socket.on('peopleList', function(people) {
    renderUsers(people);
})