const { Response } = require('express')


const Ok = (res, data) => {
  return res.status(200).json({
    status: 200,
    statusMsg: "Success",
    data: data,
  });
};

const NotFound = (res, data) => {
  return res.status(404).json({
    status: 404,
    statusMsg: "Not Found",
    error: data,
  });
};

const Unauthorized = (res, data) => {
  return res.status(401).json({
    status: 401,
    statusMsg: "Unauthorized",
    error: data,
  });
};

const Forbidden = (res, data) => {
  return res.status(403).json({
    status: 403,
    statusMsg: "Forbidden",
    error: data,
  });
};

const Error = (res, data) => {
  return res.status(500).json({
    status: 500,
    statusMsg: "Internal server error",
    error: data,
  });
};

module.exports ={ Ok, NotFound, Unauthorized, Forbidden, Error };
