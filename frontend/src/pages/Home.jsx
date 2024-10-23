import React from 'react';
import { ImHeadphones } from 'react-icons/im';
import { IconContext } from 'react-icons';

const Home = () => {
  return (
    <div className="bg-green-100 px-4 md:px-12 lg:h-[89vh] min-h-screen flex flex-col items-center justify-center">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Text Section */}
        <div className="w-full lg:w-5/6 text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl lg:text-8xl font-bold leading-tight">
            Create & listen to the <br />{' '}
            <span className="flex items-end justify-center lg:justify-start lg:mt-0 mt-2">
              p
              <span>
                <IconContext.Provider
                  value={{ className: 'h-10 md:h-12 lg:h-20 mx-2' }}
                >
                  <ImHeadphones />
                </IconContext.Provider>
              </span>
              dcast
            </span>
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden lg:block w-1/6">
          <div className="py-4 border text-xl border-black font-semibold rounded-full text-center -rotate-90">
            Scroll Down
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="mt-12 w-full flex items-center justify-between lg:flex-row flex-col">
        {/* Description */}
        <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
          <p className="text-lg md:text-xl font-semibold">
            Listen to the most popular podcasts on just one platform -{' '}
            <b>PODCASTER</b>
          </p>
          <button className="mt-6 lg:mt-8 px-6 py-4 rounded-full text-white font-semibold bg-green-900">
            Login to Listen
          </button>
        </div>

        {/* Info */}
        <div className="mt-6 lg:mt-0">
          <p className="text-zinc-600 font-bold text-center lg:text-right text-base md:text-lg">
            Our app contains more than 2000 podcasts for you
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
