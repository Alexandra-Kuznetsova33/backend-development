const http = require('http');
const { getUsers } = require('./modules/users');

const PORT = process.env.PORT || 3003;
const HOST = '127.0.0.1';

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${HOST}`);
    const searchParams = url.searchParams;

    if (searchParams.has('hello')) {
        const name = searchParams.get('hello');
        
        if (name) {
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(`Hello, ${name}.`);
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Enter a name');
        }
    } 
    else if (searchParams.has('users')) {
        try {
            const users = await getUsers();
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(users));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Internal Server Error');
        }
    } 
    else if (url.search === '') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Hello, World!');
    } 
    else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(); 
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Сервер запущен по адресу http://${HOST}:${PORT}`);
});