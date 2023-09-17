import { COLORS } from '../styles';

function InputSelect({ disabled, label, id, onChange, options, value }) {
  return (
    <div style={{ padding: '0.25rem' }}>
      <label htmlFor={id} style={{ color: COLORS.primary, display: 'inline-block', width: '6rem' }}>
        {label}
      </label>
      <select
        disabled={disabled}
        id={id}
        onChange={onChange}
        style={{
          backgroundColor: COLORS.light,
          border: `0.5px solid ${COLORS.secondary}`,
          borderRadius: '0.25rem',
          color: COLORS.primary,
          fontFamily: 'Open Sans, serif',
          fontSize: '1rem',
          padding: '0.25rem',
          width: '16rem'
        }}
        value={value}>
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
