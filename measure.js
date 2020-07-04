'use strict';

function Ball(center, radius) {
	return function(point) {
		return (center - radius) < point && point < (center + radius);
	}
}
