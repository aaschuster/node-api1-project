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

server.put("/api/users/:id", async (req, res) => {
    try {
        const { name, bio } = req.body;
        const {id} = req.params;

        if(!name || !bio) {
            res.status(422).json( {
                message: "Name and Bio are both required"
            })
        } else {
            const updatedUser = await User.update(id, req.body);
            if(!updatedUser) {
                res.status(404).json( {
                    message: `Can't find user with ID of ${id}`
                })
            } else {
                res.status(201).json( {
                    message: "User successfully updated",
                    data: updatedUser
                })
            }
        }
    } catch (err) {
        res.status(500).json( {
            message: `Something went wrong... ${err}`
        })
    }
})

server.delete("/api/users/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deletedUser = await User.remove(id);
        if(!deletedUser) {
            res.status(404).json({
                message: `Can't find user with ID of ${id}`
            })
        } else {
            res.json({
                message: "User deleted",
                data: deletedUser
            })
        }
    } catch (err) {
        res.status(500).json( {
            message: `Something went wrong... ${err}`
        })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
