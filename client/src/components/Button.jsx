function Button({ isDisabled, onClick, value }) {
  return (
    <div>
      <input disabled={isDisabled} onClick={onClick} type='button' value={value} />
    </div>
  );
}

export default Button;
