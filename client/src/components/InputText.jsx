import { COLORS } from '../styles';

function InputText({ disabled, id, onChange, value }) {
  return (
    <div style={{ padding: '0.25rem' }}>
      <label htmlFor={id} style={{ color: COLORS.primary, display: 'inline-block', width: '6rem' }}>
        Book name:{' '}
      </label>
      <input
        autoComplete='off'
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
        type='text'
        value={value}
      />
    </div>
  );
}

export default InputText;
