var io = require('socket.io')();

var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyUSB0',{
  baudRate : 115200
});

io.serveClient(false);
io.on('connection', function(socket){
  console.log("Client with id" + socket.id + " is Connected.")
  socket.on('disconnect', function(){
    console.log({'user disconnected': socket.id});
  });
  socket.on('control', function(msg){
    port.write(JSON.stringify(msg), function(err){
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log({'Serial-OUT':JSON.stringify(msg)});
  });
  })
});

module.exports = io
