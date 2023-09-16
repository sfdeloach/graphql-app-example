function InputSelect({ disabled, label, id, onChange, options, value }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select disabled={disabled} id={id} onChange={onChange} value={value}>
        <option value=''></option>
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default InputSelect;
