import Button from './Button';
import InputSelect from './InputSelect';
import InputText from './InputText';
import { useState } from 'react';
import { addBook } from '../graphql/mutations';

// Represents the current state of the form
const STATE = {
  empty: 'empty',
  submitting: 'submitting',
  success: 'success',
  error: 'error'
};

function Form({ authors, refreshBooks }) {
  const [book, setBook] = useState({ name: '' });
  const [status, setStatus] = useState(STATE.empty);

  function handleBookChange(e) {
    const bookUpdate = { ...book };
    bookUpdate[e.target.id] = e.target.value;
    setBook(bookUpdate);
  }

  function handleAddBook(e) {
    setStatus(STATE.submitting);

    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: addBook,
        variables: {
          name: book.name,
          genre: book.genre,
          author_id: book.author_id
        }
      })
    })
      .then(res => res.json())
      .then(result => {
        if (result.errors) {
          setStatus(STATE.error);
        } else {
          refreshBooks(result.data.addBook._id);
          setStatus(STATE.success);
        }
      });
  }

  function handleAnother(e) {
    setBook({ name: '' });
    setStatus(STATE.empty);
  }

  if (status === STATE.success) {
    return (
      <>
        <div>The book was added to library successfully.</div>
        <Button disabled={false} onClick={handleAnother} value='Add another book' />
      </>
    );
  }

  if (status === STATE.error) {
    return (
      <>
        <div>An error occurred. The book was not added to the library.</div>
        <Button disabled={false} onClick={handleAnother} value='Try Again' />
      </>
    );
  }

  return (
    <>
      <form>
        <InputText
          disabled={status === STATE.submitting}
          id='name'
          onChange={handleBookChange}
          value={book.name}
        />
        <InputSelect
          disabled={status === STATE.submitting}
          label='Genre: '
          id='genre'
          onChange={handleBookChange}
          options={[
            { name: 'Fantasy', _id: 'Fantasy' },
            { name: 'Sci-Fi', _id: 'Sci-Fi' },
            { name: 'Romance', _id: 'Romance' }
          ]}
          value={book.genre}
        />
        <InputSelect
          disabled={status === STATE.submitting}
          label='Author: '
          id='author_id'
          onChange={handleBookChange}
          options={authors}
          value={book.author_id}
        />
        <Button
          isDisabled={status === STATE.submitting || !book.name || !book.genre || !book.author_id}
          onClick={handleAddBook}
          value='+'
        />
      </form>
    </>
  );
}

export default Form;
