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

function invert(k) {
	return 1/k
}
