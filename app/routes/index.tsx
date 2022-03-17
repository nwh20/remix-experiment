import { Box, Center, Container, Input } from "@chakra-ui/react";
import axios from "axios";
import { Form, json, useLoaderData, LoaderFunction } from "remix";
import { components } from "~/types/kyc";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("search");

  const baseUrl = process.env.GMD_URL;
  const reqUrl = baseUrl + '/companies?q=' + query;

  const response = await axios.get<components['schemas']['ListCompaniesResponse']>(reqUrl, {headers: {'x-api-key': process.env.GMD_API_KEY || ''}})

  return response.data;
}

export default function Index() {
  const data = useLoaderData<components['schemas']['ListCompaniesResponse']>();

  return (
    <Center as={Container} h="100vh">
      <Box as={Form} method="get" minW="30ch">
        <Input type="text" placeholder="input text!" name="search" />
      </Box>
      <Box>{JSON.stringify(data)}</Box>
    </Center>
  );
}
