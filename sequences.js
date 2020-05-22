'use strict';

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
