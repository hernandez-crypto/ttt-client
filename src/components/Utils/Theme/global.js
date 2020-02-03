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
  div {
    border-color: ${({ theme }) => theme.text} !important;
  }
  button {
    display: block;
  }
  a, p,label{
    color: ${({ theme }) => theme.text} !important;
  }
  input {
    color: ${({ theme }) => theme.text} !important;
    background: ${({ theme }) => theme.body} !important;
  }
`;
