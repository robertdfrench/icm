'use strict';

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

function sin(x) {
	return SineApproximation(20)(x);
}
console.assert(Ball(0,0.1)(sin(0)), "Twentieth degree approximation of sine(0) is ~ 0")
console.assert(Ball(1,0.1)(sin(3.14 / 2)), "Twentieth degree approximation of sine(3.14 / 2) is ~ 1")
console.assert(Ball(0,0.1)(sin(3.14)), "Twentieth degree approximation of sine(3.14) is ~ 0")
console.assert(Ball(-1,0.1)(sin(3.14 * 3/2)), "Twentieth degree approximation of sine(3/2 * 3.14) is ~ -1")
console.assert(Ball(0,0.1)(sin(3.14 * 2)), "Twentieth degree approximation of sine(2 * 3.14) is ~ 0")
