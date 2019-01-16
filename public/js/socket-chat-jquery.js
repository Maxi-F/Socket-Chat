var params = new URLSearchParams(window.location.search);
var username = params.get('name');
var chatroom = params.get('chatroom');

// jQuery references
var userDiv = $('#userDiv');
var sendForm = $('#sendForm');
var messagetxt = $('#messagetxt');
var divChatbox = $('#divChatbox');

// render users
function renderUsers(people) {
    console.log(people);
    var html = '';
    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active">chatroom: <span>' + chatroom + '</span></a>';
    html += '</li>';

    for (var i = 0; i < people.length; i++) {
        html += '<li>';
        html += '   <a data-id= "' + people[i].id + '"href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + people[i].name + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    userDiv.html(html);
}

// render messages
function renderMessages(message, isSender) {
    var html = '';
    var date = new Date(message.date);
    var time = date.getHours() + ':' + date.getMinutes();

    var adminClass = 'info';

    if (message.name === 'Admin') {
        adminClass = 'danger';
    }
    if (isSender) {
        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += '<h5>' + message.name + '</h5>';
        html += '<div class="box bg-light-inverse">' + message.message + '</div>';
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '<div class="chat-time">' + time + '</div>';
        html += '</li>';
    } else {
        html += '<li class="animated fadeIn">';
        if (message.name !== 'Admin') {
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '<div class="chat-content">';
        html += '<h5>' + message.name + '</h5>';
        html += '<div class="box bg-light-' + adminClass + '">' + message.message + '</div>';
        html += '</div>';
        html += '<div class="chat-time">' + time + '</div>';
        html += '</li>';
    }

    divChatbox.append(html);
}

// listeners

userDiv.on('click', 'a', function() {
    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});

sendForm.on('submit', function(event) {
    event.preventDefault();
    if (messagetxt.val().trim().length === 0) return;

    socket.emit('sendMessage', {
        username: username,
        message: messagetxt.val()
    }, function(message) {
        renderMessages(message, true);
        messagetxt.val('').focus();
        scrollBottom()
    })
})