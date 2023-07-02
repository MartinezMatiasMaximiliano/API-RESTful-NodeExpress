const fs = require('fs');
require('dotenv').config()

function guardarFrutas(frutas) {
    const datos = JSON.stringify(frutas);
    fs.writeFileSync(__dirname + process.env.DATABASE_PATH, datos)

}

function leerFrutas() {

    const stringLeido = fs.readFileSync(__dirname + process.env.DATABASE_PATH, "utf8");
    const json = JSON.parse(stringLeido);
    return json;
}

module.exports = {
    leerFrutas,
    guardarFrutas,
};