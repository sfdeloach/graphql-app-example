import BookDetail from './components/BookDetail';
import BookList from './components/BookList';
import Form from './components/Form';
import { useState, useEffect } from 'react';
import { getAuthors, getBooks } from './graphql/queries';
import { COLORS } from './styles';

function App() {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [bookDetail, setBookDetail] = useState();
  const [newBook, setNewBook] = useState();

  function handleBookClick(book) {
    setBookDetail(book);
  }

  function refreshData(book_id) {
    setNewBook(book_id);
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
  }, [newBook]);

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
  }, [newBook]);

  return (
    <>
      <div
        style={{
          background: COLORS.light,
          color: COLORS.dark,
          flexGrow: 1,
          minHeight: '100vh',
          paddingLeft: '1rem'
        }}>
        <h1 style={{ color: COLORS.primary }}>Ninja's (Updated) Reading List</h1>
        <BookList books={books} onClick={handleBookClick} />
        <Form authors={authors} refreshBooks={refreshData} />
      </div>
      <BookDetail authors={authors} bookDetail={bookDetail} />
    </>
  );
}

export default App;
