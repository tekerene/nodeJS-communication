var readlineSync = require('readline-sync');
var colors = require("colors");
var net = require('net');

var HOST = '127.0.0.1';
var PORT = 9000;

var client = null;
function openConnection(){
    if(client){
        console.log("--Connection is already open--".red);
        setTimeout(function () {
            menu();
        }, 0);
        return;
    }
   
    client = new net.Socket();

    client.on("error", function(err) {
        client.destroy();
        client = null;
        console.log("EERROR: Connection could not be opened. msg: %s".red, err.message);
        setTimeout(function (){
            menu();
        }, 0);
    });

    client.on("data", function(data) {
        console.log('Recieved: %s'.cyan, data);
        setTimeout(function () {
            menu();
        }, 0);
    });

    client.connect(PORT, HOST, function () {
        console.log("Connection opened successfully!".green);
        setTimeout(function () {
            menu();
        }, 0);
    });
}
    function sendData(data) {
        if (!client) {
            console.log("--Connection is not open or closed--".red);
            setTimeout(function (){
                menu();
            }, 0);
            return;
        }
        client.write(data);
    }
    function CloseConnection(){
        if(!client) {
            console.log("--Connection is not open or already closed--".red);
            setTimeout(function (){
                menu();
            }, 0);
            return;
        }
        client.destroy();
        client = null;
        console.log("Connection closed succcessfully".yellow);
        setTimeout(() => {
            menu();
        }, 0);
    }
function menu(){
    var lineRead = readlineSync.question("\n\n Enter option (1-open, 2-send, 3-close, 4-Quit): ");

    switch (lineRead){
        case "1":
            openConnection();
            break;
        case "2":
            var data = readlineSync.question("Enter data to send:");
            sendData(data);
            break;
        case "3":
            CloseConnection();
            break;
        case "4":
            return;
            break;
        default:
            setTimeout(() => {
                menu();
            }, 0);
            break;
    }
}
setTimeout(() => {
    menu();
}, 0);