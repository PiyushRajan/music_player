import { Box } from "@chakra-ui/react"
import CurrentSong from "./CurrentSong"

const Player = () => {
  return (
    <Box  p={"25px 50px 25px 50px"} backgroundColor={"white"} borderRadius={"12px"}>
        <CurrentSong/>
    </Box>
  )
}

export default Player
