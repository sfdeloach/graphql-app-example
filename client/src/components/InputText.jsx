function InputText({ disabled, id, onChange, value }) {
  return (
    <div>
      <label htmlFor={id}>Book name: </label>
      <input
        autoComplete='off'
        disabled={disabled}
        id={id}
        onChange={onChange}
        type='text'
        value={value}
      />
    </div>
  );
}

export default InputText;
