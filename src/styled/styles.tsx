import styled from 'styled-components';export 

const StyledContainer = styled.div`
    padding: 0;
    border: solid 1px var(--SecondaryColor);
    border-radius: var(--borderRadius);
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