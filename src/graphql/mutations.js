/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createToy = /* GraphQL */ `
  mutation CreateToy(
    $input: CreateToyInput!
    $condition: ModelToyConditionInput
  ) {
    createToy(input: $input, condition: $condition) {
      id
      name
      price
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateToy = /* GraphQL */ `
  mutation UpdateToy(
    $input: UpdateToyInput!
    $condition: ModelToyConditionInput
  ) {
    updateToy(input: $input, condition: $condition) {
      id
      name
      price
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteToy = /* GraphQL */ `
  mutation DeleteToy(
    $input: DeleteToyInput!
    $condition: ModelToyConditionInput
  ) {
    deleteToy(input: $input, condition: $condition) {
      id
      name
      price
      createdAt
      updatedAt
      __typename
    }
  }
`;
