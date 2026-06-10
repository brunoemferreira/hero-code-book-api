const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();
app.use(express.json());

const users = [];
const books = [];

function verifyUser(req, res, next) {
  const { email } = req.headers;
  
  const alreadyExistsEmail = users.find((user) => user.email === email);

  if (!alreadyExistsEmail) {
    return res.status(404).json({ message: "User not found" });
  }
  req.user = alreadyExistsEmail;
  return next();
}

// Cria um novo usuário
// Exemplo de uso: POST /users
// Corpo: { "name": "Maria", "email": "maria@example.com" }
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  const emailAlreadyExists = users.some((user) => user.email === email);
  if (emailAlreadyExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  users.push({ name, email, id: uuid() });

  return res.status(201).json({ message: "User created successfully" });
});

// Retorna a lista de usuários
// Exemplo de uso: GET /users
app.get("/users", (req, res) => {
  return res.status(200).json(users);
});

function stringFormatted(string) {
  return string.trim().toLowerCase();
}

// Cria um novo livro
// Exemplo de uso: POST /books
// Corpo: { "name": "O Herói", "author": "Bruno", "company": "Editora X", "description": "Uma história incrível", "user_id": "ID_DO_USUARIO" }
app.post("/books", (req, res) => {
  const { name, author, company, description, user_id } = req.body;

  const bookAlreadyExists = books.find(
    (book) =>
      book.user_id === user_id &&
      stringFormatted(book.name) === stringFormatted(name),
  );
  if (bookAlreadyExists) {
    return res.status(400).json({ error: "Book already exists for this user" });
  }

  books.push({ name, author, company, description, id: uuid(), user_id });

  return res.status(201).json({ message: "Book created successfully" });
});

// Retorna todos os livros de um usuário pelo id do usuário
// Exemplo de uso: GET /books/ID_DO_USUARIO
app.get("/books/:id", (req, res) => {
  const { id } = req.params;

  const findBook = books.filter((book) => {
    return book.user_id === id;
  });
  return res.json(findBook);
});

// Atualiza o nome de um usuário existente
// Exemplo de uso: PUT /users/ID_DO_USUARIO
// Corpo: { "name": "Novo Nome" }
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const findUser = users.find((user) => user.id === id);

  findUser.name = name;

  return res.json(users);
});

// Exclui um usuário pelo ID
// Exemplo de uso: DELETE /users/ID_DO_USUARIO
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIndex, 1);
  return res.json(users);
});

// Exclui um livro pelo ID
// Exemplo de uso: DELETE /books/ID_DO_LIVRO
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;

  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books.splice(bookIndex, 1);
  return res.json(books);
});

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
