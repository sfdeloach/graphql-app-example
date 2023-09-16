export const getBooks = `
query Books {
  books {
    _id
    name
    genre
    author {
      _id
      name
      age
    }
  }
}`;

export const getAuthors = `
query Authors {
    authors {
        _id
        name
        age
        books {
            _id
            name
            genre
        }
    }
}`;
