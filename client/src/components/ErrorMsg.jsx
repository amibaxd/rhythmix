import { BiErrorCircle } from "react-icons/bi";

const ErrorMsg = ({ error }) => {
  console.error(error);
  return (
    <div className="text-white h-full flex flex-col gap-4 justify-center items-center">
      {error?.data?.message ? (
        <div className="glass-effect p-6 rounded-xl neon-border">
          <p className="text-gray-300 text-center">{error?.data?.message}</p>
        </div>
      ) : (
        <div className="glass-effect p-8 rounded-xl neon-border text-center">
          <BiErrorCircle className="text-red-400 text-4xl mx-auto mb-4 animate-pulse" />
          <h1 className="text-xl font-semibold text-red-400">
            An error has occurred
          </h1>
        </div>
      )}
    </div>
  );
};

export default ErrorMsg;
