var Board = require('firmata')
var arduino = new Board('COM8');
var io = require('./io')

arduino.on('ready', function(){
  console.log("Arduino connected");
  arduino.setSamplingInterval(10000);
  arduino.analogRead(0, function(value) {
    io.emit('read', value);
  });
})

module.exports = arduino;
