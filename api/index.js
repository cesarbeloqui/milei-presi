const app = require("./src/app");

app.listen(process.env.PORT || 3000, () => {
  console.log("Escuchando en el puerto 3000");
});
