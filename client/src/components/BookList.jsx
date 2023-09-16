function BookList({ books, onClick }) {
  return (
    <>
      <h2>Books</h2>
      <ul>
        {books.map(book => (
          <li key={book._id} onClick={() => onClick(book)} style={{ cursor: 'pointer' }}>
            {book.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default BookList;
