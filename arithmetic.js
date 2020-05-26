'use scrict';

// Add two numbers
//
// In principle, using this function is no better than simply adding a + b wherever they appear.
// However, once we begin *composing* functions, it will be imminently more helpful to be able to
// represent addition as a function, rather than as an operation.
function add(a,b) {
	return a + b
}
console.assert(add(1,1) == 2, "1 + 1 is 2")
console.assert(add(2,-2) == 0, "2 - 2 is 0")


// Multiply two numbers
//
// Much like the `add` function above, we represent multiplication as a function so that we can
// leverage *composition*. Other than that, it provides no advantage over expressing multiplication
// as an operation.
function multiply(a,b) {
	return a * b
}
console.assert(multiply(0,5) == 0, "0 * 5 == 0")
console.assert(multiply(1,5) == 5, "1 * 5 == 5")
console.assert(multiply(5,1/5) == 1, "5 * 1/5 == 1")


// Given k, returns k + 1
//
// Sometimes it is helpful to be able to transform a series of numbers by one.
function increment(k) {
	return add(k,1)
}
console.assert(increment(0) == 1, "0 -> 1")
console.assert(increment(1) == 2, "1 -> 2")

function negate(k) {
	return multiply(-1,k)
}

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

function identity(x) {
	return x;
}

function inverse(x) {
	return 1/x
}

function Odd(n) {
	return 2 * n + 1;
}
	
