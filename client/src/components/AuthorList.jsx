import Author from './Author';

function AuthorList({ authors }) {
  return (
    <>
      <h2>Authors</h2>
      <ul>
        {authors.map(author => (
          <li key={author._id}>
            <Author data={author} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default AuthorList;
