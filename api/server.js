// BUILD YOUR SERVER HERE

const express = require("express");

const User = require("./users/model.js")

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ message: "this is a test"});
})

server.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json( {
            message: `Something went wrong... ${err}`
        })
    }
})

server.get("/api/users/:id", async (req, res) => {
    try {
        const {id} = req.params;

        const user = await User.findById(id);
        if(!user) 
            res.status(404).json({ 
                message: `Can't find user with ID of ${id}`
            })
        else res.status(200).json(user);
    } catch (err) {
        res.status(500).json( {
            message: `Something went wrong... ${err}`
        })
    }
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
