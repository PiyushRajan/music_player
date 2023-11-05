import {  Text,Box } from "@chakra-ui/react";

interface Data {
currentTime: string;
fullLength: string;
progress: number;
handleProgressBarClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ProgressBar = ({currentTime, fullLength, progress, handleProgressBarClick}:Data) => {
  return (
    <>
      <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        fontSize="12px"
      >
        <Text>{currentTime}</Text>
        <Text>{fullLength}</Text>
      </Box>
      <Box
        backgroundColor="grey"
        height="3px"
        borderRadius="12px"
        cursor={"pointer"}
        onClick={handleProgressBarClick }
      >
        <Box
          backgroundColor="#081c44"
          height="100%"
          borderRadius="12px"
          width={`${progress}%`}
        />
      </Box>
    </Box>
    </>
  );
};

export default ProgressBar;
