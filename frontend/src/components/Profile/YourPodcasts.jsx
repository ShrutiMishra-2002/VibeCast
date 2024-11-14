import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import PodcastCard from '../PodcastCard/PodcastCard';

const YourPodcasts = () => {
  const [Podcasts, setPodcasts] = useState([]);

  // Fetch podcasts
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/get-user-podcasts`, {
          withCredentials: true
        });
        setPodcasts(res.data.data);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };
    fetch();
  }, [Podcasts]);

  // Handle delete
  const handleDelete = (id) => {
    setPodcasts((prev) => prev.filter((podcast) => podcast._id !== id));
  };

  return (
    <div className="px-4 lg:px-12 my-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold md:font-bold">Your Podcasts</h1>
        <Link to="/add-podcast" className="px-4 py-2 bg-[#2F2E41] text-white rounded font-semibold">
          Add Podcasts
        </Link>
      </div>
      <div className="w-full my-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Podcasts && Podcasts.length > 0 ? (
          Podcasts.map((items, i) => (
            <PodcastCard key={i} items={items} onDelete={handleDelete} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No podcasts available. Click "Add Podcasts" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default YourPodcasts;
