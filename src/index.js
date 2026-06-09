const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();
app.use(express.json());

const users = [];

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  const emailAlreadyExists = users.some((user) => user.email === email);
  if (emailAlreadyExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  users.push({ name, email, id: uuid() });

  return res.status(201).json({ message: "User created successfully" });
});


app.get("/users", (req, res) => {
    return res.status(200).json(users);
});

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
