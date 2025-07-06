import { GridItem, BorderedGridItem } from './Containers';
import '../styles/Transaction.css';
import styled from "styled-components";
import { useState } from "react";

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

export function TransactionForm(){
    const [flow, setFlow] = useState('Income');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(undefined);
    const [date, setDate] = useState(new Date().toISOString().slice(0,10));

    const categories = ["Wants", "Needs", "Savings"];
    return(
        <>
            <BorderedGridItem className='transaction-form' $spanCols = {12} $cols = {1}>
                <GridItem $spanCols = {1} style={{marginTop: '10px', marginLeft: '10px'}}>
                    <h2>Add New Transaction</h2>
                </GridItem>
            
                <form>
                    <fieldset>
                        <div className='radio-group'>
                            <a
                                className = {flow === 'Income' ? 'active-radio' : 'radio'}
                                onClick={() => setFlow('Income')}>
                                    Income
                            </a>
                            <a 
                                className={flow === 'Expense' ? 'active-radio' : 'radio'} 
                                onClick={() => setFlow('Expense')}>
                                Expense
                            </a>
                        </div>

                        {
                            flow === 'Expense' && (
                                <>
                                    <label className='form-label' htmlFor="transactionCategory">
                                        Category
                                    </label>

                                    <select 
                                        className='form-input'
                                        name = "category" 
                                        id = "transactionCategory"
                                        value = {category}
                                        onChange = {(e) => setCategory(e.target.value)}>            

                                        <option value = '' disabled> Set Category </option>
                                        {
                                            categories.map((cat) => (
                                                <option key = {cat} value = {cat}> 
                                                    {cat} 
                                                </option> 
                                            ))
                                        }
                                    </select>
                                </>
                            )
                        }

                        <label className='form-label' htmlFor="transactionItem">
                            Transaction Item
                        </label>
                        <input
                            className='form-input' 
                            type = 'text'
                            id = 'name'
                            name = 'name'
                            value = {name}
                            placeholder='Enter transaction item'
                            onChange={(e) => setName(e.target.value)}/>

                        <label className='form-label' htmlFor = "transactionPrice">
                            Amount
                        </label>
                        <input
                            className='form-input'
                            type = 'number'
                            id = 'amount'
                            name = 'amount'
                            value = {amount}
                            placeholder='Enter amount'
                            onChange = {(e) => setAmount(e.target.value)}/> 

                        <label className='form-label' htmlFor = 'transactionDate'>
                            Date
                        </label>
                        <input
                            className='form-input'
                            type = 'date'
                            id = 'name'
                            name = 'date'
                            value = {date}
                            onChange = {(e) => setDate(e.target.value)}/>

                        <button className='transaction-button' type = 'submit'>
                            Add Transaction 
                        </button>
                    </fieldset>
                </form>
            </BorderedGridItem>

            {flow}
            {name}
            {amount}
            {category}

        </>
    );
}
