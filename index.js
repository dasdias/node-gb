const fs = require('fs');
const url = 'https://docs.google.com/document/d/1uuKKxercOrN4uXx6chCypM7XSXTSRY27Y19KCebfL-s/edit';
const myURL = new URL(url);
console.log(myURL)
// let readFile;


// fs.readFile('access.log', 'utf-8', (err, data) => {
// 	console.log(err);
// 	console.log(data);
// 	readFile = data;
// 	console.log('readFile ', readFile)
// 	fs.writeFile('write-file.log', '\n', { flag: 'a', encoding: 'utf-8' }, (err, data) => console.log(err));
// 	fs.writeFile('write-file.log', readFile, { flag: 'a', encoding: 'utf-8' }, (err, data) => console.log('writeFile err ', err));
// })
// async function getData() {

// 	await fetch(url).then((res) => {
// 		console.log(res);
// 		return res
// 	})
// 		.then((data) => {
// 			console.log(data)
// 		})
// }

// getData();

const readStream = fs.createReadStream(myURL.href, 'utf8');

readStream.on('data', (chunk) => {
	console.log('data', chunk);
	console.log(chunk);
})

// readStream.on('end', () => console.log('File reading finished'));
// readStream.on('error', () => console.log(err));


// const log1 = '127.0.0.1 - - [30/Jan/2021:11:11:20 -0300] "POST /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"';
// const writeStream = fs.createWriteStream('./write-file.log', {
// 	flags: 'a',
// 	encoding: 'utf8'
// });
// writeStream.write('\n');
// writeStream.write(log1);
// writeStream.end(() => console.log('File writing finished'));