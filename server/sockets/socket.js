const { io } = require('../server');
const { User } = require('../classes/users');
const { createMessage } = require('../utils/utils')

const users = new User();

io.on('connection', (client) => {

    client.on("enterChat", (data, callback) => {
        if (!data.name) {
            return callback({
                err: true,
                message: "name is required"
            })
        } else if (!data.chatroom) {
            return callback({
                err: true,
                message: "chatroom is required"
            })
        };
        // makes a client join the specified room
        client.join(data.chatroom);

        users.addPerson(client.id, data.name, data.chatroom);
        callback(users.getPeopleByRoom(data.chatroom));

        client.broadcast.to(data.chatroom).emit('peopleList', users.getPeopleByRoom(data.chatroom));
    })

    client.on('sendMessage', (data) => {
        let person = users.getPerson(client.id);
        let message = createMessage(person.name, data.message);
        client.broadcast.to(person.chatroom).emit('sendMessage', message);
    })

    client.on('privateMessage', data => {
        let person = users.getPerson(client.id);
        client.broadcast.to(data.to).emit('privateMessage', createMessage(person.name, data.message));
    });


    client.on('disconnect', () => {
        let deletedPerson = users.deletePerson(client.id);
        if (deletedPerson) {
            client.broadcast.to(deletedPerson.chatroom).emit('createMessage', createMessage('Admin', `${deletedPerson.name} Disconnected from Chat`))
            client.broadcast.to(deletedPerson.chatroom).emit('peopleList', users.getPeopleByRoom(deletedPerson.chatroom));
        }
    });
});