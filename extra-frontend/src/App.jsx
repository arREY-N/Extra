import './App.css';
import { GridContainer, GridItem, BorderedGridItem } from './Containers';
import { Pill } from './Pill'
import { LineChart, ChartStyle,Legend } from './Visual';
import { TransactionBox, Entry } from './Transaction';
import CategoryPie from './Charts';
import { useState, useEffect } from 'react';


function App(){

    const [transactions, setTransactions] = useState([]);
    const [expenses, setExpenses] = useState();

    const format = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(()=>{
        const fetchTransactions = async () => {
            const response = await fetch('http://localhost:8080/api/transactions');
            const records = await response.json();
            
            const formattedData = records.map(entry => (
                {
                    ...entry,
                    transactionDate: 
                        `${
                            new Date(entry.transactionDate)
                            .toLocaleDateString('en-US', format)}`   
                }
            ))

            setTransactions(formattedData);
        }

        fetchTransactions();
    }, [])

    useEffect(() => {
        setExpenses(
            transactions.reduce((sum, entry) => {
                const amountAsNumber = typeof entry.amount === 'number' ? entry.amount : parseFloat(entry.amount);
                return sum + (isNaN(amountAsNumber) ? 0 : amountAsNumber);
            }, 0)
        );
    }, [transactions]);

    return(
        <>
            <GridContainer>
                <GridItem>
                    <h1>Dashboard</h1>
                </GridItem>

                <BorderedGridItem $spanCols = {4} >
                    <Pill 
                        $img={'https://placehold.co/70'} 
                        $title = {'Balance'}
                        $value = {'P XXX,XXX.XX'}/>
                </BorderedGridItem>

                <BorderedGridItem $spanCols = {4}>
                    <Pill 
                        $img={'https://placehold.co/70'} 
                        $title = {'Total Expense'}
                        $value = {`P ${expenses}`}/>
                </BorderedGridItem>

                <BorderedGridItem $spanCols = {4}>
                    <Pill 
                        $img={'https://placehold.co/70'} 
                        $title = {'Balance'}
                        $value = {'P XXX,XXX.XX'}/>
                </BorderedGridItem>
                
                <BorderedGridItem $spanCols = {8}>
                    <LineChart/>
                </BorderedGridItem>

                <BorderedGridItem $spanCols = {4}>
                    <CategoryPie/>
                </BorderedGridItem>

                <TransactionBox>    
                    {
                        transactions.map((transaction, index) => (
                            <Entry 
                                $name = {transaction.item}
                                $date = {transaction.transactionDate}
                                $amount = {transaction.amount}
                                $flow = {transaction.flow}/>
                        ))
                    }
                </TransactionBox>

                <BorderedGridItem 
                    style={
                        {
                            alignSelf: 'start',
                            aspectRatio: '1 / 1',
                            position: 'sticky',
                            top: '10px'
                        }
                    } 
                    $spanCols = {4}>
                </BorderedGridItem>
            </GridContainer>
        </>
    );
}

export default App