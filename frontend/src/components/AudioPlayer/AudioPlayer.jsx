import React, { useEffect, useRef, useState } from 'react';
import { IoPlayBack, IoPlayForward } from "react-icons/io5";
import { FaRegPauseCircle, FaPlay } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { playerActions } from '../../store/player';

const AudioPlayer = () => {
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0); // Track the current time
  const dispatch = useDispatch();
  const PlayerDivState = useSelector((state) => state.player.isPlayerDiv);
  const songPath = useSelector((state) => state.player.songPath);
  const img = useSelector((state) => state.player.img);
  const audioRef = useRef();

  const closeAudioPlayerDiv = (e) => {
    e.preventDefault();
    dispatch(playerActions.closeDiv());
    dispatch(playerActions.changeImage(""));
    dispatch(playerActions.changeSong(""));
    setIsSongPlaying(false); // Stop playback when player is closed
  };

  const handlePlayPodcast = () => {
    if (isSongPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Playback error:", error);
      });
    }
    setIsSongPlaying(!isSongPlaying);
  };

  // Skip forward by 10 seconds
  const handleSkipForward = () => {
    const newTime = Math.min(currentTime + 10, duration);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Skip backward by 10 seconds
  const handleSkipBackward = () => {
    const newTime = Math.max(currentTime - 10, 0);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Update duration when metadata is loaded
  useEffect(() => {
    const updateDuration = () => {
      const audioDuration = audioRef.current.duration;
      setDuration(audioDuration);
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("loadedmetadata", updateDuration);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("loadedmetadata", updateDuration);
      }
    };
  }, []);

  // Update current time as the audio plays
  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("timeupdate", updateCurrentTime);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", updateCurrentTime);
      }
    };
  }, []);

  // Handle user seeking
  const handleSeek = (event) => {
    const newTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className={`${PlayerDivState ? "fixed" : "hidden"} bottom-0 left-0 w-full bg-zinc-900 text-zinc-300 p-4 flex items-center justify-between gap-4`}>
      {/* Album Art */}
      <div className="flex items-center justify-center w-1/6 sm:w-1/4 md:w-1/6">
        <img
          src={img}
          alt="Album Cover"
          className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full object-cover"
        />
      </div>

      {/* Player Controls */}
      <div className="flex-1 flex flex-col items-center">
        {/* Control Buttons */}
        <div className="flex items-center gap-4 text-xl sm:text-2xl md:text-3xl">
          <button aria-label="Previous" onClick={handleSkipBackward}><IoPlayBack /></button>
          <button aria-label="Pause/Play" onClick={handlePlayPodcast}>
            {isSongPlaying ? <FaRegPauseCircle /> : <FaPlay />}
          </button>
          <button aria-label="Next" onClick={handleSkipForward}><IoPlayForward /></button>
        </div>

        {/* Progress Bar with Time Indicators */}
        <div className="w-full flex items-center justify-center mt-2">
          <span className="text-xs sm:text-sm pr-2">
            {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}
          </span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            className="w-full cursor-pointer" 
            style={{ maxWidth: '85%' }}
          />
          <span className="text-xs sm:text-sm pl-2">
            {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Close Button */}
      <div className="w-1/6 sm:w-1/4 md:w-1/6 flex justify-end">
        <button onClick={closeAudioPlayerDiv} aria-label="Close player" className="text-lg sm:text-xl md:text-2xl">
          <ImCross />
        </button>
      </div>

      <audio ref={audioRef} src={songPath} preload="auto" />
    </div>
  );
};

export default AudioPlayer;
