/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getToy = /* GraphQL */ `
  query GetToy($id: ID!) {
    getToy(id: $id) {
      id
      name
      price
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listToys = /* GraphQL */ `
  query ListToys(
    $filter: ModelToyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listToys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        price
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
