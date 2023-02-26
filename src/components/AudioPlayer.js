import React, { useState, useEffect } from "react";
import { BsFillPlayCircleFill, BsFillStopCircleFill } from "react-icons/bs";

const AudioPlayer = ({ preview, setPlay, setPreview }) => {
  const [playPause, setPlayPause] = useState(true);
  // window.Amplitude.init({
  //   bindings: {
  //     32: "play_pause",
  //   },
  //   songs: [
  //     {
  //       url: `${preview}`,
  //     },
  //   ],
  // });

  window.Amplitude.playNow({ url: `${preview}` });

  const handlePlayStop = () => {
    // setPlayPause(!playPause);
    // if (playPause) {
    //   window.Amplitude.init({
    //     bindings: {
    //       32: "play_pause",
    //     },
    //     songs: [
    //       {
    //         url: `${preview}`,
    //       },
    //     ],
    //   });

    //   window.Amplitude.play();
    // } else {
    window.Amplitude.stop();
    window.Amplitude.removeSong(0);
    setPreview(null);
    setPlay(false);
    // }
  };

  // const handlePlayStop = () => {
  //   setPlayPause(!playPause);
  //   if (playPause) {
  //     window.Amplitude.init({
  //       bindings: {
  //         32: "play_pause",
  //       },
  //       songs: [
  //         {
  //           url: `${preview}`,
  //         },
  //       ],
  //     });

  //     window.Amplitude.play();
  //   } else {
  //     window.Amplitude.stop();
  //     window.Amplitude.removeSong(0);
  //     setPreview(null);
  //     setPlay(false);
  //   }
  // };

  return (
    <div>
      <div className="w-fit h-fit p-2">
        {!playPause ? (
          <input
            type="range"
            id="song-percentage-played"
            className="amplitude-song-slider mb-3"
            step=".1"
          />
        ) : (
          ""
        )}
        <div className="flex w-full justify-between">
          <span className="amplitude-current-time text-xs font-sans tracking-wide font-medium text-sky-500 dark:text-sky-300"></span>
          <span className="amplitude-duration-time text-xs font-sans tracking-wide font-medium text-gray-500"></span>
        </div>
        <div className="self-center">
          <button onClick={handlePlayStop}>
            <BsFillStopCircleFill size={30} />
            {/* {!playPause ? <BsFillStopCircleFill size={30} /> : ""}
            {playPause ? <BsFillPlayCircleFill size={30} /> : ""} */}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AudioPlayer;
