import { useDispatch, useSelector } from "react-redux";
import {
  toggleAddToPlaylistModal,
  toggleLoginModal,
  setMessage,
  setSongId,
} from "../app/modalSlice";
import { FaPlus } from "react-icons/fa";

const AddToPlaylistButton = ({ songId }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const openModal = (songId) => {
    if (!isAuthenticated) {
      dispatch(setMessage("add song to playlist"));
      dispatch(toggleLoginModal());
    } else {
      dispatch(setSongId(songId));
      dispatch(toggleAddToPlaylistModal());
    }
  };

  return (
    <button
      onClick={() => openModal(songId)}
      className="hover:scale-110 transition-all duration-300"
      title="Add to playlist"
    >
      <FaPlus className="font-extralight text-gray-400 hover:text-neon transition-colors duration-300" />
    </button>
  );
};

export default AddToPlaylistButton;
