import { COLORS } from '../styles';

function Button({ isDisabled, onClick, value }) {
  return (
    <div>
      <input
        disabled={isDisabled}
        onClick={onClick}
        style={{
          backgroundColor: isDisabled ? COLORS.light : COLORS.secondary,
          border: 'none',
          borderRadius: '0.5rem',
          color: isDisabled ? COLORS.secondary : COLORS.light,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          fontSize: value === '+' && '2rem',
          margin: '0.5rem',
          minWidth: '3.5rem',
          outline: `1px solid ${COLORS.primary}`,
          padding: '0.5rem'
        }}
        type='button'
        value={value}
      />
    </div>
  );
}

export default Button;
