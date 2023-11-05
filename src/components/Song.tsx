import { HStack, Image, Box, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setSelectedSong } from "../dataSlice";

export interface Song {
  id: number;
  title: string;
  artist: string;
  img_src: string;
  time: string | number;
  src: string;
}

const Song: React.FC<Song> = ({id,title,artist,time,img_src,src}) => {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedSong({id, title, artist, time, img_src,src}));
  };

  return (
    <HStack
      justifyContent={"space-evenly"}
      borderRadius={"12px"}
      _hover={{
        bg: "red",
      }}
      cursor={"pointer"}
      onClick={handleClick}
    >
      <Image
        src={img_src}
        w={"60px"}
        borderRadius={"10px"}
      ></Image>
      <Box>
        <Text color={"white"} fontSize={"12px"}>
          {title}
        </Text>
        <Text color={"white"} fontSize={"12px"}>
          {artist}
        </Text>
      </Box>
      <Text color={"white"} fontSize={"12px"}>{time}</Text>
    </HStack>
  );
};

export default Song;
