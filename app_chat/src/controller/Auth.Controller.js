const { emailUser, registerUsers, comparePassword, filterUserPassword } = require("../services/User.service");
const { Forbidden, Ok, Error, NotFound, Unauthorized } = require("../utils/HttpResponse");
const config = require("../utils/UploadCloudinary")
const cloudinary = require('cloudinary').v2;

const registerUser = async (req, res) => {
  const body = req.body;
  const exist = await emailUser(body.email);
  cloudinary.config(config);
  if (exist !== null) {
    return Forbidden(res, "Ya existe ese email");
  }
    if (!req.file) {
    return Error(res, "No se proporcionó un archivo");
  }
  try {
    const image = await cloudinary.uploader.upload(req.file.path);
    body.image = image.secure_url;
    const data = await registerUsers(body);
    return Ok(res, data);
  } catch (error) {
    return Error(res, error);
  }
};
const loginUser = async (req, res) => {
  const body = req.body;
  try {
    const user = await emailUser(body.email);
    if (user) {
      const password = comparePassword(body.clave, user.clave)
      if(password){
        const filter = await filterUserPassword(user)
        return Ok(res, filter)
      }
    }
    return Unauthorized(res, "No Autorizado");
    
  } catch (error) {
    return Error(res, error)
  }
};

module.exports = { registerUser, loginUser };
