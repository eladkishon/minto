import { useAtomValue } from "jotai";
import { useState, useEffect } from "react";
import { FaBell, FaRegBell } from "react-icons/fa6";
import { bellAtom, BellsConfig } from "./Settings";

export const Bell = () => {
  const bell = useAtomValue(bellAtom)
  const [audio, setAudio] = useState(new Audio(BellsConfig[bell].path));



  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(BellsConfig[bell].path)
    audio.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    })
    setAudio(audio)

  }, [bell])

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button onClick={togglePlay}>
      {isPlaying ? <FaBell size={25}/> : <FaRegBell size={25} />}
      </button>
  );
};

