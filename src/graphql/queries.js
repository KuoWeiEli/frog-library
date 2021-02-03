/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBook = /* GraphQL */ `
  query GetBook($id: ID!) {
    getBook(id: $id) {
      id
      name
      author
      tech
      publisher
      publishDate
      status
      createDate
      createdAt
      updatedAt
    }
  }
`;
export const listBooks = /* GraphQL */ `
  query ListBooks(
    $filter: ModelBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBooks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        author
        tech
        publisher
        publishDate
        status
        createDate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const bookByStatus = /* GraphQL */ `
  query BookByStatus(
    $status: String
    $createDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bookByStatus(
      status: $status
      createDate: $createDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        author
        tech
        publisher
        publishDate
        status
        createDate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
