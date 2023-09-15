import { useState, useEffect } from 'react';
import { getBooks, getAuthors } from './queries/queries.mjs';

function App() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

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
        console.log(result.data.authors);
        setAuthors(result.data.authors);
      });
  }, []);

  return (
    <>
      <h1>Books and Authors</h1>
      <h2>Books</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            {book.name} by {book.author.name}
          </li>
        ))}
      </ul>
      <h2>Authors</h2>
      <ul>
        {authors.map((author, index) => (
          <li key={index}>
            {author.name} is {author.age} years old
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
