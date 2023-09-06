export const calculateStatistics = (data) => {
	const len = data.length;
	const count = {};

	let largest = 0;
	let mode = 0;
	let median = 0;
	let sum = 0;

	data.sort((a, b) => b - a);
	data.forEach((val) => {
		sum += val;

		count[val] = count[val] ? count[val] + 1 : 1;

		if (count[val] > largest) {
			largest = count[val];
			mode = val;
		}
	});

	const middle = len / 2;

	if (len % 2 === 0) {
		median = (data[middle] + data[middle - 1]) / 2;
	} else {
		median = data[Math.floor(middle)];
	}

	return { mean: (sum / len).toFixed(3), median: median.toFixed(3), mode: mode.toFixed(3) };
};

export const calculateGamma = ({ Ash, Hue, Magnesium }) => (Ash * Hue) / Magnesium;
