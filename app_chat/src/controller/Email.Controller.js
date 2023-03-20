const { Ok, Error } = require("../utils/HttpResponse");
const { enviarCorreo } = require("../utils/sendEmail");

const sendMail = async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const mensaje = req.body.mensaje;
    const asunto = req.body.asunto;
    const destinatario = correo;
    const cuerpo = `Nombre:  ${nombre}  \n Correo electrónico:   ${correo} \n      Mensaje: ${mensaje}`;
    enviarCorreo(correo, destinatario, asunto, nombre, mensaje) ;
    return Ok(res, "Correo Elctronico Enviado");
  } catch (error) {
    console.log(error);
    return Error(res, error.message);
  }
};
module.exports = { sendMail };
