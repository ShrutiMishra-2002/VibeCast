import React, { useEffect, useState } from 'react';
import axios from "axios";
import PodcastCard from '../components/PodcastCard/PodcastCard';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const DescriptionPage = () => {
    const { id } = useParams();
    const [Podcasts, setPodcasts] = useState();

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/get-podcasts/${id}`, {
                withCredentials: true
            });
            setPodcasts(res.data.data);
        };
        fetch();
    }, [id]);

    return (
        <div className="px-4 lg:px-12 py-4 h-auto flex flex-col md:flex-row items-start gap-4">
            {Podcasts && (
                <>
                    {/* Image Section */}
                    <div className="w-full md:w-2/6 flex items-center justify-center md:justify-start">
                        <img 
                            src={`${process.env.REACT_APP_SERVER_URL}/${Podcasts.frontImage}`} 
                            alt="/" 
                            className="rounded w-full h-[40vh] sm:h-[50vh] object-cover" 
                        />
                    </div>
                    
                    {/* Content Section */}
                    <div className="w-full md:w-4/6 mt-4 md:mt-0">
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                            {Podcasts.title}
                        </div>
                        <h4 className="mt-4 text-base sm:text-lg leading-relaxed">
                            {Podcasts.description}
                        </h4>
                        <div className="mt-4 w-fit bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-4 py-2 text-center text-sm sm:text-base">
                            {Podcasts.category.categoryName}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default DescriptionPage;
