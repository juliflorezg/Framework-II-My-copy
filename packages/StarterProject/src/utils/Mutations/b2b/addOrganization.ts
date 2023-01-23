export const addOrganization = /* GraphQL */ `
  mutation createOrganization($input: OrganizationInput!) {
    createOrganization(input: $input)
      @context(provider: "vtex.b2b-organizations-graphql") {
      id
      costCenterId
      href
      status
    }
  }
`;
