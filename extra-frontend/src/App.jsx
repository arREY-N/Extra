import './App.css';
import styled from 'styled-components';

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.$cols || 12 }, 1fr);
    gap: 20px;
    margin: 10px auto;

    @media screen and (max-width: 1000px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

export const GridItem = styled.div`
    grid-column: span ${props => props.$cols || 12 } / auto; 
    grid-row: span ${props => props.$rows || 1 } / auto;

    display: grid;
    grid-template-columns: repeat(${props => props.$cols || 12 }, 1fr);
    gap: 20px;

`
    
export const BorderedGridItem = styled(GridItem)`
    padding: var(--padding);
    border: var(--wireframe);
    border-radius: var(--radius);
    box-shadow: var(--box-shadow);
`

function App(){
    return(
        <>
            <GridContainer>
                <GridItem>
                    <h1>Header</h1>
                </GridItem>

                <BorderedGridItem $cols = {6}>
                    a
                </BorderedGridItem>

                <BorderedGridItem $cols = {6} $rows = {2}>
                    b
                </BorderedGridItem>

                <BorderedGridItem $cols = {3}>
                    c
                </BorderedGridItem>

                <BorderedGridItem $cols = {3}>
                    d
                </BorderedGridItem>

                <GridItem>
                    <h1>Header</h1>
                </GridItem>

                <GridItem $cols = {12}>
                
                    <BorderedGridItem $cols = {1} >
                        e
                    </BorderedGridItem>
                
                    <BorderedGridItem $cols = {6}>
                        f
                    </BorderedGridItem>

                    <BorderedGridItem $cols = {2}>
                        g
                    </BorderedGridItem>
                    <BorderedGridItem $cols = {2}>
                        h
                    </BorderedGridItem>
                    <BorderedGridItem $cols = {1}>
                        i
                    </BorderedGridItem>
                
                </GridItem>
            </GridContainer>
        </>
    );
}

export default App