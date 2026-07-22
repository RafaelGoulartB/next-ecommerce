import { useState } from 'react';

export default function AuthField({
  id,
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
}) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && visible ? 'text' : type;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrap">
        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {error && <p id={`${id}-error`} className="field-error">{error}</p>}
      <style jsx>{`
        .field { margin-bottom: 18px; }
        label {
          display: block;
          margin-bottom: 8px;
          color: #41495a;
          font-size: 13px;
          font-weight: 800;
        }
        .input-wrap { position: relative; }
        input {
          box-sizing: border-box;
          width: 100%;
          min-height: 52px;
          padding: 0 16px;
          border: 1px solid ${error ? '#e07b7b' : '#e3e7ee'};
          border-radius: 10px;
          outline: none;
          background: #fbfcfe;
          color: #252b3a;
          font: inherit;
          font-size: 14px;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        input:focus {
          border-color: #1875f0;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(24, 117, 240, 0.1);
        }
        input::placeholder { color: #a5adba; }
        .password-toggle {
          position: absolute;
          top: 50%;
          right: 14px;
          padding: 4px;
          transform: translateY(-50%);
          border: 0;
          background: transparent;
          color: #1875f0;
          cursor: pointer;
          font-size: 12px;
          font-weight: 800;
        }
        .field-error { margin: 7px 0 0; color: #b54747; font-size: 12px; }
      `}</style>
    </div>
  );
}
