var io = require('socket.io')();
const fs = require('fs');

var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyUSB0',{
  baudRate : 115200
});

io.serveClient(false);
io.on('connection', function(socket){
  console.log("Client with id" + socket.id + " is Connected.")
  var raw_file = fs.readFile('./data/vco_list.json', "utf8", function(err ,raw){
    if(raw){
      var raw_vcos = raw.split('\n').slice(0, -1);
      var vcos = []
      raw_vcos.forEach(function(vco){
        vcos.push(JSON.parse(vco))
      })
      socket.emit('vcos', vcos)
    }
  })
  socket.on('disconnect', function(){
    console.log({'user disconnected': socket.id});
  });
  socket.on('control', function(msg){
    port.write(JSON.stringify(msg), function(err){
      if (err) {
        return console.log('Error on write: ', err.message);
      }
      console.log({'Serial-OUT' : JSON.stringify(msg)});
    });
  })
  socket.on('save', function(msg){
    fs.appendFile('./data/vco_list.json', JSON.stringify(msg) + '\n', function (err) {
      if (err) throw err;
    });
    console.log({"Write-File" : JSON.stringify(msg)})
  })
});

module.exports = io
