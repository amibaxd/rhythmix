import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLoginUserMutation } from "./authApiSlice";
import { FaMusic, FaGoogle, FaTwitter } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { loginSchema } from "../../utils/schema";
import { Helmet } from "react-helmet-async";
import { setProvider } from "./authSlice";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const selectedTheme = useSelector((state) => state.theme);
  const [validationErrors, setValidationErrors] = useState({});
  const [login, { isLoading, isError, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error } = loginSchema.validate(formData, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: false,
    });

    if (error) {
      const errors = {};
      error.details.forEach(
        (detail) => (errors[detail.path[0]] = detail.message)
      );
      setValidationErrors(errors);
      return;
    }

    try {
      const { error } = await login(formData);
      if (error) {
        console.error(error);
      } else {
        if (location?.state?.from === "/signup") {
          navigate("/");
        } else {
          navigate(-1);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = (provider) => {
    dispatch(setProvider(provider));
  };

  return (
    <section className="text-gray-100 h-full bg-gradient-to-br from-primary via-secondary-100 to-secondary-200">
      <Helmet prioritizeSeoTags>
        <title>{`Log in - RhythMix`}</title>
        <link
          rel="canonical"
          href={`${import.meta.env.VITE_BEATIFY_FRONTEND_URL}/login`}
        />
        <meta
          name="description"
          content="Log in to RhythMix to enjoy exclusive content and features. Our secure login process ensures that your personal information is protected."
        />
        <meta property="og:title" content="Log in - RhythMix" />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_BEATIFY_BACKEND_URL}/login`}
        />
        <meta
          property="og:description"
          content={`Log in to RhythMix to enjoy exclusive content and features. Our secure login process ensures that your personal information is protected.`}
        />
        <meta name="twitter:title" content="Log in - RhythMix" />
        <meta
          name="twitter:description"
          content="Log in to RhythMix to enjoy exclusive content and features. Our secure login process ensures that your personal information is protected."
        />
      </Helmet>
      <div className="flex flex-col justify-center h-full max-w-[768px] m-auto glass-effect rounded-2xl p-8 neon-border">
        <div className="mb-8">
          <span
            className={`text-xs flex gap-1 items-center mb-2 tracking-widest drop-shadow-md font-bold contrast-100`}
          >
            <span className="filter-none">
              <FaMusic className={`text-${selectedTheme} `} />
            </span>
            <span className="saturate-200">RhythMix</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-groove-bold text-transparent bg-clip-text bg-gradient-to-r from-neon to-cosmic">
            Log in
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-0 p-1">
          <div className="sm:w-[45%] sm:pr-[10%]">
            <a
              href={`${import.meta.env.VITE_BEATIFY_BACKEND_URL}/auth/google`}
              onClick={() => handleClick("google")}
              className="provider flex items-center gap-4 rounded-lg mb-2 p-3 bg-secondary-100/50 hover:bg-secondary-100 active:translate-y-[1px] transition-all duration-300 w-full neon-border hover:neon-glow"
            >
              <FaGoogle />
              <span>Log in with Google</span>
            </a>
            <button className="provider flex items-center gap-4 rounded-lg mb-2 p-3 bg-secondary-100/50 hover:bg-secondary-100 active:translate-y-[1px] transition-all duration-300 w-full cosmic-border hover:cosmic-glow">
              <FaTwitter />
              <span>Log in with Twitter</span>
            </button>
          </div>
          <div className="sm:w-[0%]">
            <div className="flex items-center sm:flex-col  h-full">
              <span className="h-[2px] w-[2px] flex-grow bg-gray-400"></span>
              <span className="border-2 border-gray-400 p-2 rounded-lg">
                OR
              </span>
              <span className="h-[2px] w-[2px] flex-grow bg-gray-400"></span>
            </div>
          </div>
          <div className="sm:pl-[10%] sm:w-[55%]">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full bg-secondary-100/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon focus:border-transparent p-3 text-white placeholder-gray-400 border border-gray-600/50"
                  required
                />
                {validationErrors.username && (
                  <span className="block text-sm mt-2 saturate-100 text-red-500">
                    {validationErrors.username}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-secondary-100/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon focus:border-transparent p-3 text-white placeholder-gray-400 border border-gray-600/50"
                  required
                />
                {validationErrors.password && (
                  <span className="block text-sm mt-2 saturate-100 text-red-500">
                    {validationErrors.password}
                  </span>
                )}
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className={`bg-${selectedTheme} ${
                    !isLoading
                      ? `hover:bg-${selectedTheme}-50 active:translate-y-[1px] neon-glow`
                      : `bg-opacity-50 cursor-not-allowed`
                  } w-full text-white text-center font-bold py-3 px-6 rounded-lg transition-all duration-300`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin m-auto text-2xl text-gray-400" />
                  ) : (
                    `Log in`
                  )}
                </button>

                {isError && (
                  <span className="block text-sm mt-2 saturate-100 text-red-500">
                    {error?.data?.message ||
                      error?.data?.error?.details[0].message}
                  </span>
                )}
              </div>
              <div className="text-center">
                <span>New to RhythMix?</span>{" "}
                <Link
                  to={{
                    pathname: `/signup`,
                    state: { from: location.pathname },
                  }}
                  className={`text-${selectedTheme}-50`}
                >
                  Sign up now!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
