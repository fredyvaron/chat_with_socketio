const {
  getAllUser,
  getUserId,
  editUser,
  searchByUser,
  filterUserPassword,
} = require("../services/User.service");
const config = require("../utils/UploadCloudinary")
const cloudinary = require("cloudinary").v2
const jwt = require("jsonwebtoken");
const { Forbidden, Ok, Error, NotFound } = require("../utils/HttpResponse");

const getUser = async (req, res) => {
  try {
    let data = await getAllUser();
    return Ok(res, data);
  } catch (error) {
    return Error(res, error);
  }
};
const getUserById = async (req, res) => {
  try {
    let { id } = req.params;
    const data = await getUserId(id);
    if (data == null) {
      return NotFound(res, "Usario no encontrado");
    }
    return Ok(res, data);
  } catch (error) {
    return Error(res, error);
  }
};
const updateUserById = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  cloudinary.config(config);

  try {
    if(req.file){
      const image = await cloudinary.uploader.upload(req.file.path)
      body.image = image.secure_url;
        }
    let data = await editUser(body, id);
    if (!data) {
      NotFound(res, "User not found");
    }
    const filterpass = await filterUserPassword(data);
    const token = jwt.sign({ filterpass }, process.env.KEY_SECRET);
    return Ok(res, { user: data, token });
  } catch (error) {
    console.log(error, "data");
    Error(res, error);
  }
};
const searchByName = async (req, res) => {
  const { name } = req.params;
  try {
    const data = await searchByUser(name);
    if (!data.length) {
      return NotFound(res, "user not found by name");
    }
    return Ok(res, data);
  } catch (error) {
    console.log(error, "error");
    Error(res, error);
  }
};
module.exports = {
  getUser,
  getUserById,
  updateUserById,
  searchByName,
};
