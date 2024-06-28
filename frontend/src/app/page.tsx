import { Button, Stack } from "@chakra-ui/react";
import {} from "react";
function Home() {
  return (
    <>
      <section>Home</section>
      <Stack spacing={4} direction="column" align={"flex-start"}>
        <Button colorScheme="blue" size="xs">
          Button
        </Button>
        <Button colorScheme="teal" size="sm">
          Button
        </Button>
        <Button colorScheme="teal" size="md">
          Button
        </Button>
        <Button colorScheme="teal" size="lg">
          Button
        </Button>
      </Stack>{" "}
    </>
  );
}

export default Home;
