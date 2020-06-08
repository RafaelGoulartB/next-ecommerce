import { useState } from 'react';

export default function Input({ type, name, placeholder, onChange, value }) {
  function handleChange(event) {
    const { value } = event.target;
    onChange(value);
  }

  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />

      <style jsx>{`
        input {
          width: 100%;
          font-size: 15px;
          margin-bottom: 34px;
          color: #4d4d4d;
          font-weight: 500;
          border: none;
          border-radius: 6px;
          background-color: #ffffff;
          box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
          padding-bottom: 1.25em;
          padding-top: 1.25em;
          padding-left: 32px;
        }
        input ::placeholder {
          color: #b2b2b2;
          opacity: 1; /* Firefox */
        }
        .input :-ms-input-placeholder {
          color: #b2b2b2;
        }
        input ::-ms-input-placeholder {
          color: #b2b2b2;
        }
        @media (max-width: 1000px) {
          input {
            width: 70vw;
            align-self: center;
          }
        }
        @media (max-width: 800px) {
          input {
            width: 75vw;
          }
        }
      `}</style>
    </>
  );
}
