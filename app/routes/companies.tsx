import {
  Box,
  Button,
  Center,
  Container,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import {
  Form,
  useLoaderData,
  LoaderFunction,
  Link,
  Outlet,
  useSearchParams,
} from "remix";
import { components } from "~/types/kyc";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("search");

  const baseUrl = process.env.GMD_URL;
  const reqUrl = baseUrl + "/companies?q=" + query;

  const response = await axios.get<
    components["schemas"]["ListCompaniesResponse"]
  >(reqUrl, { headers: { "x-api-key": process.env.GMD_API_KEY || "" } });
  return response.data;
};

export default function Index() {
  const data = useLoaderData<components["schemas"]["ListCompaniesResponse"]>();
  console.log(data.companies);

  const [searchParams] = useSearchParams();
  console.log(searchParams);

  return (
    <SimpleGrid columns={2}>
      <Center as={Container} h="50vh">
        <Box as={Form} method="get" minW="30ch">
          <Input
            type="text"
            placeholder="input text!"
            name="search"
            minLength={3}
            isRequired
          />
        </Box>
        <Stack>
          {data.companies.map((company) => {
            return (
              <Button
                as={Link}
                key={company.id}
                to={`/companies/${company.id}?search=${searchParams.get(
                  "search"
                )}`}
              >
                {company.registered_name}
              </Button>
            );
          })}
        </Stack>
      </Center>
      <Outlet />
    </SimpleGrid>
  );
}
