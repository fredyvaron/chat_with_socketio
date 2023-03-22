const { TypeUser } = require('../db')
async function seed() {
    const comun = await TypeUser.findOne({where: { nombre: "Comun"}})
    if(!comun) {
        await TypeUser.create({
            nombre: "Comun",
          });
    }


  }
module.exports = seed;