var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
var width = window.innerWidth;
var height = window.innerHeight;

c.beginPath();
c.moveTo(0, height/2-12);
c.lineTo(width, height/2-12);
c.lineWidth = 2;
c.strokeStyle = "black";
c.stroke();

c.beginPath();
c.moveTo(width/2, 0);
c.lineTo(width/2, height);
c.lineWidth = 2;
c.strokeStyle = "black";
c.stroke();