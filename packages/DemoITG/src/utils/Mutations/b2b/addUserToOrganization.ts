export const addUserToOrganization = /* GraphQL */ `
  mutation addUser(
    $orgId: ID
    $costId: ID
    $roleId: ID!
    $name: String!
    $email: String!
  ) {
    addUser(
      orgId: $orgId
      costId: $costId
      roleId: $roleId
      name: $name
      email: $email
    ) @context(provider: "vtex.b2b-organizations-graphql") {
      id
      status
      message
    }
  }
`;
