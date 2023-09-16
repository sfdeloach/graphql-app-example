export const addBook = `
mutation AddBook ($name: String!, $genre: String!, $author_id: ID!) {
  addBook(name: $name, genre: $genre, author_id: $author_id) {
      _id
      name
      genre
      author_id
  }
}
`;
