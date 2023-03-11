// BUILD YOUR SERVER HERE

const express = require("express");

const User = require("./users/model.js")

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ message: "this is a test"});
})

server.post("/api/users", async (req, res) => {
    try {
        const { name, bio } = req.body;

        if(!name || !bio ) {
            res.status(422).json( {
                message: "Name and Bio are both required"
            })
        } else {
            const newUser = await User.insert(req.body);
            res.status(201).json( {
                message: "New user successfully created",
                data: newUser
            })
        }
    } catch (err) {
        res.status(500).json( {
            message: `Something went wrong... ${err}`
        })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
