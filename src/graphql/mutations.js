/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBook = /* GraphQL */ `
  mutation CreateBook(
    $input: CreateBookInput!
    $condition: ModelBookConditionInput
  ) {
    createBook(input: $input, condition: $condition) {
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
export const updateBook = /* GraphQL */ `
  mutation UpdateBook(
    $input: UpdateBookInput!
    $condition: ModelBookConditionInput
  ) {
    updateBook(input: $input, condition: $condition) {
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
export const deleteBook = /* GraphQL */ `
  mutation DeleteBook(
    $input: DeleteBookInput!
    $condition: ModelBookConditionInput
  ) {
    deleteBook(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createReservation = /* GraphQL */ `
  mutation CreateReservation(
    $input: CreateReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    createReservation(input: $input, condition: $condition) {
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
export const updateReservation = /* GraphQL */ `
  mutation UpdateReservation(
    $input: UpdateReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    updateReservation(input: $input, condition: $condition) {
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
export const deleteReservation = /* GraphQL */ `
  mutation DeleteReservation(
    $input: DeleteReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    deleteReservation(input: $input, condition: $condition) {
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
