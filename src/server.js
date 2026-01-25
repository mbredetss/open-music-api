import server from './server/index.js';

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`server listening to http://localhost:${port}`);
});