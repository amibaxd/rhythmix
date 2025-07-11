import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomeBanner = () => {
  const selectedTheme = useSelector((state) => state.theme);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/explore");
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative bg-gradient-to-br from-neon via-cosmic to-vibrant bg-cover bg-center bg-no-repeat h-[400px] rounded-xl flex flex-col justify-center items-center text-white overflow-hidden`}
        style={{
          backgroundImage: `url("https://res.cloudinary.com/ojigs/image/upload/v1698508697/Jollify/jollify_bg_o1mvww.webp")`,
        }}
      >
        <div className="absolute inset-0 rounded-xl flex flex-col justify-center items-start p-6 text-white bg-primary/40 backdrop-blur-sm">
          <h1 className="text-3xl md:text-5xl font-groove-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon to-cosmic">
            Discover Great Music
          </h1>
          <p className="md:text-lg mb-10 text-gray-200 font-groove-light">
            Explore the latest songs, albums, and playlists on RhythMix
          </p>
          <button
            className={`bg-${selectedTheme} text-white hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-3 px-8 rounded-full md:text-lg font-semibold transition-all duration-300 neon-glow hover:scale-105`}
            onClick={handleClick}
          >
            Start listening
          </button>
        </div>
      </motion.section>
    </>
  );
};

export default HomeBanner;
