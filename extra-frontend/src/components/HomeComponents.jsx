// style sheets
import '../styles/NavBar.css';

// libraries
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// icons
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/Payment';
import TrendingDownIcon from '@mui/icons-material/Money';

// components
import { Pill, ReportPill, AnnouncementPill, NullPill } from './Pill'
import { GridItem, BorderedGridItem } from './Containers';
import { Entry } from './Transaction';
import { CategoryPie, DailyChart } from './Charts';

// data and
import { format } from '../SampleData';
import * as Compute from './computation';


export function TransactionGrid({reversedTransactions}){
    const navigate = useNavigate();

    const goToAddTransaction = () => {
        navigate('/add-transaction');
    }

    return(
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
                    reversedTransactions.slice(0, 10).map((transaction, index) => (
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
    );
}

export function AnnouncementGrid({expensesTransactions, expenses, income, limit}){
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

    const highestCategory = useMemo(
        () => Compute.getHighestCategory(expensesTransactions),
        [expensesTransactions]
    );

    return(
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
    );
}

export function SummaryGrid({expensesTransactions, expenses, income}){
    const categoryData = useMemo(
        () => Compute.getAmountByCategory(expensesTransactions), 
        [expensesTransactions]
    );

    const balance = useMemo(
        () => income - expenses,
        [income, expenses]
    );

    const dailyExpenses = useMemo(
        () => Compute.getDailyExpenses(expensesTransactions), 
        [expensesTransactions]
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

    return(
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
    );
}

export function ReportHistory({ sortedReports }) {
    return (
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
    );
}