function Book({ book }) {
  return (
    <>
      {book.name} by {book.author.name}
    </>
  );
}

export default Book;
