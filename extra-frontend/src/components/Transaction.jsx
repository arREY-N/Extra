import styled from "styled-components";
import { GridItem } from "./Containers";

export const Row = styled.div`
    margin: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .icon{
        width: 50px;
        height: auto;
        aspect-ratio: 1 / 1;
        border: 1px solid ${props => props.$flow == 1 ? 'var(--highlight-a)' : 'var(--highlight-b)'};
        background-color: ${props => props.$flow == 1 ? 'var(--muted-highlight-a)' : 'var(--muted-highlight-b)'};
        border-radius: 50%;
        margin-right: 10px;
    }

    .item {
        text-align: start;
        flex: 1;
    }
        
    .name{
        font-size: 1.2rem;
        font-weight: 500;
    }

    .amount{
        flex: 1;
        text-align: end;
        font-size: 1.2rem;
        font-weight: 500;
        color: ${props => props.$flow == 1 ? 'var(--highlight-a)' : 'var(--highlight-b)'};
    }
`

export const TransactionGridItem = styled(GridItem)`
    container-type: inline-size; 
    container-name: transaction-wrapper;

    padding: 15px;
    border: var(--wireframe);
    border-radius: var(--radius);
    box-shadow: var(--box-shadow);
    text-align: center;
    background-color: var(--white);
    align-self: self-start;
`

export function TransactionBox(props){
    const { children } = props;

    return(
        <>
            <TransactionGridItem className='transactionBox' $spanCols = {8}>
                <GridItem $spanCols = {1}>
                    <h2>Recent Transactions</h2>
                </GridItem>

                { children }

            </TransactionGridItem>
        </>
    );
}

export function Entry(props){
    return(
        <>
            <Row $flow = {props.$flow}>
                <div className='icon'/>
                
                <div className='item'>
                    <p className='name'>
                        {props.$name}
                    </p>
                    <p className='date'>
                        {props.$date}
                    </p>
                </div>
                
                <div className='amount'>
                   {props.$flow == 1 ? '-' : '+' } P {props.$amount.toFixed(2)}
                </div>
            </Row>
        </>
    );
}