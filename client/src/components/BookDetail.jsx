function BookDetail({ authors, bookDetail }) {
  let content;

  if (!bookDetail) {
    content = 'No book selected...';
  } else {
    const moreBooks = authors.filter(author => author._id === bookDetail.author._id)[0].books;

    content = (
      <>
        <h2>{bookDetail.name}</h2>
        <h3>{bookDetail.genre}</h3>
        <h3>{bookDetail.author.name}</h3>
        <h3>All books by this author:</h3>
        <ul>
          {moreBooks.map(book => (
            <li key={book._id}>{book.name}</li>
          ))}
        </ul>
      </>
    );
  }

  return <div>{content}</div>;
}

export default BookDetail;
