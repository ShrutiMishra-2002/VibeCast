import React from 'react';
import { ImHeadphones } from 'react-icons/im';
import { IconContext } from 'react-icons';

const Home = () => {
  return (
    <div className="bg-[#C7D2FE] px-4 md:px-12 lg:h-[89vh] min-h-screen flex flex-col lg:flex-row items-center justify-center">
      {/* Wrapping Text and Image Section */}
      <div className="w-full lg:w-3/5 flex flex-col justify-between lg:gap-[60px] gap-4"> 
        
        {/* Text Section */}
        <div className="w-full text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl lg:text-8xl font-bold leading-tight">
            Create & listen to the
            <span className="flex items-end justify-center lg:justify-start lg:mt-0 mt-2">
              p
              <span>
                <IconContext.Provider value={{ className: 'h-10 md:h-12 lg:h-20 mx-2' }}>
                  <ImHeadphones />
                </IconContext.Provider>
              </span>
              dcast
            </span>
          </h1>
        </div>

        {/* Image for Mobile View */}
        <div className="flex lg:hidden justify-center lg:justify-end lg:w-2/5 mt-8 lg:mt-0 ">
          <img 
            src="/undraw_audio_player_re_cl20.svg" 
            alt="podcast illustration" 
            className="w-full lg:h-[400px] h-36" 
          />
        </div>

        {/* Action Section */}
        <div className="w-full flex items-center justify-between lg:flex-row flex-col">
          {/* Description */}
          <div className="flex flex-col gap-3 items-center lg:items-start justify-center text-center lg:text-left">
            <p className="text-lg md:text-xl font-semibold">
              Listen to the most popular podcasts on just one platform -{' '}
              <b>VIBECAST</b>
            </p>
            <button className="lg:mt-8 mt-4 px-6 py-4 rounded-full text-white font-semibold bg-[#2F2E41] animate-bounce">
              Listen Now
            </button> 
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden lg:flex justify-center lg:justify-end lg:w-2/5 mt-8 lg:mt-0">
          <img 
            src="/undraw_audio_player_re_cl20.svg" 
            alt="podcast illustration" 
            className="w-full lg:h-[400px] h-36" 
          />
      </div>
    </div>
  );
};

export default Home;
