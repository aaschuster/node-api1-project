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
            message: "The users information could not be retrieved"
        })
    }
})

server.get("/api/users/:id", async (req, res) => {
    try {
        const {id} = req.params;

        const user = await User.findById(id);
        if(!user) 
            res.status(404).json({ 
                message: "The user with the specified ID does not exist"
            })
        else res.status(200).json(user);
    } catch (err) {
        res.status(500).json( {
            message: "The user information could not be retrieved"
        })
    }
})

server.post("/api/users", async (req, res) => {
    try {
        const { name, bio } = req.body;

        if(!name || !bio ) {
            res.status(400).json( {
                message: "Please provide name and bio for the user"
            })
        } else {
            const newUser = await User.insert(req.body);
            res.status(201).json( {
                data: newUser
            })
        }
    } catch (err) {
        res.status(500).json( {
            message: "There was an error while saving the user to the database"
        })
    }
})

server.put("/api/users/:id", async (req, res) => {
    try {
        const { name, bio } = req.body;
        const {id} = req.params;

        if(!name || !bio) {
            res.status(400).json( {
                message: "Please provide name and bio for the user"
            })
        } else {
            const updatedUser = await User.update(id, req.body);
            if(!updatedUser) {
                res.status(404).json( {
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.status(200).json( {
                    data: updatedUser
                })
            }
        }
    } catch (err) {
        res.status(500).json( {
            message: "The user information could not be modified"
        })
    }
})

server.delete("/api/users/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deletedUser = await User.remove(id);
        if(!deletedUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            res.json({
                message: "User deleted",
                data: deletedUser
            })
        }
    } catch (err) {
        res.status(500).json( {
            message: "The user could not be removed" 
        })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
