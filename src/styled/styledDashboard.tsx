import styled from 'styled-components';
import { StyledContainer } from './styles';
export * from './styles'

export const StyledTextEditor = styled(StyledContainer)`
    width: 90%;
    padding: 20px;
    .ProseMirror{
        background: var(--MainColor);
        color: var(--SecondaryColor);
        box-shadow: 0px 0px 10px 2px #0000005c;
    }
`

export const StyledSetQuickInfos = styled(StyledContainer)`
    width: 90%;
    padding: 20px;
    display: flex;
    gap: 2em;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h2{
        border: 1px solid var(--SecondaryColor);
        border-radius: 2rem;
        width: fit-content;
        padding: 2px 15px;
        box-shadow: 0px 0px 10px 2px #0000005c;
        
    }
    input{
        color: var(--SecondaryColor);
        ::placeholder{
            color: gray;
        }
    }
    .search-results{
        li{
            padding: 0 5px;
            border-radius: 1rem;
            &:hover{
                background: var(--HighlightColor)
            }

        }
    }
`