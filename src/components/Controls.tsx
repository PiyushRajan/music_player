import { Button, HStack } from "@chakra-ui/react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoPlayBack, IoPlayForward } from "react-icons/io5";

interface ControlsProps {
  handlePreviousSong: () => void;
  handlePlayPause: () => void;
  handleNextSong: () => void;
  play: boolean;
}

const Controls: React.FC<ControlsProps> = ({ handlePreviousSong, handlePlayPause, handleNextSong,play }) => {

  return (
    <HStack justifyContent={"center"} mt={"10px"}>
      <Button
        variant={"unstyled"}
        border={"none"}
        backgroundColor={"white"}
        fontSize={"22px"}
        cursor={"pointer"}
        onClick={handlePreviousSong}
      >
        <IoPlayBack />
      </Button>
      <Button
        variant={"unstyled"}
        border={"none"}
        backgroundColor={"white"}
        fontSize={"22px"}
        cursor={"pointer"}
        onClick={handlePlayPause}
      >
        {play ? <FaPause /> : <FaPlay />}
      </Button>
      <Button
        variant={"unstyled"}
        border={"none"}
        backgroundColor={"white"}
        fontSize={"22px"}
        cursor={"pointer"}
        onClick={handleNextSong}
      >
        <IoPlayForward />
      </Button>
    </HStack>
  );
};

export default Controls;
