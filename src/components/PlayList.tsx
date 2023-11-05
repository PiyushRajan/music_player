import { Box } from "@chakra-ui/react";
import Song from "./Song";
import { setData, setSongDuration } from "../dataSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { YourData } from "../utils/types";

const PlayList = () => {

  const dispatch = useDispatch();
  const songs = useSelector((state:YourData)=> state?.initialData?.songs);
  const songDurations = useSelector((state:YourData) => state?.songDurations);

  const fetchData = () => {
    try {
      axios.get("songs.json").then((res) => {
        dispatch(setData(res?.data));
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDuration = (seconds:number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const fetchSongDurations = (songUrls:string[]) => {
    const durations: Record<string, string> = {};
    songUrls.forEach((src:string) => {
      const audio = new Audio(src);
      audio.onloadedmetadata = () => {
        const durationInMinutes = formatDuration(audio.duration);
        durations[src] = durationInMinutes;
        dispatch(setSongDuration({ ...durations }));
      };
    });
  };

  useEffect(() => {
    if (songs) {
      const songUrls = songs.map((song) => song.src);
      fetchSongDurations(songUrls);
    }
  }, [songs]);

  return (
    <Box
      h={"10vw"}
      display={"flex"}
      flexDirection={"column"}
      gap={"12px"}
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "transparent",
        },
        scrollbarWidth: "none",
      }}
    >
        {songs?.map((ele)=>(
      <Song
        key={ele.id}
        id={ele.id}
        title={ele?.title}
        artist={ele?.artist}
        time={songDurations[ele.src] || 0}
        img_src={ele?.img_src}
        src={ele?.src}
      />
      ))}
    </Box>
  );
};

export default PlayList;
