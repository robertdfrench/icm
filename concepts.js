'use strict';

function add(a,b) {
	return a + b
}
console.assert(add(1,1) == 2, "1 + 1 is 2")
console.assert(add(2,-2) == 0, "2 - 2 is 0")

function multiply(a,b) {
	return a * b
}
console.assert(multiply(0,5) == 0, "0 * 5 == 0")
console.assert(multiply(1,5) == 5, "1 * 5 == 5")
console.assert(multiply(5,1/5) == 1, "5 * 1/5 == 1")

function increment(k) {
	return add(k,1)
}

function negate(k) {
	return multiply(-1,k)
}

function invert(k) {
	return 1/k
}

// Grows the sequence to the desired length. By appending '0', we preserve the value of any
// coefficient vectors that are passed in. I.e. Polynomial([1,2,3]) == Polynomial([1,2,3,0]).
function grow_sequence(sequence, desired_length) {
	if (sequence.length >= desired_length) {
		return sequence;
	}
	return grow_sequence([sequence, 0].flat(), desired_length);
}

function Zeroes(n) {
	return grow_sequence([], n);
}

function count(_, index) {
	return index;
}

// returns [0,1,2,...,n-1]
function Sequence(n) {
	return grow_sequence([], n).map(count);
}
console.assert(Sequence(0).length == 0, "Null Sequence is empty");
console.assert(Sequence(1).length == 1, "Sequence(1) has a singular element");
console.assert(Sequence(1)[0] == 0, "Sequence(1) has the singular element 0");

// returns [1,2,3,...,n]
function CountingSequence(n) {
	return Sequence(n).map(increment);
}
console.assert(CountingSequence(0).length == 0, "Null CountingSequence is empty");
console.assert(CountingSequence(1).length == 1, "CountingSequence(1) has a singular element");
console.assert(CountingSequence(1)[0] == 1, "CountingSequence(1) has the singular element 1");


// returns base^exponent
//
// Need to clarify language here: what is the best verb to use? Is 'exponentiate' really the best
// analogue of 'multiply', 'add', 'subtract', and 'divide'?
function exponentiate(base, exponent) {
	function multiply_by_base(total_so_far) {
		return base * total_so_far;
	}
	return CountingSequence(exponent).reduce(multiply_by_base, 1);
}
console.assert(exponentiate(2,0) == 1, "exponentiate(n,0) == 1");
console.assert(exponentiate(2,1) == 2, "exponentiate(n,1) == n");
console.assert(exponentiate(2,3) == 8, "2^3 == 8, a known value");


// returns n!
//
// Consider adopting MDN Web Docs' naming conventions: accumulator, currentValue, etc. Can use the
// book to make statements like "accumulator is the total so far". I think the current language
// reads better, but for the sake of introducing people to RTFM, it would be good to be consistent
// with TFM.
function factorial(n) {
	return CountingSequence(n).reduce(multiply, 1);
}
console.assert(factorial(0) == 1, "0! == 1");
console.assert(factorial(1) == 1, "1! == 1");
console.assert(factorial(2) == 2, "2! == 2");
console.assert(factorial(3) == 6, "3! == 6");


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

function inverse(x) {
	return 1/x
}

function componentwise_multiply(a,b) {
	return Sequence(a.length).map(function(i) {
		return a[i] * b[i]
	})
}

function SineApproximation(n) {
	function magnitudes() {
		return Sequence(n)
			.map(Odd)
			.map(factorial)
			.map(inverse);
	}
	function signs() {
		return Sequence(n)
			.map(function(n) { return exponentiate(-1,n) });
	}
	function coefficients() {
		return componentwise_multiply(magnitudes(), signs())
			.flatMap(function(c) { return [0,c] });
	}
	return Polynomial(coefficients());
}

function Odd(n) {
	return 2 * n + 1;
}
	

function Ball(center, radius) {
	return function(point) {
		return (center - radius) < point && point < (center + radius);
	}
}

function sin(x) {
	return SineApproximation(20)(x);
}
console.assert(Ball(0,0.1)(sin(0)), "Twentieth degree approximation of sine(0) is ~ 0")
console.assert(Ball(1,0.1)(sin(3.14 / 2)), "Twentieth degree approximation of sine(3.14 / 2) is ~ 1")
console.assert(Ball(0,0.1)(sin(3.14)), "Twentieth degree approximation of sine(3.14) is ~ 0")
console.assert(Ball(-1,0.1)(sin(3.14 * 3/2)), "Twentieth degree approximation of sine(3/2 * 3.14) is ~ -1")
console.assert(Ball(0,0.1)(sin(3.14 * 2)), "Twentieth degree approximation of sine(2 * 3.14) is ~ 0")

function dot_product(a,b) {
	return componentwise_multiply(a,b).reduce(add)
}
console.assert(dot_product([1,0,1],[0,1,0]) == 0, "Dot product of orthogonal vectors is zero")
console.assert(dot_product([1,0,1],[1,0,1]) == 2, "Dot product of parallel vectors is the product of their magnitudes")

function apply_matrix(matrix, vector) {
	return matrix.map(function(column) {
		return dot_product(column, vector)
	})
}
console.assert(apply_matrix([[1,0],[0,1]],[1,2]) == '1,2', "Identity matrix preserves vector")
console.assert(apply_matrix([[0,0],[0,0]],[1,2]) == '0,0', "Zero matrix yields zero vector")
console.assert(apply_matrix([[0,1],[1,0]],[1,2]) == '2,1', "Permute matrix permutes vector")

function identity(x) {
	return x;
}

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

function DerivativeMatrix(length) {
	return CountingSequence(length).map(function(i) {
		return Sequence(length).map(function(j) {
			return i * (j == i);
		});
	});
}

function Derivative(coefficients) {
	return apply_matrix(DerivativeMatrix(coefficients.length), coefficients)
}

console.log("d/dx(" + format_polynomial([1,1,2]) + ") = " + format_polynomial(Derivative([1,1,2])))
