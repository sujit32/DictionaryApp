import { useRef } from "react";
import play from "./assets/play.png";

const Heading = ({ audioUrl, word, phonetic }) => {
  const audioRef = useRef();

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="flex flex-row justify-between my-5">
      <h3 className="font-bold text-3xl font-serif capitalize">
        {word}
        <span className="block font-normal text-sm text-indigo-600">
          {phonetic}
        </span>
      </h3>
      <button
        onClick={playAudio}
        className="bg-indigo-100 h-12 w-12 rounded-full flex items-center justify-center"
      >
        <img src={play} width={18} alt="Play" />
      </button>

      <audio className="hidden" ref={audioRef} src={audioUrl} />
    </div>
  );
};

export default Heading;
