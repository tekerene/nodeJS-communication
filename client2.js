const net = require('net');


const client2 = net.createConnection();
    
    var HOST=  "127.0.0.1";
    var PORT = 9000;


//client2 = new net.Socket();
client2.connect(PORT, HOST, function (){
    console.log("connection opened to client 2")
})
client2.on('connect', function(){
console.log("client2 connected to the server");
});

client2.on("data", function(data){
    console.log("Recieve: %s", data.toString());
});