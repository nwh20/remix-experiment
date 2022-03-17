import { Button, Container, Heading, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  useFetcher,
  useLoaderData,
  useTransition,
} from "remix";
import { components } from "~/types/kyc";

export const loader: LoaderFunction = async ({ request, params }) => {
  const companyId = params.id;

  const baseUrl = process.env.GMD_URL;
  const reqUrl = baseUrl + "/companies/" + companyId;

  const response = await axios.get<components["schemas"]["CompanyResponse"]>(
    reqUrl,
    { headers: { "x-api-key": process.env.GMD_API_KEY || "" } }
  );
  return response.data;
};

export const action: ActionFunction = async ({ request, params }) => {
  const companyId = params.id;
  const formData = await request.formData();
  const billing_email = formData.get("billing_email");
  const baseUrl = process.env.GMD_URL;
  const reqUrl = baseUrl + "/companies/" + companyId;
  const response = await axios.patch<components["schemas"]["CompanyResponse"]>(
    reqUrl,
    { billing_email },
    { headers: { "x-api-key": process.env.GMD_API_KEY || "" } }
  );
  return response.data;
};
export default function Company() {
  const data = useLoaderData<components["schemas"]["CompanyResponse"]>();
  const transition = useTransition();
  const isLoading = transition.state === "loading";
  return (
    <Container as={Form} method="post">
      <Heading> {data.company.registered_name}</Heading>
      <Input
        type="text"
        placeholder={data.company.billing_email}
        name="billing_email"
        isRequired
        isDisabled={isLoading}
      />
      <Button isLoading={isLoading} type="submit">
        Hiya
      </Button>
    </Container>
  );
}
