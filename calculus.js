'use strict';

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

function AntiderivativeMatrix(length) {
	return Sequence(length).map(function(i) {
		return CountingSequence(length).map(function(j) {
			return (j == i) / j;
		})
	})
}
function Antiderivative(coefficients) {
	return apply_matrix(
		AntiderivativeMatrix(coefficients.length + 1),
		grow_sequence(coefficients, coefficients.length + 1)
	)
}
