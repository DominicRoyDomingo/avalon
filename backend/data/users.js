import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "johndoe@email.com",
    password: bcrypt.hashSync("johndoe", 10),
  },
  {
    name: "Jane Doe",
    email: "janedoe@email.com",
    password: bcrypt.hashSync("janedoe", 10),
  },
  {
    name: "Roland Roe",
    email: "rolandroe@email.com",
    password: bcrypt.hashSync("rolandroe", 10),
  },
  {
    name: "Karen Manager",
    email: "pretend@manager.com",
    password: bcrypt.hashSync("karenmanager", 10),
  },
];

export default users;
