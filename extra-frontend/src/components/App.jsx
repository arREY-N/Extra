import '../styles/App.css';
import { GridContainer, GridItem, BorderedGridItem } from './Containers';
import { Pill, ReportPill, AnnouncementPill, NullPill } from './Pill'
import { Entry } from './Transaction';
import { CategoryPie, DailyChart } from './Charts';
import { useState, useEffect, useMemo } from 'react';
import { sampleReports, sampleTransactions, format, monthlyLimit } from '../SampleData';
import Greeting from './Greeting';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/Payment';
import TrendingDownIcon from '@mui/icons-material/Money';
import * as Compute from './computation';
import { HashRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

function App(){
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;  
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        return 'light';
    });

    useEffect(() => {
        document.body.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    function toggleTheme(){
        document.body.classList.toggle('dark');
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
    }

    return(
        <Router>
            <nav className="navbar">
                <GridItem className='navbar-container' $cols = {12}>
                    <GridItem $spanCols={7}>
                        <h1>EXTRA</h1>    
                    </GridItem>
                    <GridItem className = 'nav-links' $spanCols = {5} $cols = {5}>
                        <NavLink to = "/">Home</NavLink>
                        <NavLink to = "/history">History</NavLink>
                        <NavLink to = "/report">Report</NavLink>
                        <NavLink to = "/settings">Settings</NavLink>
                        <button onClick={toggleTheme}>
                            {theme === 'dark' ? "Light Mode" : "Dark Mode"}
                        </button>
                    </GridItem>
                </GridItem>
            </nav>

            <Routes>
                <Route path='/' element = {<Home/>} index/>
                <Route path='/history' element = {<History/>} index/>
                <Route path='/report' element = {<Report/>} index/>
                <Route path='/settings' element = {<Setting/>} index/>
                <Route path='/add-transaction' element = {<Transaction/>} index/>
            </Routes>
        </Router>
    );
}

function History(){
    return(
        <h1>History Page</h1>
    );
}

function Report(){
    return(
        <h1>Report Page</h1>
    );
}
function Setting(){
    return(
        <h1>Settings Page</h1>
    );
}

function Transaction(){
    const [flow, setFlow] = useState('income');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(undefined);
    const [date, setDate] = useState(new Date().toISOString().slice(0,10));

    const categories = ["Wants", "Needs", "Savings"];
    return(
        <>
            <form>
                <label htmlFor="transactionFlow">
                    Transaction Type
                </label>
                <div>
                    <input 
                        type = 'radio'
                        name = 'flow' 
                        onChange={() => setFlow('Income')}
                        checked = {flow === 'Income'}
                        value = 'Income'/>
                    <span>Income</span>
                    <input 
                        type = 'radio'
                        name = 'flow' 
                        onChange={() => setFlow('Expense')}
                        checked = {flow === 'Expense'}
                        value = 'Expense'/>
                    <span>Expense</span>
                </div>

                <label htmlFor="transactionItem">
                    Transaction Item
                </label>
                <input 
                    type = 'text'
                    id = 'name'
                    name = 'name'
                    value = {name}
                    onChange={(e) => setName(e.target.value)}/>

                <label htmlFor = "transactionPrice">
                    Price
                </label>
                <input
                    type = 'number'
                    id = 'amount'
                    name = 'amount'
                    value = {amount}
                    onChange = {(e) => setAmount(e.target.value)}/>


                {
                    flow === 'Expense' && (
                        <>
                            <label htmlFor="transactionCategory">
                                Category
                            </label>

                            <select 
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

                <label htmlFor = 'transactionDate'>
                    Date
                </label>
                <input
                    type = 'date'
                    id = 'name'
                    name = 'date'
                    value = {date}
                    onChange = {(e) => setDate(e.target.value)}/>

                <button type = 'submit'>
                    Add Transaction 
                </button>
            </form>

            {flow}
            {name}
            {amount}
            {category}

        </>
    );
}

function Home(){
    const navigate = useNavigate();
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
 
    const goToAddTransaction = () => {
        navigate('/add-transaction');
    }
    const monthData = sampleTransactions.filter(entry => {
        const entryDate = new Date(entry.transactionDate);
        return entryDate >= start && entryDate <= end;
    }, []);

    const [transactions, setTransactions] = useState(monthData);

    const [reports, setReports] = useState(sampleReports);
    const limit = monthlyLimit;
    

    useEffect(()=>{
        const fetchReports = async () => {
            try{
                const response = await fetch('http://localhost:8080/api/reports');
                const records = await response.json();
                
                setReports(records);
            } catch(e){
                console.log("Error fetching reports:", e);
            }
        }

        const fetchTransactions = async () => {
            try{
                const response = await fetch('http://localhost:8080/api/transactions');
                const records = await response.json();
                
                const formattedData = records.map(entry => (
                    {
                        ...entry,
                        transactionDate:`${new Date(entry.transactionDate).toLocaleDateString('en-US', format)}`   
                    }
                ));

                const monthTransaction = formattedData.filter(entry => {
                    const entryDate = new Date(entry.transactionDate);
                    return entryDate >= start && entryDate <= end;
                });
    
                setTransactions(mmonthTransaction);
            } catch(e){
                console.log("Error fetching transactions:", e);
            }
        }

        fetchReports();
        fetchTransactions();
    }, [])

    const expensesTransactions = useMemo(
        () => Compute.getExpenseTransactions(transactions), 
        [transactions]
    );

    const incomeTransactions = useMemo(
        () => Compute.getIncomeTransactions(transactions), 
        [transactions]
    ); 

    const categoryData = useMemo(
        () => Compute.getAmountByCategory(expensesTransactions), 
        [transactions]
    );

    const dailyExpenses = useMemo(
        () => Compute.getDailyExpenses(expensesTransactions), 
        [transactions]
    );
    
    const lineData = useMemo(
        () => {
            return dailyExpenses !== null ? 
                Object.entries(dailyExpenses).map(([Date, Amount]) => ({ Date, Amount })) :
                null
        },
        [dailyExpenses] 
    );

    const pieData = useMemo(
        () => {
            return categoryData !== null ? 
                Object.entries(categoryData).map(([name, value]) => ({ name, value })) :
                null 
        },
        [categoryData]
    );

    const expenses = useMemo(
        () => expensesTransactions.reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0),
        [transactions]
    );

    const income = useMemo(
        () => incomeTransactions.reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0),
        [transactions]
    );

    const balance = useMemo(
        () => income - expenses,
        [income, expenses]
    );

    const limitStatus = useMemo(
        () => Compute.getLimitStatus(limit, income, expenses),
        [expenses, income, limit]
    );
    
    const averageExpense = useMemo(
        () => Compute.getAverageExpense(expensesTransactions),
        [expensesTransactions]
    );

    const highestExpense = useMemo(
        () => Compute.getHighestExpense(expensesTransactions),
        [expensesTransactions]
    );

    const projectedMonthly = useMemo( 
        () => Compute.getProjectedMonthly(expensesTransactions),
        [expensesTransactions]
    );

    const highestCategory = useMemo(
        () => Compute.getHighestCategory(expensesTransactions),
        [expensesTransactions]
    );

    const monthOrder = {
        January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
        July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
    };

    const sortedReports = reports.slice().sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return monthOrder[b.month] - monthOrder[a.month];
    }) || null;

    return(
        <>
            <GridContainer className='main-grid'>
                <Greeting/>
            
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
                        {
                            lineData !== null ?
                                <>
                                    <GridItem $spanCols = {1} style={{marginTop: '10px', marginLeft: '10px'}}>
                                        <h2>7-Day Record</h2>
                                    </GridItem>
                                    <DailyChart data={lineData} />
                                </> :
                                <>
                                    <NullPill/>
                                </>
                        }
                    </BorderedGridItem>

                    <BorderedGridItem $spanCols = {3}  $cols = {1}>
                            {
                                pieData !== null ?
                                    <>
                                        <GridItem $spanCols = {1} style={{marginTop: '10px', marginLeft: '10px'}}>
                                            <h2>Category Distribution</h2>
                                        </GridItem>
                                        <CategoryPie data={pieData}/>
                                    </> :
                                    <>
                                        <NullPill/>
                                    </>
                            }
                    </BorderedGridItem>

                </GridItem>

                <GridItem className = 'announcement-grid' $spanCols = {3} $cols = {3} $rows = {4}> 
                    <BorderedGridItem>
                        {
                            limitStatus === null ? <NullPill/> :
                            <AnnouncementPill 
                                $description = "Monthly Limit Used"
                                $value = {`${limitStatus.toFixed(2)}%`}
                            />
                        }
                    </BorderedGridItem>
                    <BorderedGridItem>
                        {
                            averageExpense === null ? <NullPill/> :
                            <AnnouncementPill
                                $description = "Average Daily Expanse"
                                $value = {`P ${averageExpense.toFixed(2)}`}
                            />
                        }
                    </BorderedGridItem>
                    <BorderedGridItem>
                        {
                            highestExpense === null ? <NullPill/> :
                            <AnnouncementPill
                                $description = "Highest Single Purchase"
                                $value = {`P ${highestExpense.amount.toFixed(2)}`}
                                $sub = {highestExpense.item}/>

                        }
                    </BorderedGridItem>
                    <BorderedGridItem>
                        {
                            highestCategory === null ? <NullPill/> :
                            <AnnouncementPill
                                $description = "Highest Category"
                                $value = {`P ${highestCategory.amount.toFixed(2)}`}
                                $sub = {highestCategory.category}
                            />
                        }
                    </BorderedGridItem>

                </GridItem>

                <BorderedGridItem className='report-history' $spanCols = {2}  $cols = {1}>
                    <GridItem $spanCols = {1} style={{margin: '10px'}}>
                        <h2>Report History</h2>
                    </GridItem>
                    {
                        sortedReports.slice(0, 3).map((report, index) => (
                            <ReportPill 
                                key={index}
                                $isComplete={report.isComplete} 
                                $date={`${report.month} ${report.year}`}/>
                        ))
                    }

                    <GridItem $spanCols = {1} style={{margin: '10px', textAlign: 'center'}}>
                        <p className = 'see-all'>See all</p>
                    </GridItem>
                </BorderedGridItem>

                <GridItem className='transaction-grid' $spanCols = {10} $cols = {10}>
                    <BorderedGridItem $spanCols = {7} $cols = {1}>
                        <GridItem $spanCols = {1} $cols={2} style={{margin: '0 10px'}}>
                            <GridItem $spanCols = {1} style={{margin: '10px'}}>
                                <h2>Recent Transactions</h2>
                            </GridItem>

                            <GridItem $spanCols = {1} style={{margin: '10px', textAlign: 'en'}}>
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
                        <button className="add-transaction-btn" onClick={goToAddTransaction}>
                            <p style={{fontWeight: 'bold'}}>ADD NEW TRANSACTION</p>
                        </button>
                    </BorderedGridItem>
                </GridItem>
            </GridContainer>

        </>
    );
}

export default App