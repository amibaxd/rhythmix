import { useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useGetAllSongsQuery } from "./songApiSlice";
import SongCard from "./SongCard";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const SongsPage = () => {
  const [searchParams] = useSearchParams({ page: 1 });
  const page = searchParams.get("page");
  const {
    data: { songs, total } = {},
    isLoading,
    isError,
    error,
  } = useGetAllSongsQuery({ page: page ?? 1, limit: 8 });
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.search]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorMsg error={error} />;
  }

  return (
    <section className="text-gray-100">
      <Helmet prioritizeSeoTags>
        <title>{`Explore - RhythMix`}</title>
        <link rel="canonical" href={`https://RhythMix.vercel.app/explore`} />
        <meta
          name="description"
          content={`Browse amazing collection of songs on RhythMix`}
        />
        <meta property="og:title" content="Explore - RhythMix" />
        <meta
          property="og:url"
          content={`https://RhythMix-server.vercel.app/songs`}
        />
        <meta
          property="og:description"
          content={`Browse amazing collection of songs on RhythMix`}
        />
        <meta name="twitter:title" content="Explore - RhythMix" />
        <meta
          name="twitter:description"
          content="Browse amazing collection of songs on RhythMix"
        />
      </Helmet>
      <h1 className="text-xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-neon to-cosmic bg-clip-text text-transparent">
        Explore
      </h1>
      <p className="mb-8 text-gray-300 font-light">
        Browse amazing collection of songs on RhythMix
      </p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {songs?.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </motion.div>
      <div className="flex justify-end mt-8">
        <Pagination
          path={pathname}
          currentPage={Number(page || 1)}
          totalPages={Math.ceil(total / 8)}
        />
      </div>
    </section>
  );
};

export default SongsPage;
