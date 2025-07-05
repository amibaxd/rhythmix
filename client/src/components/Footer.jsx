import { useSelector } from "react-redux";

const Footer = () => {
  const selectedTheme = useSelector((state) => state.theme);

  return (
    <footer>
      <p className="text-gray-400 py-2 font-groove-light flex justify-center items-center  ">
        © {new Date().getFullYear()} RhythMix. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
