"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var btn = document.getElementById("sendButton");
if (btn != null) {
    btn.disabled = true;
}

var appVue = new Vue({
    el: '#divAppVue',
    created: function () {
        //this.newTest();
        this.startSignalR();
    },
    data: {
        userbtnShow: false,
        user: '',
        message: '',
        messages: [
            { username: 'testStatic - 01', usermessage: 'testStatic - 01' },
            { username: 'testStatic - 02', usermessage: 'testStatic - 02' },
            { username: 'testStatic - 03', usermessage: 'testStatic - 03' },
            { username: 'testStatic - 04', usermessage: 'testStatic - 04' },
        ],
    },
    methods: {
        //newTest: function () {
        //    alert('newAppVue');
        //},
        //addTask: function () {
        //    this.list.push({ content: this.task, complete: false });
        //    this.task = '';
        //},
        startSignalR: function () {
            connection.start().then(function () {
                document.getElementById("sendButton").disabled = false;
                alert('Connected');
            }).catch(function (err) {
                return console.error(err.toString());
            });
        },
        sendMessage: function () {
            connection.invoke("SendMessage", this.user, this.message).catch(function (err) {
                return console.error(err.toString());
            });
            event.preventDefault();
            this.message = '';
        },
        newMessage: function (user, message) {
            this.messages.unshift({ username: user, usermessage: message });
        }
    },
    computed: {
        // Una propiedad computada es una propiedad como cualquier otra como las de data, simplemente lleva algo de logica
        // searchUser: function() {
        //     return this.list.filter((item) => item.name.toLowerCase().includes(this.name.toLowerCase()));
        // }
    }
});

connection.on("ReceiveMessage", function (user, message) {

    appVue.newMessage(user, message);
    //var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //var encodedMsg = user + " says " + msg;
    //var li = document.createElement("li");
    //li.textContent = encodedMsg;
    //document.getElementById("messagesList").appendChild(li);
});