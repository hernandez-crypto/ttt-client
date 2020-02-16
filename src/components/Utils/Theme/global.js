import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  body {
    background: ${({ theme }) => theme.body} !important;
    color: ${({ theme }) => theme.text} !important;
  }
  div, fieldset {
    border-color: ${({ theme }) => theme.text} !important;
  }
  button {
    display: block;
  }
  a, p, label {
    color: ${({ theme }) => theme.text} !important;
  }
  div select {
    color: ${({ theme }) => theme.text} !important;
  }
  div select option {
    color: ${({ theme }) => theme.text} !important;
    background-color: ${({ theme }) => theme.body} !important;
    font-family: 'Permanent Marker'  !important;
  }
  div.MuiPaper-root:hover {
    cursor: pointer !important;
  }
  input {
    color: ${({ theme }) => theme.text} !important;
    background: ${({ theme }) => theme.body} !important;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
  -webkit-text-fill-color: ${({ theme }) => theme.text};
  -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) =>
    theme.body} inset !important;
  transition: background-color 5000s ease-in-out 0s;
}
`;
