'use strict';

// returns f(x) := cx^e
function Monomial(coefficient, exponent) {
	return function(x) {
		return coefficient * exponentiate(x, exponent);
	}
}
console.assert(Monomial(1,0)(2) == 1, "x^0 == 1");
console.assert(Monomial(1,1)(2) == 2, "x^1 == x");
console.assert(Monomial(2,3)(5) == 250, "2x^3 == 250 when x == 5");


// returns f(x) := c1x + c2x^2 + c3x^3 + ... + cnx^n
function Polynomial(coefficients) {
	return function(x) {
		function sum(accumulator, currentMonomial) {
			return accumulator + currentMonomial(x);
		}
		return coefficients.map(Monomial).reduce(sum, 0);
	}
}
console.assert(Polynomial([])(1) == 0, "Null coefficient sequence means P(x) == 0")
console.assert(Polynomial([0,1,1,1])(1) == 3, "1x^1 + 1x^2 + 1x^3 == 3 when x == 1")
console.assert(Polynomial([0,1,1,1])(2) == 14, "1x^1 + 1x^2 + 1x^3 == 14 when x == 2")
console.assert(Polynomial([0,1,1,1])(3) == 39, "1x^1 + 1x^2 + 1x^3 == 14 when x == 3")
console.assert(Polynomial([3,4])(1) == 7, "3x^1 + 4x^2 == 7 when x == 1")

function format_polynomial(coefficients) {
	return coefficients.map(format_monomial).filter(identity).join(" + ") || 0
}

function format_monomial(coefficient, exponent) {
	if (format_scalar(coefficient)) {
		if (exponent == 0) return coefficient;
		if (exponent == 1) return format_scalar(coefficient);
		return format_scalar(coefficient) + "^" + exponent;
	}
}

function format_scalar(coefficient) {
	if (coefficient == 0) return undefined;
	if (coefficient == 1) return "x";
	return coefficient + "x";
}
