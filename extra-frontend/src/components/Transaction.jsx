import { GridItem, BorderedGridItem } from './Containers';
import '../styles/Transaction.css';
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sampleTransactions, format } from '../SampleData';

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
    const navigate = useNavigate();
    const [flow, setFlow] = useState('Expense');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(() => {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Asia/Manila'
        };

        const formatter = new Intl.DateTimeFormat('en-US', options); 
        const parts = formatter.formatToParts(now);

        let year = '';
        let month = '';
        let day = '';

        for (const part of parts) {
            if (part.type === 'year') year = part.value;
            if (part.type === 'month') month = part.value;
            if (part.type === 'day') day = part.value;
        }

        return `${year}-${month}-${day}`;
    });

    const [errors, setErrors] = useState({});

    const categories = ["Wants", "Needs", "Savings"];

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (name.trim().length < 1) newErrors.name = "Transaction item is required.";
        if (!amount || isNaN(amount) || amount <= 0) newErrors.amount = "Amount must be a positive number.";
        if (flow === 'Expense' && !category) newErrors.category = "Category is required for expenses."; 

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const selectedDate = new Date(date);
        const now = new Date();
        selectedDate.setHours(now.getHours());
        selectedDate.setMinutes(now.getMinutes());
        selectedDate.setSeconds(now.getSeconds());
        selectedDate.setMilliseconds(now.getMilliseconds());

        const newTransaction = {
            id: sampleTransactions.length + 1,
            item: name.trim(),
            transactionDate: new Date(selectedDate), 
            amount: parseFloat(amount),
            flow: flow === 'Income' ? 2 : 1, 
            category: category,
        };

        sampleTransactions.push(newTransaction);

        console.log('Submitted Transaction:', newTransaction);

        navigate('/');

        setFlow('Income');
        setName('');
        setCategory(null);
        setAmount(0);
        setDate(new Date().toISOString().slice(0,10));
    }

    return(
        <>
            <BorderedGridItem className='transaction-form' $spanCols = {12} $cols = {1}>
                <GridItem $spanCols = {1} style={{margin: '20px', textAlign: 'center'}}>
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

                                    { 
                                        errors.category && 
                                        <span className='error-message'> {errors.category} </span>
                                    }
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

                        { 
                            errors.name && 
                            <span className='error-message'> {errors.name} </span>
                        }

                        <label className='form-label' htmlFor = "transactionPrice">
                            Amount
                        </label>
                        <input
                            className='form-input'
                            type = 'number'
                            id = 'amount'
                            name = 'amount'
                            value = {amount == 0 ? '' : amount}
                            placeholder='Enter amount'
                            onChange = {(e) => setAmount(e.target.value)}/> 

                        { 
                            errors.amount && 
                            <span className='error-message'> {errors.amount} </span>
                        }

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

                        <button className='transaction-button' type = 'submit' onClick={handleSubmit}>
                            Add Transaction 
                        </button>
                    </fieldset>
                </form>
            </BorderedGridItem>
        </>
    );
}