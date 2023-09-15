import Book from './Book';
import { useState, useEffect } from 'react';
import { getBooks } from '../queries/queries.mjs';

function BookList() {
  const [books, setBooks] = useState([]);

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
        console.log(result.data.books);
        setBooks(result.data.books);
      });
  }, []);

  return (
    <>
      <h2>Books</h2>
      <ul>
        <Book />
      </ul>
    </>
  );
}

export default BookList;
