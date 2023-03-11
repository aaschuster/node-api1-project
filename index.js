const server = require('./api/server.js');

const port = 9000;

server.listen(9000, () => {
    console.log(`server running at port ${port}`);
})

// START YOUR SERVER HERE
