import BookList from './components/BookList';
import Form from './components/Form';
import { useState, useEffect } from 'react';
import { getAuthors, getBooks } from './graphql/queries';

function App() {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [bookDetail, setBookDetail] = useState();
  const [newestBook, setNewestBook] = useState();

  function handleBookClick(book) {
    console.log(book);
    setBookDetail(book);
  }

  function refreshBooks(id) {
    setNewestBook(id);
  }

  useEffect(() => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: getBooks
      })
    })
      .then(res => res.json())
      .then(result => {
        setBooks(result.data.books);
      });
  }, [newestBook]);

  useEffect(() => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: getAuthors
      })
    })
      .then(res => res.json())
      .then(result => {
        setAuthors(result.data.authors);
      });
  }, []);

  return (
    <>
      <h1>Reading List</h1>
      <BookList books={books} onClick={handleBookClick} />
      <Form authors={authors} refreshBooks={refreshBooks} />
      <div>
        <h2>Book Title</h2>
        <h3>genre goes here</h3>
        <h3>author name here</h3>
        <h3>All books by this author:</h3>
        <ul>
          <li>Book one</li>
          <li>Book two</li>
          <li>Book three</li>
        </ul>
      </div>
    </>
  );
}

export default App;
