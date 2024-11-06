import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { playerActions } from '../../store/player';
const PodcastCard = ({ items }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const handlePlay = (e) =>{
   if(isLoggedIn){
    e.preventDefault();
    dispatch(playerActions.setDiv());
    dispatch(playerActions.changeImage(`http://localhost:1000/${items.frontImage}`));
    dispatch(playerActions.changeSong(`http://localhost:1000/${items.audioFile}`));
   }
  };
  return (
    <div className="border p-3 rounded-lg flex flex-col shadow-md hover:shadow-lg transition-all duration-300 max-w-[270px] mx-auto">
      <Link to={`/description/${items._id}`}>
        <div>
          <img 
            src={`http://localhost:1000/${items.frontImage}`} 
            alt={items.title} 
            className="rounded-t-md w-full h-[30vh] object-fill" 
          />
        </div>
      </Link>

      <div className=''>
        <Link to={`/description/${items._id}`}>
          <div className="mt-2 text-sm font-semibold">
            {items.title.slice(0, 20)}
          </div>
          <div className="mt-1 text-xs leading-tight text-slate-500">
            {items.description.slice(0, 50)}
          </div>
          <div className="mt-2 bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-2 py-1 text-center text-xs font-medium">
            {items.category.categoryName}
          </div>
        </Link>
        <div className="mt-2">
          <Link
            to={isLoggedIn ? "#" : "/signup"}
            className="bg-green-900 text-white px-3 py-1 rounded flex items-center justify-center text-sm hover:bg-green-800 transition-all duration-300"
          onClick={handlePlay}
          >
            Play Now
          </Link>
        </div>  
      </div>  
    </div>
  );
};

export default PodcastCard;
