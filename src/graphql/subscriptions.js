/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBook = /* GraphQL */ `
  subscription OnCreateBook {
    onCreateBook {
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
export const onUpdateBook = /* GraphQL */ `
  subscription OnUpdateBook {
    onUpdateBook {
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
export const onDeleteBook = /* GraphQL */ `
  subscription OnDeleteBook {
    onDeleteBook {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateReservation = /* GraphQL */ `
  subscription OnCreateReservation {
    onCreateReservation {
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
export const onUpdateReservation = /* GraphQL */ `
  subscription OnUpdateReservation {
    onUpdateReservation {
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
export const onDeleteReservation = /* GraphQL */ `
  subscription OnDeleteReservation {
    onDeleteReservation {
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
