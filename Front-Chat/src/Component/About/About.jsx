import React from "react";
import Chatsvg from "../../assets/undraw_chat_re_re1u.svg";
const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col sm:flex-row m-6">
        <div className="mb-10 sm:basis-2/4 mr-16">
          <img
            src={Chatsvg}
            className="w-full h-full object-contain transform ease-in-out delay-150 hover:translate-y-2 hover:scale-105"
          />
        </div>
        <div className="sm:ml-10 sm:mr-10 sm:basis-2/4 items-center">
          <div className="text-center text-xl font-sans mb-5">Chat</div>
          <p className="text-justify hover:text-slate-800 text-lg">
            Este proyecto de chat personal fue creado utilizando las siguientes
            tecnologías:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-4 text-justify hover:text-slate-800 text-lg">
            <li>React</li>
            <li>Redux Toolkit</li>
            <li>Tailwind CSS</li>
            <li>React Toastify</li>
            <li>Socket.IO (Frontend)</li>
            <li>Node.js</li>
            <li>Express</li>
            <li>PostgreSQL</li>
            <li>Nodemailer</li>
            <li>Socket.IO (Backend)</li>
            <li>Sequelize</li>
            <li>Passport</li>
            <li>jsonwebtoken</li>
            <li>Cloudinary</li>
            <li>bcrypt</li>
          </ul>
        </div>
      </div>
      ¿
    </div>
  );
};

export default About;
