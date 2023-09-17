import { COLORS } from '../styles';

function BookList({ books, onClick }) {
  return (
    <>
      <h2 style={{ color: COLORS.primary }}>Books</h2>
      <ul style={{ display: 'flex', flexWrap: 'wrap', listStyleType: 'none' }}>
        {books.map(book => (
          <li
            key={book._id}
            onClick={() => onClick(book)}
            onMouseOver={e => {
              e.target.style.outline = `2px solid ${COLORS.dark}`;
              e.target.style.color = COLORS.dark;
            }}
            onMouseOut={e => {
              e.target.style.outline = `1px solid ${COLORS.primary}`;
              e.target.style.color = COLORS.primary;
            }}
            style={{
              borderRadius: '0.5rem',
              color: COLORS.primary,
              cursor: 'pointer',
              margin: '0.5rem',
              outline: `1px solid ${COLORS.primary}`,
              padding: '0.5rem'
            }}>
            {book.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default BookList;
