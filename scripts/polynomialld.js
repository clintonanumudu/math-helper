function generateTerm() {
	var term = "";
	var operator = Math.floor(Math.random() * 2);
	var number = Math.floor(Math.random() * 11);
	if (operator == 0) {
		term += "+";
	}
	else {
		term += "-";
	}
	term+=number;
	return term;
}
function generateExpression(degree) {
	var expression = "";
	for (let i = 0; i < degree; i++) {
		var number = generateTerm()
		if (i < degree - 1) {
			expression += number.toString() + "x";
		}
		else {
			expression += number.toString()
		}
		if (i < degree - 2) {
			expression += "^" + (degree-i-1).toString();
		}
	}
	return expression;
}
function extractCompontents(Term, constantChar) {
	try{
	var Comps = new Array();
	Comps[0] = Term.split(constantChar)[0];
	Comps[1] = Term.split("^")[1];
	if(Comps[0] == "") { Comps[0]=1; }
	if(String(Comps[1]) == "undefined") { Comps[1]=1; }
	return Comps;
	}
	catch {
		return "unsolvable";
	}
}
function divideTerm(Term1, Term2, constantChar) {
    var extTerm1 = extractCompontents(Term1, constantChar)
	var extTerm2 = extractCompontents(Term2, constantChar)
	return String(extTerm1[0]/extTerm2[0]) + constantChar + "^" + String(extTerm1[1]-extTerm2[1]);
}
function multiplyTerm(Term1, Term2, constantChar) {
	var extTerm1 = extractCompontents(Term1, constantChar)
	return String(extTerm1[0] * Term2) + constantChar + "^" + String(extTerm1[1]);
}
function subtractTerm(Term1, Term2, constantChar) {
    var extTerm1 = extractCompontents(Term1, constantChar)
	var extTerm2 = extractCompontents(Term2, constantChar)
	if(extTerm1[1] != extTerm2[1]) { return null; }
	return String(extTerm1[0]-extTerm2[0]) + constantChar + "^" + String(extTerm1[1]);
}
function longAlgebraicDivision(poly, division) { //https://sim0n.wordpress.com/2009/04/04/javascript-simple-algebraic-long-division/
	poly = poly.replace(/(--|\+\+)/g, "+");
	poly = poly.replace(/(-\+|\+-)/g, "-");
	poly = poly.replace(/^\+/g, "");
	poly = poly.replace(/\s/g, "");
	division = division.replace(/(--|\+\+)/g, "+");
	division = division.replace(/(-\+|\+-)/g, "-");
	division = division.replace(/^\+/g, "");
	division = division.replace(/\s/g, "");
	poly = poly.replace(/([+-])/g, " $1");
	var equ = poly.split(" ");
	var output = ""
	var lastTerm = ""
	for(var i=0;i<equ.length-1;i++) {
		var term = equ[i];
		if(i==0) {
			var dt = divideTerm(term, division.split("x")[0], "x");
			output += dt + "+";
			dt = multiplyTerm(dt, division.split("x")[1], "x");
			lastTerm = dt;
		}else{
			var dt = subtractTerm(term, lastTerm, "x");
			dt = divideTerm(dt, division.split("x")[0], "x");
			output += dt + "+";
			dt = multiplyTerm(dt, division.split("x")[1], "x");
			lastTerm = dt;
		}
	}
	output = output.replace(/\+([+-])/g, "$1");
	output = output.replace(/x\^0\+$/g, "");
	output = output.replace(/x\^1/g, "x");
	lastTerm = lastTerm.replace(/x\^0/g, "");
	output += " : Remainder [" + String(Number(equ[equ.length-1]) - Number(lastTerm)) + "]";
	return output;
}
function generatePolynomialDiv() {
	var polydiv = {
		question: "",
		answer: ""
	};
	var poly = generateExpression(4);
	var divisor = "x-1";
	polydiv.question += "(" + poly + ")/" + "(" + divisor + ")";
	polydiv.answer = longAlgebraicDivision(poly, divisor);
	return polydiv;
}




































var task = generatePolynomialDiv();
while (task.answer.includes("[0]") == false) {
	try {
		task = generatePolynomialDiv();
	}
	catch(err) {
	}
	console.log("Searching");
}
var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
c.font = "30px Arial";
c.fillStyle = "blue";
c.fillText(task.question, 50, 80);
c.fillText(task.answer, 500, 80);