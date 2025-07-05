import { useState } from "react";
import { useSelector } from "react-redux";
import FavoriteSongs from "./FavoriteSongs";
import FavoriteAlbums from "./FavoriteAlbums";
import FavoritePlaylists from "./FavoritePlaylists";
import { Helmet } from "react-helmet-async";

const FavoritesPage = () => {
  const selectedTheme = useSelector((state) => state.theme);

  const [selectedTab, setSelectedTab] = useState("songs");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <section className="text-gray-100 h-full">
      <Helmet>
        <title>Favorites - RhythMix</title>
      </Helmet>
      <h1 className="text-xl md:text-3xl font-semibold mb-4">Favorites</h1>

      <nav className="flex justify-start gap-4 mb-8">
        <button
          className={`text-lg font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${
            selectedTab === "songs"
              ? `bg-${selectedTheme} text-white neon-glow`
              : `bg-secondary-200/50 text-gray-300 hover:bg-${selectedTheme}/20 hover:text-white border border-gray-600`
          }`}
          onClick={() => handleTabClick("songs")}
        >
          Songs
        </button>
        <button
          className={`text-lg font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${
            selectedTab === "albums"
              ? `bg-${selectedTheme} text-white neon-glow`
              : `bg-secondary-200/50 text-gray-300 hover:bg-${selectedTheme}/20 hover:text-white border border-gray-600`
          }`}
          onClick={() => handleTabClick("albums")}
        >
          Albums
        </button>
        <button
          className={`text-lg font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${
            selectedTab === "playlists"
              ? `bg-${selectedTheme} text-white neon-glow`
              : `bg-secondary-200/50 text-gray-300 hover:bg-${selectedTheme}/20 hover:text-white border border-gray-600`
          }`}
          onClick={() => handleTabClick("playlists")}
        >
          Playlists
        </button>
      </nav>

      {selectedTab === "songs" && <FavoriteSongs />}
      {selectedTab === "albums" && <FavoriteAlbums />}
      {selectedTab === "playlists" && <FavoritePlaylists />}
    </section>
  );
};

export default FavoritesPage;
