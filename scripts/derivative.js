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

var cmSize = 50;
for (let i = 0; i < width/cmSize/2-1; i++) {
	var limit = Math.floor(width/cmSize/2);
	c.font = "15px Arial";
	c.fillText((-limit+i).toString(), cmSize*i, height/2+10);
}
for (let i = 0; i < width/cmSize/2-1; i++) {
	var limit = Math.floor(width/cmSize/2);
	c.font = "15px Arial";
	c.fillText((i+1).toString(), width/2+cmSize*(i+1), height/2+10);
}
for (let i = 0; i < height/cmSize/2-1; i++) {
	var limit = Math.floor(height/cmSize/2);
	c.font = "15px Arial";
	c.fillText((limit-i).toString(), width/2-20, cmSize*i+20);
}
for (let i = 0; i < height/cmSize/2-1; i++) {
	var limit = Math.floor(height/cmSize/2);
	c.font = "15px Arial";
	c.fillText((-i-1).toString(), width/2-25, height/2+cmSize*(i+1)+2);
}