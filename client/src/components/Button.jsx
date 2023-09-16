function Button({ disabled, onClick, value }) {
  return (
    <div>
      <input disabled={disabled} onClick={onClick} type='button' value={value} />
    </div>
  );
}

export default Button;
