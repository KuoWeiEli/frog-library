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
      reservations {
        items {
          id
          applyDate
          reservationDate
          dueDate
          verifyDate
          takeDate
          returnDate
          status
          userID
          bookID
          createdAt
          updatedAt
        }
        nextToken
      }
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
        reservations {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      empid
      nameTW
      nameEN
      status
      reservations {
        items {
          id
          applyDate
          reservationDate
          dueDate
          verifyDate
          takeDate
          returnDate
          status
          userID
          bookID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        empid
        nameTW
        nameEN
        status
        reservations {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReservation = /* GraphQL */ `
  query GetReservation($id: ID!) {
    getReservation(id: $id) {
      id
      applyDate
      reservationDate
      dueDate
      verifyDate
      takeDate
      returnDate
      status
      userID
      user {
        id
        email
        empid
        nameTW
        nameEN
        status
        reservations {
          nextToken
        }
        createdAt
        updatedAt
      }
      bookID
      book {
        id
        name
        author
        tech
        publisher
        publishDate
        status
        createDate
        reservations {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listReservations = /* GraphQL */ `
  query ListReservations(
    $filter: ModelReservationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReservations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        applyDate
        reservationDate
        dueDate
        verifyDate
        takeDate
        returnDate
        status
        userID
        user {
          id
          email
          empid
          nameTW
          nameEN
          status
          createdAt
          updatedAt
        }
        bookID
        book {
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
        reservations {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
