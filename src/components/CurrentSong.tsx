import { Image, Text } from "@chakra-ui/react";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { setCurrentSong } from "../dataSlice";
import { YourData } from "../utils/types";

const CurrentSong = () => {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const isInitialMount = useRef(true);
  const currentTimeRef = useRef(0);

  const [play, setPlay] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [fullLength, setFullLength] = useState("0:00");
  const [progress, setProgress] = useState(0);

  const songs = useSelector((state:YourData) => state?.initialData?.songs);
  const selectedSong = useSelector((state:YourData) => state?.selectedSong);
  const currentSong = useSelector((state:YourData) => state?.currentSong);

  useEffect(() => {
    if (!selectedSong && songs?.length > 0) {
      dispatch(setCurrentSong(songs[0]));
    } else if (selectedSong) {
      dispatch(setCurrentSong(selectedSong));
      const index = songs.findIndex((ele) => ele.id === selectedSong.id);
      setCurrentSongIndex(index);
    }
  }, [dispatch, selectedSong, songs]);

  const handlePlayPause = () => {
    if(!audioRef.current) return;
    if (play) {
      audioRef.current.pause();
      currentTimeRef.current = audioRef.current.currentTime;
    } else {
      if (!currentSong || audioRef.current.src !== currentSong.src) {
        audioRef.current.src = currentSong.src;
        currentTimeRef.current = 0;
      }
      audioRef.current.play();
    }
    setPlay(!play);
  };

  const handlePreviousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      dispatch(setCurrentSong(songs[currentSongIndex - 1]));
      setCurrentTime("0:00");
      setProgress(0);
    }
  };

  const handleNextSong = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      dispatch(setCurrentSong(songs[currentSongIndex + 1]));
      setCurrentTime("0:00");
      setProgress(0);
    }
  };

  useEffect(() => {
    if(!audioRef.current) return;
    if (currentSong) {
      audioRef.current.src = currentSong.src;

      if (!isInitialMount.current) {
        audioRef.current.currentTime = currentTimeRef.current;
      }

      isInitialMount.current = false;

      if (play) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }

      audioRef.current.addEventListener("timeupdate", () => {
        const current = audioRef?.current?.currentTime;
        const duration = audioRef?.current?.duration;
        if(current) {
        setCurrentTime(formatTime(current));
        }
        if (duration && current) {
        if (!isNaN(duration)) {
          setFullLength(formatTime(duration));
          setProgress((current / duration) * 100);
        }
      }
      });
      audioRef.current.addEventListener("ended", handleNextSong);
    }
  }, [currentSong, play]);

  const formatTime = (time:number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleProgressBarClick = (e: React.MouseEvent) => {
    const progressBar = e.target as HTMLDivElement;
    const { width } = progressBar.getBoundingClientRect();
    const clickX = e.clientX - progressBar.getBoundingClientRect().left;
    const clickPercent = (clickX / width) * 100;
    
    const audioElement = audioRef.current;

    if (audioElement) {
    const duration = audioElement.duration;
    const newTime = (clickPercent / 100) * duration;
    audioElement.currentTime = newTime;
    setProgress(clickPercent);
    setCurrentTime(formatTime(newTime));
  }
};

  return (
    <>
      <Image src={currentSong?.img_src} width={"200px"} borderRadius={"12px"} />
      <Text color={"black"} textAlign={"center"}>
        {currentSong?.title}
      </Text>
      <Text textAlign={"center"} color={"black"}>
        {currentSong?.artist}
      </Text>
      <audio ref={audioRef} src={currentSong?.src} />
      <ProgressBar
        currentTime={currentTime}
        fullLength={fullLength}
        progress={progress}
        handleProgressBarClick={handleProgressBarClick}
      />
      <Controls
        handlePreviousSong={handlePreviousSong}
        handlePlayPause={handlePlayPause}
        handleNextSong={handleNextSong}
        play={play}
      />
    </>
  );
};

export default CurrentSong;
