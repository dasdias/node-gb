import http from "http";
import fs from "fs";
import path from "path";
import { Server } from "socket.io"

const host = "localhost";
const port = 3005;
let clientCount = 0;
const server = http.createServer((req, res) => {
	if (req.method === 'GET') {

		const filePath = path.join(process.cwd(), "./index.html");
		const rs = fs.createReadStream(filePath);

		rs.pipe(res);
	}
});
const io = new Server(server)

io.on('connection', (client) => {
	clientCount++
	console.log(`Websocket connected ${client.id}`)
	// console.log(client.clients());
	client.broadcast.emit('count-client', { count: clientCount })
	client.emit('count-client', { count: clientCount })
	client.broadcast.emit('new-client', { newClient: client.id })
	client.on('client-msg', (data) => {
		// console.log(data);
		client.broadcast.emit('server-msg', { msg: data.msg, name: data.name }) // отсылаем всем
		client.emit('server-msg', { msg: data.msg, name: data.name }) // возвращаем клиенту который отправил.
	})
	client.on("disconnect", (reason) => {
		clientCount--
		console.log(reason);
		console.log(`Websocket disconnect ${client.id}`)
		client.broadcast.emit('count-client', { count: clientCount })
	});

})

// console.log(io.sockets.clients());

server.listen(port, host, () =>
	console.log(`Server running at http://${host}:${port}`)
);
