import {
  Box,
  Button,
  Center,
  Container,
  Input,
  SimpleGrid,
  Stack,
  Text,
  MenuButton,
  MenuItem,
  MenuList,
  Menu,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import {
  Form,
  useLoaderData,
  LoaderFunction,
  Link,
  Outlet,
  useSearchParams,
  useSubmit,
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
  const submit = useSubmit();
  const [searchParams] = useSearchParams();

  const handleChange: React.FormEventHandler = (e) => {
    submit(e.currentTarget, { replace: true });
  };
  return (
    <SimpleGrid onChange={handleChange} as={Form} method="get" columns={2}>
      <Input
        type="text"
        placeholder="input text!"
        name="search"
        minLength={3}
        isRequired
      />
      <Menu onOpen={() => {}} isOpen>
        <MenuButton as="div" minW="30ch"></MenuButton>
        <MenuList>
          {data.companies.map((company) => {
            return (
              <MenuItem
                as={Link}
                key={company.id}
                to={`/companies/${company.id}?search=${searchParams.get(
                  "search"
                )}`}
              >
                {company.registered_name}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
      <Outlet />
    </SimpleGrid>
  );
}
