// returns [1,2,3,...,n]
function CountingSequence(n) {
	elements = [];
	while(n > 0) {
		elements.push(n);
		n = n - 1;
	}
	return elements;
}
console.assert(CountingSequence(0).length == 0, "Null CountingSequence is empty");
console.assert(CountingSequence(1).length == 1, "CountingSequence(1) has a singular element");
console.assert(CountingSequence(1)[0] == 1, "CountingSequence(1) has the singular element 1");


// returns [0,1,2,...,n-1]
function IndexSequence(n) {
	elements = [];
	n = n - 1;
	while(n >= 0) {
		elements.push(n);
		n = n - 1;
	}
	return elements;
}
console.assert(IndexSequence(0).length == 0, "Null IndexSequence is empty");
console.assert(IndexSequence(1).length == 1, "IndexSequence(1) has a singular element");
console.assert(IndexSequence(1)[0] == 0, "IndexSequence(1) has the singular element 0");


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
	function multiply_in_order(total_so_far, next_element) {
		return total_so_far * next_element;
	}
	return CountingSequence(n).reduce(multiply_in_order, 1);
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
	CountingSequence(coefficients.length).map(Monomial)
	p = coefficients.map(Monomial);
	return function(x) {
		function sum(accumulator, currentMonomial) {
			return accumulator + currentMonomial(x);
		}
		return p.reduce(sum, 0);
	}
}
console.assert(Polynomial([])(1) == 0, "Null coefficient sequence means P(x) == 0")
console.assert(Polynomial([1,1,1])(1) == 3, "1x^1 + 1x^2 + 1x^3 == 3 when x == 1")
console.assert(Polynomial([1,1,1])(2) == 14, "1x^1 + 1x^2 + 1x^3 == 14 when x == 2")
console.assert(Polynomial([1,1,1])(3) == 39, "1x^1 + 1x^2 + 1x^3 == 14 when x == 3")
console.assert(Polynomial([3,4])(1) == 7, "3x^1 + 4x^2 == 7 when x == 1")
