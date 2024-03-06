import React, { useState } from "react";
import { Box, Button, VStack, Icon } from "@chakra-ui/react";
import { FaArrowUp, FaKiwiBird } from "react-icons/fa";

const Index = () => {
  const [birdPosition, setBirdPosition] = useState(50); // 50% from the top

  const flap = () => {
    // Move the bird up by 10%
    setBirdPosition((prevPosition) => Math.max(prevPosition - 10, 0));
  };

  // Gravity effect
  useInterval(() => {
    // Move the bird down by 2% every 100ms
    setBirdPosition((prevPosition) => Math.min(prevPosition + 2, 100));
  }, 100);

  return (
    <VStack spacing={4} align="stretch" h="100vh" justify="center" p={8}>
      <Box h="50vh" position="relative" border="1px" borderColor="gray.200" borderRadius="md" overflow="hidden">
        <Icon as={FaKiwiBird} position="absolute" left="20%" top={`${birdPosition}%`} w={8} h={8} color="yellow.400" transition="top 0.1s" />
      </Box>
      <Button leftIcon={<FaArrowUp />} colorScheme="teal" size="lg" onClick={flap}>
        Flap
      </Button>
    </VStack>
  );
};

// Custom hook to handle intervals
function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default Index;
