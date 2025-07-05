import { useSelector } from "react-redux";

const Loading = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const image =
    selectedTheme === "cosmic"
      ? "https://res.cloudinary.com/ojigs/image/upload/v1696593675/Jollify/jollify_rock_ff1o0d.gif"
      : selectedTheme === "vibrant"
      ? "https://res.cloudinary.com/ojigs/image/upload/v1696593603/Jollify/jollify_pop_gtzli0.gif"
      : "https://res.cloudinary.com/ojigs/image/upload/v1696593603/Jollify/jollify_pop_gtzli0.gif";

  return (
    <div className="h-full flex justify-center items-center">
      <div className="relative">
        <img
          src={image}
          alt=""
          className="w-24 h-12 md:w-52 md:h-24 neon-glow"
          width={`210px`}
          height={`100px`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neon/20 to-cosmic/20 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loading;
