const fs = require('fs');
const steam = require('node:stream');

const filePath = './access_tmp.log';

const readStream = fs.createReadStream(filePath, 'utf8');

const transformStreamFirst = new steam.Transform({
	transform(chunk, encoding, callback) {
		const firstIpChunk = chunk.toString().trim().split('\n').filter(item => item.includes('89.123.1.41')).join('').toString();
		this.push(firstIpChunk)

		callback()
	}
})
const transformStreamSecond = new steam.Transform({
	transform(chunk, encoding, callback) {
		const SecondIpChunk = chunk.toString().trim().split('\n').filter(item => item.includes('34.48.240.111')).join('').toString();
		this.push(SecondIpChunk)

		callback()
	}
})

const writeStreamFirstIp = fs.createWriteStream('./89.123.1.41_requests.log')
const writeStreamSecondIp = fs.createWriteStream('./34.48.240.111_requests.log')

readStream
	.pipe(transformStreamFirst)
	.pipe(writeStreamFirstIp)

readStream
	.pipe(transformStreamSecond)
	.pipe(writeStreamSecondIp)