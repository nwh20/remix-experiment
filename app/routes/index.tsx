import { Box, Center, Container, Input } from "@chakra-ui/react";
import { Form, json, useLoaderData } from "remix";

export async function loader({ request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get("search");
  return json({ message: `Hello, ${query}` });
}

export default function Index() {
  const data = useLoaderData();

  return (
    <Center as={Container} h="100vh">
      <Box as={Form} method="get" minW="30ch">
        <Input type="text" placeholder="input text!" name="search" />
      </Box>
      <Box>{data?.message}</Box>
    </Center>
  );
}
