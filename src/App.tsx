import Player from './components/Player'
import PlayList from './components/PlayList'
import { VStack,Box } from '@chakra-ui/react'

const App = () => {
  return (
    <VStack h={"96vh"} justifyContent={"center"}>
      <Box backgroundColor={"#081c44"} p={"8px"} borderRadius={"12px"} display={"flex"} flexDirection={"column"} gap={"12px"}>
      <Player/>
      <PlayList/>
      </Box>
    </VStack>
  )
}

export default App
