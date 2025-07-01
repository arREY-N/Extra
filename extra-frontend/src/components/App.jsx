import '../styles/App.css';
import { GridContainer, GridItem, BorderedGridItem } from './Containers';
import { Pill, ReportPill } from './Pill'
import { Entry } from './Transaction';
import { CategoryPie, DailyChart } from './Charts';
import { useState, useEffect, useMemo } from 'react';
import { sampleTransactions, format, lineFormat } from '../SampleData';
import NavBar from './NavBar';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/Payment';
import TrendingDownIcon from '@mui/icons-material/Money';
import DayIcon from '@mui/icons-material/WbSunnyOutlined';
import NightIcon from '@mui/icons-material/NightlightRounded';

function calculateIQR(data) {
    // Helper to find the percentile
    const getQuartile = (arr, q) => {
        const pos = (arr.length - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;
        if ((arr[base + 1] !== undefined)) {
            return arr[base] + rest * (arr[base + 1] - arr[base]);
        } else {
            return arr[base];
        }
    };

    const q1 = getQuartile(data, 0.25);
    const q3 = getQuartile(data, 0.75);
    const iqr = q3 - q1;

    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;

    const filtered = data.filter(x => x >= lowerBound && x <= upperBound);
    
    return filtered.reduce((sum, val) => sum + val, 0) / filtered.length;
}


function App(){
    const [transactions, setTransactions] = useState(sampleTransactions);
    const [limit, setLimit] = useState(0.75);
    
    const [date, setDate] = useState(new Date().toLocaleString('en-US', format));
    const [greeting, setGreeting] = useState("Good day");
    const [isNight, setIsNight] = useState(false);
    const [username, setUsername] = useState("Guest");

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

    const msInDay = 24 * 60 * 60 * 1000;
    const today = new Date();

    const dailyData = (() => {
        const allDates = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(today - i * msInDay);
            return date.toLocaleDateString('en-US', lineFormat);
        });

        allDates.reverse();

        const prepopulatedData = allDates.reduce((acc, dateKey) => {
            acc[dateKey] = 0;
            return acc;
        }, {});

        if (transactions && transactions.length > 0) {
            transactions
                .filter(entry => entry.flow === 1 && entry.category)
                .forEach(entry => {
                    const entryDate = entry.transactionDate instanceof Date 
                        ? entry.transactionDate 
                        : new Date(entry.transactionDate);

                    const dateKey = entryDate.toLocaleDateString('en-US', lineFormat);
                    const amount = typeof entry.amount === 'number' ? entry.amount : parseFloat(entry.amount);

                    if (!isNaN(amount) && prepopulatedData[dateKey] !== undefined) {
                        prepopulatedData[dateKey] += amount;
                    }
                });
        }

        return prepopulatedData;
    })();

    const lineData = Object.entries(dailyData).map(([Date, Amount]) => ({ Date, Amount }));
    
    useEffect(() => {
        const interval = setInterval(() => {
            setDate(d => new Date().toLocaleDateString('en-US', format));
        }, 1000);

        return () => clearInterval(interval);
    },[]);

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

    useEffect(() => {
        setGreeting(() => {
            const currentHour = new Date().getHours();
            
            return (currentHour > 6 && currentHour < 12) ? "Good morning" : 
                (currentHour >= 12 && currentHour < 18) ? "Good afternoon" : 
                "Good evening";
        });
 
        setIsNight(() => {
            const currentHour = new Date().getHours();
            return currentHour >= 18 || currentHour < 6;
        })
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
    
    const amount = transactions
        .filter(transaction => transaction.flow === 1)
        .map(item => item.amount);
        
    const sorted = [...amount].sort((a,b) => a - b )

    const averageExpense = useMemo(
        () => {
            return calculateIQR(sorted)
        }, [transactions]
    );

    return(
        <>
            <NavBar/>

            <GridContainer className='main-grid'>
                <GridItem $spanCols = {12} style={{margin: '10px'}}>
                    <div className='greeting'>
                        <div className='icon'>
                            <div className='svg-icon'>
                                {
                                    isNight ?
                                    <NightIcon style={{ width: '70px', height: '70px' }} /> : 
                                    <DayIcon style={{ width: '70px', height: '70px' }} />
                                }
                            </div>
                        </div>
                        <div className='greeting-text'>
                            <h3>{date}</h3>
                            <h2>{greeting}, {username}!</h2>
                        </div>
                    </div>    
                </GridItem>
            
                <GridItem className='summary-grid' $spanCols = {9} $cols = {9}>
                    <BorderedGridItem className='balance-pill' $spanCols =  {3}>
                        <Pill 
                            $img={AccountBalanceWalletIcon} 
                            $title = {'Current Balance'}
                            $value = {`P ${balance.toFixed(2)}`}
                            $color = {'var(--highlight-b)'} />   
                    </BorderedGridItem>

                    <BorderedGridItem className='expense-pill' $spanCols =  {3}>
                        <Pill 
                            $img={TrendingUpIcon} 
                            $title = {'Total Expense'}
                            $value = {`P ${expenses.toFixed(2)}`}
                            $color = {'var(--highlight-a)'} />
                    </BorderedGridItem>

                    <BorderedGridItem className='income-pill' $spanCols =  {3}>
                        <Pill 
                            $img={TrendingDownIcon} 
                            $title = {'Total Income'}
                            $value = {`P ${income.toFixed(2)}`}
                            $color = {'var(--highlight-c)'} />
                    </BorderedGridItem>

                    <BorderedGridItem $spanCols = {6} $cols = {1}>
                        <GridItem $spanCols = {1} style={{marginTop: '10px', marginLeft: '10px'}}>
                            <h2>7-Day Record</h2>
                        </GridItem>
                        <DailyChart data={lineData} />
                    </BorderedGridItem>

                    <BorderedGridItem $spanCols = {3}  $cols = {1}>
                        <GridItem $spanCols = {1} style={{marginTop: '10px', marginLeft: '10px'}}>
                            <h2>Category Distribution</h2>
                        </GridItem>
                        <CategoryPie data={pieData}/>
                    </BorderedGridItem>

                </GridItem>

                <GridItem className = 'announcement-grid' $spanCols = {3} $cols = {3}> 
                    <BorderedGridItem>
                        <div className = 'limit-box'>
                            <div>
                                <p>spent from your set monthly limit</p>
                            </div>
                            <div>
                                <h2>{limitStatus}</h2>
                            </div>
                        </div>
                    </BorderedGridItem>
                    <BorderedGridItem>
                        <div className = 'average-box'>
                            <div>
                                <p>Based on your recent transactions, your average daily expense is</p>
                            </div>
                            <div>
                                <h1>P{averageExpense.toFixed(2)}</h1>
                            </div>
                        </div>
                    </BorderedGridItem>
                    <BorderedGridItem>
                    
                    </BorderedGridItem>

                    <BorderedGridItem>
                    </BorderedGridItem>

                </GridItem>

                <BorderedGridItem className='report-history' $spanCols = {2}  $cols = {1}>
                    <GridItem $spanCols = {1} style={{margin: '10px'}}>
                        <h2>Report History</h2>
                    </GridItem>
                    <ReportPill $isComplete = {false} $date = "June 2025"/>
                    <ReportPill $isComplete = {true} $date = "May 2025"/>
                    <ReportPill $isComplete = {true} $date = "April 2025"/>
                    <ReportPill $isComplete = {true} $date = "See More"/>
                </BorderedGridItem>

                <GridItem className='transaction-grid' $spanCols = {10} $cols = {10}>
                    <BorderedGridItem $spanCols = {7} $cols = {1}>
                        <GridItem $spanCols = {1} $cols={2} style={{margin: '0 10px'}}>
                            <GridItem $spanCols = {1} style={{margin: '10px'}}>
                                <h2>Recent Transactions</h2>
                            </GridItem>

                            <GridItem $spanCols = {1} style={{margin: '10px'}}>
                                <p className='see-all'>See all</p>
                            </GridItem>
                        </GridItem>
                        {
                            transactions.slice(0, 10).map((transaction, index) => (
                                <Entry 
                                    key={index}
                                    $name={transaction.item}
                                    $date={transaction.transactionDate.toLocaleTimeString('en-US', format)}
                                    $amount={transaction.amount}
                                    $flow={transaction.flow}/>
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