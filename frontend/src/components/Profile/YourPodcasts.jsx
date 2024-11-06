import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import AddPodcast from '../../pages/AddPodcast';
import InputPodcast from '../AddPodcast/InputPodcast';
import PodcastCard from '../PodcastCard/PodcastCard';
const YourPodcasts = () => {
  const [Podcasts, setPodcasts] = useState();
  useEffect(() => {
    const fetch = async () => {
        try {
            const res = await axios.get("http://localhost:1000/api/v1/get-user-podcasts", {
                withCredentials: true
            });
            setPodcasts(res.data.data);
        } catch (error) {
            console.error("Error fetching podcasts:", error);
        }
    };
    fetch();
}, []);

  return (
    <div className="px-4 lg:px-12 my-4 ">
        <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold md:font-bold after:">Your Podcasts</h1>
        <Link to ="/add-podcast" className="px-4 py-2 bg-zinc-800 text-white rounded font-semibold">
            Add Podcasts
        </Link>
        </div>
        <div className="w-full my-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
    {Podcasts && Podcasts.length > 0 ? (
        Podcasts.map((items, i) => (
            <div key={i}>
                <PodcastCard items={items} /> {/* Pass podcast data */}
            </div>
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