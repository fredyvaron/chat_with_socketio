const nodemailer = require("nodemailer");
const ejs = require("ejs");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.mailer_user,
    pass: process.env.mailer_pass,
  },
});

function enviarCorreo(remitente, destinatario, asunto, nombre, mensaje) {
  ejs.renderFile(__dirname + "/correo.ejs", { remitente, asunto, mensaje, nombre }, function (error, data) {
    if (error) {
      console.log(error);
      throw new Error("Ocurrió un error al renderizar la plantilla de correo electrónico.");
    } else {
      const mailOptions = {
        from: remitente,
        to: destinatario,
        subject: asunto,
        html: data,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          console.log("Ocurrió un error al enviar el correo electrónico."+error);
        } else {
          console.log("El correo electrónico se envió correctamente: " + info.response);
        }
      });
    }
  });
}
  
  module.exports = {enviarCorreo};
