import BookList from './components/BookList.jsx';
import { useState, useEffect } from 'react';
import { getAuthors } from './queries/queries.mjs';

function App() {
  const [authors, setAuthors] = useState([]);

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
      <BookList />
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
