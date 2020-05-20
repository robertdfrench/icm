function add(a,b) {
	return a + b
}

// returns [1,2,3,...,n]
function CountingSequence(n) {
	elements = [];
	i = 1
	while(i <= n) {
		elements.push(i);
		i = i + 1;
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
	p = coefficients.map(Monomial);
	return function(x) {
		function sum(accumulator, currentMonomial) {
			return accumulator + currentMonomial(x);
		}
		return p.reduce(sum, 0);
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
	result = []
	IndexSequence(a.length).map(function(i) {
		result[i] = a[i] * b[i]
	})
	return result
}

function SineApproximation(n) {
	magnitudes = CountingSequence(n)
		.map(Odd)
		.map(factorial)
		.map(inverse);
	signs = CountingSequence(n)
		.map(function(n) { return exponentiate(-1,n-1) });
	coefficients = componentwise_multiply(magnitudes, signs)
		.flatMap(function(c) { return [0,c] });

	return Polynomial(coefficients);
}

function Odd(n) {
	return 2 * n - 1;
}
	

function Ball(center, radius) {
	lower_bound = center - radius;
	upper_bound = center + radius;
	return function(point) {
		return lower_bound < point && point < upper_bound
	}
}

sin = SineApproximation(20)
console.assert(Ball(0,0.1)(sin(0)), "Twentieth degree approximation of sine(0) is ~ 0")
console.assert(Ball(1,0.1)(sin(3.14 / 2)), "Twentieth degree approximation of sine(3.14 / 2) is ~ 1")
console.assert(Ball(0,0.1)(sin(3.14)), "Twentieth degree approximation of sine(3.14) is ~ 0")
console.assert(Ball(-1,0.1)(sin(3.14 * 3/2)), "Twentieth degree approximation of sine(3/2 * 3.14) is ~ -1")
console.assert(Ball(0,0.1)(sin(3.14 * 2)), "Twentieth degree approximation of sine(2 * 3.14) is ~ 0")

sin = SineApproximation(10)

function dot_product(a,b) {
	return componentwise_multiply(a,b).reduce(add)
}
console.assert(dot_product([1,0,1],[0,1,0]) == 0, "Dot product of orthogonal vectors is zero")
console.assert(dot_product([1,0,1],[1,0,1]) == 2, "Dot product of parallel vectors is the product of their magnitudes")
