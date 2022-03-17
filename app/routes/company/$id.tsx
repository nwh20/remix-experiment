import { Container, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { LoaderFunction, useFetcher, useLoaderData } from "remix";
import { components } from "~/types/kyc";

export const loader: LoaderFunction = async ({ request, params }) => {
  const companyId = params.id;

  const baseUrl = process.env.GMD_URL;
  const reqUrl = baseUrl + "/companies/" + companyId;

  const response = await axios.get<
    components["schemas"]["ListCompaniesResponse"]
  >(reqUrl, { headers: { "x-api-key": process.env.GMD_API_KEY || "" } });
  console.log(response);
  return response.data;
};

export default function Company() {
  const data = useLoaderData<components["schemas"]["CompanyResponse"]>();
  console.log(data);
  return (
    <Container>
      <Input
        type="text"
        placeholder={data.company.billing_email}
        name="email"
        isRequired
      />
    </Container>
  );
}
