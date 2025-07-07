// Style sheets
import '../styles/App.css';
import '../styles/NavBar.css';

// libraries
import { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

// components
import { GridContainer, GridItem } from './Containers';
import { TransactionForm } from './Transaction';
import { sampleReports, sampleTransactions, format, monthlyLimit } from '../SampleData';
import { Greeting } from './Greeting';
import { ReportHistory, SummaryGrid, AnnouncementGrid, TransactionGrid } from './HomeComponents';

// functions
import * as Compute from './computation';

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
                <Route path='/add-transaction' element = {<TransactionForm/>} index/>
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


function Home(){ 
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);


    const monthData = sampleTransactions.filter(entry => {
        const entryDate = new Date(entry.transactionDate);
        return entryDate >= start && entryDate <= end;
    });

    const [transactions, setTransactions] = useState(monthData);

    const reversedTransactions = useMemo(() => {
        return [...transactions].reverse();
    }, [transactions]);

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
    
                setTransactions(monthTransaction);
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
    
    const expenses = useMemo(
        () => expensesTransactions.reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0),
        [transactions]
    );

    const income = useMemo(
        () => incomeTransactions.reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0),
        [transactions]
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

                <SummaryGrid 
                    expensesTransactions = {expensesTransactions}
                    expenses = {expenses}
                    income = {income}/>

                <AnnouncementGrid 
                    expensesTransactions = {expensesTransactions}
                    expenses = {expenses}
                    income = {income}
                    limit = {limit}/>

                <ReportHistory 
                    sortedReports={sortedReports}/>

                <TransactionGrid 
                    reversedTransactions = {reversedTransactions}/>
                
            </GridContainer>
        </>
    );
}

export default App