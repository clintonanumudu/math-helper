function generateTerm() {
	var term = "";
	var operator = Math.floor(Math.random() * 2);
	var number = Math.floor(Math.random() * 101);
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
	}
	return expression;
}

function longAlgebraicDivision(poly, division) { // From https://sim0n.wordpress.com/2009/04/04/javascript-simple-algebraic-long-division/
	//Format the equations correctly
	poly = poly.replace(/(--|\+\+)/g, "+");
	poly = poly.replace(/(-\+|\+-)/g, "-");
	poly = poly.replace(/^\+/g, "");
	poly = poly.replace(/\s/g, "");
	division = division.replace(/(--|\+\+)/g, "+");
	division = division.replace(/(-\+|\+-)/g, "-");
	division = division.replace(/^\+/g, "");
	division = division.replace(/\s/g, "");
	//Add spaces to the equation to break it apart
	poly = poly.replace(/([+-])/g, " $1");
	//Split the equation at the spaces
	var equ = poly.split(" ");
	//Begin the division
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
	//Format output
	output = output.replace(/\+([+-])/g, "$1");
	output = output.replace(/x\^0\+$/g, "");
	output = output.replace(/x\^1/g, "x");
	//Calculate remainder
	lastTerm = lastTerm.replace(/x\^0/g, "");
	output += " : Remainder [" + String(Number(equ[equ.length-1]) - Number(lastTerm)) + "]";
	return output;
}

function generatePolynomialDiv() {
	var polydiv = {
		question: "",
		answer: ""
	};
	polydiv.question += "(" + generateExpression(4) + ")/" + "(" + generateExpression(2) + ")";
	polydiv.answer = ""; //solvePolynomialDiv(polydiv.question);
	return polydiv;
}

var task = generatePolynomialDiv()
console.log("Question: " + task.question + "<br/>Answer: " + task.answer);