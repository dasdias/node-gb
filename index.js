let colors = require('colors');

const initValue = process.argv.slice(2);
const itnValue = initValue.map((elem) => {
	return parseInt(elem);
})
const [num1, num2] = itnValue;

if (isNaN(num1) || isNaN(num2)) {
	console.log(colors.red("Arguments not a number"));
	process.exit(0);
}

function isPrime(num) {
	if (num < 2) return false;
	for (var i = 2; i < num; i++) {
		if (num % i == 0)
			return false;
	}
	return true;
}
for (var i = num1; i < num2; i++) {
	if (isPrime(i)) console.log(i);
}
// console.log(num1 % num2);