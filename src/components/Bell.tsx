import { useAtomValue } from "jotai";
import { useState, useEffect } from "react";
import { FaRegBell } from "react-icons/fa6";
import { bellAtom, BellsConfig } from "./Settings";

export const Bell = () => {
  const bell = useAtomValue(bellAtom)
  const [audio, setAudio] = useState(new Audio( BellsConfig[bell].path));



  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setAudio(new Audio(BellsConfig[bell].path))
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
      <button onClick={togglePlay}><FaRegBell size={25} /></button>
  );
};

