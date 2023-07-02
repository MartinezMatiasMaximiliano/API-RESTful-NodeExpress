require("dotenv").config();
const express = require("express");
const app = express();
const { leerFrutas, guardarFrutas } = require("./src/frutasManager");
const PORT = process.env.PORT || 3000;
let DB = [];

//Middleware
app.use(express.json());
app.use((req, res, next) => {
    DB = leerFrutas();
    next();
});


//GET
app.get("/frutas", (req, res) => {
    res.send(DB);
});

app.get("/frutas/id/:id", (req, res) => {
    const idBuscado = parseInt(req.params.id)
    const encontrado = DB.find((value, index, array) => value.id === idBuscado)
    encontrado ? res.status(200).send(encontrado) : res.status(404).send({ code: 404, message: `id Not found` });
});

app.get("*", (req, res) => {
    res.status(404).send("404 no encontrado");
});


//POST

app.post("/frutas/agregar/", (req, res) => {
    const fruta = req.body;
    fruta.id = DB.length + 1 //buscar el ultimo ID y sumar 1
    DB.push(fruta);
    guardarFrutas(DB);
    res.status(201).send("Fruta agregada");
});

//PUT 

app.put("frutas/modificar/id/:id", (req, res) => {
    const idBuscado = parseInt(req.params.id)
    const encontrado = DB.findIndex((value, index, array) => value.id === idBuscado)
    if (encontrado != -1) {

        const nuevaInfo = req.body;
        nuevaInfo.id = encontrado;//mantener el ID original

        DB[encontrado] = nuevaInfo;
        guardarFrutas(DB)
        res.status(201).send({ code: 202, message: "Fruta modificada" });
    } else {
        res.status(404).send({ code: 404, message: "id no encontrado" });
    }

});


//DELETE
app.delete("frutas/eliminar/id/:id", (req, res) => {
    const idBuscado = parseInt(req.params.id)
    const encontrado = DB.find((value, index, array) => value.id === idBuscado)
    if (encontrado) {
        DB.splice(DB.length - 1, 1)
        guardarFrutas(DB);
        res.status(202).send({ code: 202, message: 'Fruta removida' })
    } else {
        res.status(404).send({ code: 404, message: `id no encontrado` })
    }
});


//iniciar server
app.listen(PORT, () => {
    console.log(`escuchando ${PORT}`);
})