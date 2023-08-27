const {Router} = require("express");

const usersRouter = Router();
usersRouter.post("/", (req, res) => {
    res.send("Creando un user");
})
usersRouter.get("/", (req, res) => {
    res.send("Dando todos los usuarios");
})
usersRouter.get("/id", (req, res) => {
    res.send("Dando usuario por id e ip");
})



module.exports = usersRouter;