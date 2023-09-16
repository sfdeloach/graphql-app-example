import AuthorList from './components/AuthorList';
import BookList from './components/BookList';
import Form from './components/Form';
import { useState, useEffect } from 'react';
import { getAuthors, getBooks } from './graphql/queries';

function App() {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [newestBook, setNewestBook] = useState();

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
      <BookList books={books} />
      <AuthorList authors={authors} />
      <Form authors={authors} refreshBooks={refreshBooks} />
    </>
  );
}

export default App;
