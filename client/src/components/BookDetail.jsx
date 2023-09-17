import { COLORS } from '../styles';

function BookDetail({ authors, bookDetail }) {
  let content;

  if (!bookDetail) {
    content = <h3>No book selected...</h3>;
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

  return (
    <div
      style={{
        background: `linear-gradient(${COLORS.secondary}, ${COLORS.primary})`,
        color: COLORS.light,
        flexGrow: 1,
        minHeight: `100vh`,
        minWidth: '40vw',
        paddingLeft: '1rem'
      }}>
      {content}
    </div>
  );
}

export default BookDetail;
