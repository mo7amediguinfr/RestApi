// Import required modules
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });
const User = require("./models/user");

// Create the app
const app = express();

// Set up middleware
app.use(express.json());

// Set up the database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB connected..."))
  .catch((err) => console.log(err));


// GET all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// POST a new user
app.post('/users', async (req, res) => {
  const user = new User({
    name: "salma",
    email: "salm@gmail.com",
    password: "14578963256hgdh"
  });

  try {
    const newUser = await user.save();
    res.json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//EDIT A USER BY ID 
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = "fatima";
      user.email = "salm@gmail.com";
      user.password = "14578963256hgdh";

      const updateUser = await user.save();
      res.json(updateUser);
    }
    else {
      res.json({message: 'user not found'})
    }
  } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });

//REMOVE A USER BY ID 

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (user) {
      res.json({message: 'user deleted'})
    }
    else{
      res.json({message: 'user not found'})
    }

  } catch (err)
  {
    res.status(400).json({ message: err.message });
  }
});

app.listen(3000, "localhost", () => {
  console.log(`Server running at http://localhost:3000/`);
});