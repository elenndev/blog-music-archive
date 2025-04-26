import { createGlobalStyle} from "styled-components"

export const lightTheme = {
  body: '#FFF',
  text: '#363537',
  toggleBorder: '#FFF',
  background: '#363537',
  MainColor: '#D5D5D6',
  DecorateColor: '#1E1E1E',
  SecondaryColor: 'black',
  SecondaryColorDecorate: '#67676b',
  LinkOnPostContent: 'rgb(37, 37, 128)'
}

export const darkTheme = {
  body: '#363537',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  background: '#999',
  MainColor: '#2C2C30',
  DecorateColor:'#D5D5D6',
  SecondaryColor: 'white',
  SecondaryColorDecorate: '#4f4f52',
  LinkOnPostContent: 'rgb(104, 104, 241)'
}

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
    --toggleBorder: ${({ theme }) => theme.toggleBorder};
    --background: ${({ theme }) => theme.background};
    --MainColor: ${({ theme }) => theme.MainColor};
    --DecorateColor: ${({ theme }) => theme.DecorateColor};
    --SecondaryColor: ${({ theme }) => theme.SecondaryColor};
    --SecondaryColorDecorate: ${({ theme }) => theme.SecondaryColorDecorate};
    --LinkOnPostContent: ${({ theme }) => theme.LinkOnPostContent};
  }
`