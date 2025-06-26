import './App.css';
import { GridContainer, GridItem, BorderedGridItem } from './Containers';
import { Pill } from './Pill'
import { LineChart, ChartStyle,Legend } from './Visual';
import { TransactionBox, Entry } from './Transaction';
import CategoryPie from './Charts';
import { useState, useEffect, useMemo } from 'react';
import { sampleTransactions, format } from './SampleData';


function App(){
    const [transactions, setTransactions] = useState(sampleTransactions);
    const [limit, setLimit] = useState(0.75);
    const [greeting, setGreeting] = useState("Good day");
    const [username, setUsername] = useState("Guest Username");
    const [greetingIcon, setIcon] = useState('https://placehold.co/70');
    
    useEffect(() => {
        setGreeting(() => {
            const currentHour = new Date().getHours();
            return currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";
        });
    }, []);

    const categoryData = transactions
        .filter(entry => entry.flow === 1 && entry.category) 
        .reduce((acc, curr) => {
            const cat = curr.category;
            const amount = typeof curr.amount === 'number' ? curr.amount : parseFloat(curr.amount);
            if (!acc[cat]) acc[cat] = 0;
            acc[cat] += isNaN(amount) ? 0 : amount;
            return acc;
    }, {});

    const pieData = Object.entries(categoryData).map(([name, value]) => ({ name, value })); 

    useEffect(()=>{
        const fetchTransactions = async () => {
            try{
                const response = await fetch('http://localhost:8080/api/transactions');
                const records = await response.json();
                
                const formattedData = records.map(entry => (
                    {
                        ...entry,
                        transactionDate:`${new Date(entry.transactionDate).toLocaleDateString('en-US', format)}`   
                    }
                ))
    
                setTransactions(formattedData);
            } catch(e){
                console.log("Error fetching transactions:", e);
            }
        }
        fetchTransactions();
    }, [])

    const expenses = useMemo(
        () => transactions.filter(entry => entry.flow === 1)
            .reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0),
        [transactions]
    );

    const income = useMemo(
        () => transactions.filter(entry => entry.flow === 2)
        .reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0),
        [transactions]
    );

    const balance = useMemo(
        () => income - expenses,
        [income, expenses]
    );

    const limitStatus = useMemo(
        () => (expenses / (income * limit)) * 100,
        [expenses, income, limit]
    );

    return(
        <>
            <GridContainer className='main-grid'>
                <GridItem className='navigation-grid' $cols = {12}>
                    <GridItem $spanCols={8}>
                        <div className='greeting'>
                            <div className='icon'>
                                <img src={greetingIcon} alt='Logo' />
                            </div>
                            <div className='greeting-text'>
                                <h3>{greeting},</h3>
                                <h2>{username}!</h2>
                            </div>
                        </div>
                    </GridItem>
                    <GridItem $spanCols={1}>
                        <a href="">History</a>
                    </GridItem>
                    <GridItem $spanCols={1}>
                        <a href="">Report</a>
                    </GridItem>
                    <GridItem $spanCols={1}>
                        <a href="">Settings</a>
                    </GridItem>
                    <GridItem $spanCols={1}>
                        <a href="">Toggle</a>
                    </GridItem>
                </GridItem>

                <GridItem className='summary-grid' $spanCols = {9} $cols = {9}>
                    <BorderedGridItem className='balance-pill' $spanCols =  {3}>
                        <Pill 
                            $img={'https://placehold.co/60'} 
                            $title = {'Current Balance'}
                            $value = {`P ${balance.toFixed(2)}`}/>   
                    </BorderedGridItem>

                    <BorderedGridItem className='expense-pill' $spanCols =  {3}>
                        <Pill 
                            $img={'https://placehold.co/60'} 
                            $title = {'Total Expense'}
                            $value = {`P ${expenses.toFixed(2)}`}/>
                    </BorderedGridItem>

                    <BorderedGridItem className='income-pill' $spanCols =  {3}>
                        <Pill 
                            $img={'https://placehold.co/60'} 
                            $title = {'Total Income'}
                            $value = {`P ${income.toFixed(2)}`}/>
                    </BorderedGridItem>

                    <BorderedGridItem $spanCols =  {6}>

                    </BorderedGridItem>

                    <BorderedGridItem className='monthly-limit' $spanCols =  {3}>
                        <div className='limit' style={{textAlign: 'center'}}>
                            <div className='graphics'>
                                <img src="https://placehold.co/250x120" alt="" />
                            </div>
                            <div className='info'>
                                <h1>{limitStatus.toFixed(2)}%</h1>
                                <p>of your monthly limit has been used!</p>
                            </div>
                        </div>
                    </BorderedGridItem>

                </GridItem>

                <BorderedGridItem className='chart' $spanCols = {3}  $cols = {1}>
                    <GridItem $spanCols = {1} style={{marginTop: '15px'}}>
                        <h2>Category Distribution</h2>
                    </GridItem>
                    <CategoryPie data={pieData}/>
                </BorderedGridItem>

                <BorderedGridItem className='report' $spanCols = {2}  $cols = {1}>

                </BorderedGridItem>

                <GridItem className='transaction-grid' $spanCols = {10} $cols = {10}>
                    <BorderedGridItem $spanCols = {7} $cols = {1}>
                        <GridItem $spanCols = {1} style={{margin: '10px'}}>
                            <h2>Recent Transactions</h2>
                        </GridItem>
                        {
                            transactions.map((transaction, index) => (
                                <Entry 
                                    key = {index}
                                    $name = {transaction.item}
                                    $date = {transaction.transactionDate.toLocaleTimeString('en-US', format)}
                                    $amount = {transaction.amount}
                                    $flow = {transaction.flow}/>
                            ))
                        }
                    </BorderedGridItem>

                    <BorderedGridItem className='add-transaction' $spanCols={3} $cols={1}>
                        <button className="add-transaction-btn">
                            <p style={{fontWeight: 'bold'}}>ADD NEW TRANSACTION</p>
                        </button>
                    </BorderedGridItem>
                </GridItem>
            </GridContainer>
        </>
    );
}

export default App