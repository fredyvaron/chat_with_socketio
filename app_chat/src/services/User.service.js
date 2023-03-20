const { User } = require("../db");
const bcrypt = require("bcrypt");
const db = require("../db");
const { Op } = require("sequelize");
const registerUsers = async (body) => {
  console.log(body.clave, "body");
  body.clave = bcrypt.hashSync(body.clave, bcrypt.genSaltSync(8));

  const user = await db.User.create(body);
  const filter = await filterUserPassword(user);
  return filter;
};
//function editarUser with sequalize

const editUser = async (user, id) => {
  const [rowsAffected, [updatedUser]] = await User.update({...user}, { where: {id: id}, returning: true });
  return updatedUser;
};
const emailUser = async (email) => {
  return await User.findOne({ where: { email: email } });
};
const filterUserPassword = async (user) => {
  const response = {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    image: user.image,
  };
  return response;
};
const getAllUser = async () => {
  return await User.findAll();
};
const getUserId = async (id) => {
  return await User.findOne({ where: { id: id } });
};
const searchByUser = async (name) => {
  return await User.findAll({
    where: {
      nombre: {
        [Op.like]: `%${name}%`,
      },
    },
    limit: 5,
  });
};
const comparePassword = (password, passworduser) => {
  const math = bcrypt.compareSync(password, passworduser);
  return math;
};

module.exports = {
  registerUsers,
  emailUser,
  filterUserPassword,
  getAllUser,
  getUserId,
  comparePassword,
  editUser,
  searchByUser,
};
