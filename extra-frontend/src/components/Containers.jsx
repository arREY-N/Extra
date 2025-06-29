import styled from 'styled-components';

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.$cols || 12 }, 1fr);
    grid-auto-rows: minmax(50px, auto);
    gap: 15px;
    margin: 10px auto;

    @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr;
        margin: 0 auto;
    }
`

export const GridItem = styled.div`
    grid-column: span ${props => props.$spanCols || 12 } / auto; 
    grid-row: span ${props => props.$rows || 1 } / auto;

    display: grid;
    grid-template-columns: repeat(${props => props.$cols || 1 }, 1fr);
    gap: 15px;

    @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr;
        grid-column: span 1;
    }

`
    
export const BorderedGridItem = styled(GridItem)`
    padding: var(--padding);
    border-radius: var(--radius);
    box-shadow:  ${props => props.$boxShadow || 'var(--box-shadow)'};
    background-color: var(${ props => props.$bgColor || '--container-color'});

    &:hover {
        transform: translateY(-5px);
        transition: transform 0.1s ease-in-out;
    }
`