'use strict';

function componentwise_multiply(a,b) {
	return Sequence(a.length).map(function(i) {
		return a[i] * b[i]
	})
}

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

function transpose(matrix) {
	return matrix.map(function(column, i) {
		return column.map(function(_,j) {
			return matrix[j][i]
		})
	})
}

function compose_matrix(A, B) {
	return transpose(transpose(B).map(function(vector) {
		return apply_matrix(A, vector)
	}))
}
