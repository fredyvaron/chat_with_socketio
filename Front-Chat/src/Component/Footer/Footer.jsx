import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const socialIcons = [
    {
      name: "LinkedIn",
      icon: (
        <FontAwesomeIcon
          icon={faLinkedinIn}
          className="h-8 w-8 text-black transition duration-500 ease-in-out  hover:scale-125 hover:text-gray-600"
        />
      ),
      link: "https://www.linkedin.com/in/fredyalbertovaronguzman/",
    },
    {
      name: "Facebook",
      icon: (
        <FontAwesomeIcon
          icon={faFacebook}
          className="h-8 w-8 text-black transition duration-500 ease-in-out hover:scale-125 hover:text-gray-600"
        />
      ),
      link: "https://web.facebook.com/fredyalberto.varonguzman/",
    },
    {
      name: "Github",
      icon: (
        <FontAwesomeIcon
          icon={faGithub}
          className="h-8 w-8 text-black transition duration-500 ease-in-out hover:scale-125 hover:text-gray-600"
        />
      ),
      link: "https://github.com/fredyvaron",
    },
    {
      name: "Coffee",
      icon: (
        <FontAwesomeIcon
          icon={faCoffee}
          className="h-8 w-8 text-black transition duration-500 ease-in-out hover:scale-125 hover:text-gray-600"
        />
      ),
      link: "",
    },
  ];

  return (
    <footer className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row" style={{ height: '60px' }}>
      <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
        <p className="text-gray-500 text-sm text-center sm:text-left">
          ©2022 Fredy
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
          {socialIcons.map((icon) => (
            <a
              key={icon.name}
              href={icon.link}
              className="text-gray-600 hover:text-gray-800 ml-4"
              target="_blank"
            >
              {icon.icon}
            </a>
          ))}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
