var app = angular.module("vco-gui", ['btford.socket-io']);

app.factory('socket', function (socketFactory) {
  var myIoSocket = io.connect();
  mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  return mySocket;
});

app.controller("voltageController", function($scope, socket) {
  $scope.sendControl = function(amp, off, noi) {
    var control = {
      amplitude : amp,
      offset : off,
      noise : noi
    }
    socket.emit('control', control)
  }
})
