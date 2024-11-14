import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { playerActions, deletePodcast } from '../../store/player';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const PodcastCard = ({ items, onDelete }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Function to play the podcast
  const handlePlay = (e) => {
    if (isLoggedIn) {
      e.preventDefault();
      dispatch(playerActions.setDiv());
      dispatch(playerActions.changeImage(`https://vibecast-v9sc.onrender.com/${items.frontImage}`));
      dispatch(playerActions.changeSong(`https://vibecast-v9sc.onrender.com/${items.audioFile}`));
      toast.info("Playing podcast!", { autoClose: 2000 });
    } else {
      toast.warn("Please log in to play the podcast.", { autoClose: 2000 });
    }
  };

  // Handle deleting the podcast with a custom toast confirmation
  const handleDelete = async () => {
    const deleteToast = toast(
      <div>
        <p>Are you sure you want to delete this podcast?</p>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            onClick={async () => {
              await dispatch(deletePodcast(items._id, onDelete));
              toast.success("Podcast deleted successfully!", { autoClose: 2000 });
              toast.dismiss(deleteToast);
            }}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
            onClick={() => toast.dismiss(deleteToast)}
          >
            No
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  return (
    <div className="border p-3 rounded-lg flex flex-col shadow-md hover:shadow-lg transition-all duration-300 max-w-[270px] mx-auto">
      <ToastContainer position="top-center" draggable />

      <Link to={`/description/${items._id}`}>
        <div>
          <img
            src={`https://vibecast-v9sc.onrender.com/${items.frontImage}`}
            alt={items.title}
            className="rounded-t-md w-full h-[30vh] object-fill"
          />
        </div>
      </Link>

      <div>
        <Link to={`/description/${items._id}`}>
          <div className="mt-2 text-sm font-semibold">{items.title.slice(0, 20)}</div>
          <div className="mt-1 text-xs leading-tight text-slate-500">{items.description.slice(0, 50)}</div>
          <div className="mt-2 bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-2 py-1 text-center text-xs font-medium">
            {items.category.categoryName}
          </div>
        </Link>

        <div className="mt-2 flex gap-2">
          <Link
            to={isLoggedIn ? "#" : "/signup"}
            className="bg-green-900 text-white px-3 py-1 rounded flex items-center justify-center text-sm hover:bg-green-800 transition-all duration-300 w-full"
            onClick={handlePlay}
          >
            Play Now
          </Link>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-500 transition-all duration-300 w-full"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
