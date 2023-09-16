import Book from './Book';

function BookList({ books }) {
  return (
    <>
      <h2>Books</h2>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <Book book={book} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default BookList;
