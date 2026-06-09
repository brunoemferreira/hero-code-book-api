const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();
app.use(express.json());

const users = [];
const books = [];

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

app.post("/books", (req, res) => {
  const { name, author, company, description, user_id } = req.body;

  books.push({ name, author, company, description, id: uuid(), user_id });

  return res.status(201).json({ message: "Book created successfully" });
});

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
