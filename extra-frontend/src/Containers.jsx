import styled from 'styled-components';

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.$cols || 12 }, 1fr);
    grid-auto-rows: minmax(50px, auto);
    gap: 10px;
    margin: 10px auto;

    @media screen and (max-width: 700px) {
        grid-template-columns: 1fr;
        max-width: 90vw;
        margin: 0 auto;
    }
`

export const GridItem = styled.div`
    grid-column: span ${props => props.$spanCols || 12 } / auto; 
    grid-row: span ${props => props.$rows || 1 } / auto;

    display: grid;
    grid-template-columns: repeat(${props => props.$cols || 1 }, 1fr);
    gap: 20px;

    @media screen and (max-width: 700px) {
        grid-template-columns: 1fr;
        grid-column: span 1;
    }

`
    
export const BorderedGridItem = styled(GridItem)`
    padding: var(--padding);
    border: ${props => props.$border || 'var(--wireframe)' };
    border-radius: var(--radius);
    box-shadow:  ${props => props.$boxShadow || 'var(--box-shadow)'};
    background-color: var(${ props => props.$bgColor || '--white'});
`