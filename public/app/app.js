var app = angular.module("vco-gui", ['btford.socket-io']);

app.factory('socket', function (socketFactory) {
  var myIoSocket = io.connect();
  mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  return mySocket;
});

app.controller("voltageController", function($scope, socket) {
  socket.on('vcos', function(msg){
    $scope.vcos = msg
  })
  $scope.sendControl = function(id, amp, off, noi) {
    var control = {}
    control[id] = {
      A : amp,
      O : off,
      N : noi
    }
    socket.emit('control', control)
  }
  $scope.saveConfig = function(name, vco, amp, off, noi){
    var config = {
      name : name,
      vco : vco,
      A : amp,
      O : off,
      N : noi
    }
    socket.emit('save', config)
  }
  $scope.setConfig = function(vco){
    $scope.amp = vco.A
    $scope.off = vco.O
    $scope.noi = vco.N
  }
})
