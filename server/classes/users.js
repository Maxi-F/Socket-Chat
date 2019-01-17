class SocketUsers {
    constructor() {
        this.people = [];
    }

    addPerson(id, name, chatroom) {
        let person = {
            id,
            name,
            chatroom
        };

        this.people.push(person);

        return this.people;
    }

    getPerson(id) {
        let person = this.people.find((personArray) => personArray.id === id);

        return person;
    }

    getPeople() {
        return this.people;
    }

    getPeopleByRoom(chatroom) {
        let peopleInRoom = this.people.filter(person => person.chatroom === chatroom);
        return peopleInRoom;
    }

    deletePerson(id) {
        let deletedPerson = this.getPerson(id);
        this.people = this.people.filter((personArray) => personArray.id !== id);
        return deletedPerson;
    }
}

module.exports = {
    SocketUsers
}