import styled from 'styled-components';

export const StyledContainer = styled.div`
    padding: 0;
    border: solid 1px var(--SecondaryColor);
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .containerHeader {
    width: 100%;
    border-bottom: solid 1px var(--SecondaryColor);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .buttonsArea {
        width: fit-content;
        display: flex;
        column-gap: 5px;
        margin-right: 30px;
    }

    h2 {
        margin: 5px 0 0 40px;
    }
    }
`;

export const StyledButton = styled.button`
    display: flex;
    flex-direction: row;
    padding: 5px 10px;
    border-radius: 4rem;
    width: fit-content;
    cursor: pointer;
`

export const StyledButtonPrimary = styled(StyledButton)`
    background: var(--SecondaryColor);
    color: var(--MainColor)
`
export const StyledButtonSecondary = styled(StyledButton)`
    background: var(--SecondaryColorDecorate);
    color: var(--SecondaryColor)
`