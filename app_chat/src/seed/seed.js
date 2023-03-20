const { TypeUser } = require('../db')
async function seed() {
    const comun = await TypeUser.findOne({where: { nombre: "Comun"}})
    console.log(comun, "verifico si exite el tipo de usuario")
    if(!comun) {
        await TypeUser.create({
            nombre: "Comun",
          });
    }


  }
module.exports = seed;