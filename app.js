var net =  require('net');
var colors = require("colors");
var server = net.createServer();
server.on('connection', (socket, client2)=>{
    var remoteAddress = socket.remoteAddress+ ":"+ socket.remotePort;
   console.log("new client connection is made %s".green , remoteAddress);

//    client2.once('data', function(data){
//        console.log("data from %s: "+ data);
//        client2.write(data);
//    });

    socket.on("data", function(d){
        console.log("data from %s: %s".cyan, remoteAddress, d);
        socket.write("Hello"+ d);
   
        
        
    });
    socket.once("close", function(){
        console.log("connection from %s closed" .yellow, remoteAddress)
    });
    socket.on("error", function(err){
        console.log("connection %s error: %s".red, remoteAddress, err.message);
    });
});



server.listen(9000, ()=>{
    console.log("server listening to %j", server.address());
});