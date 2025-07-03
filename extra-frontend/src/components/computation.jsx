import { lineFormat } from '../SampleData';

export function getIQR(data){
    
    const sorted = [...data].sort((a,b) => a - b )

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

    const q1 = getQuartile(sorted, 0.25);
    const q3 = getQuartile(sorted, 0.75);
    const iqr = q3 - q1;

    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;

    return sorted.filter(x => x >= lowerBound && x <= upperBound);
}

export function calculateIQR(data) {

    const filtered = getIQR(data);
    
    return (filtered.reduce((sum, val) => sum + val, 0)) / filtered.length;
}

export function getExpenseTransactions(data){
    if(data.length === 0) return [];
    return data.filter(entry => entry.flow === 1 && entry.category); 
}

export function getIncomeTransactions(data){
    if(data.length === 0) return [];
    return data.filter(entry => entry.flow === 2);
}

export function getCategorizedExpenses(data){
    if(data.length === 0) return []
    return data
        .reduce((acc, curr) => {
            const cat = curr.category;
            if (!acc[cat]) {
                acc[cat] = [];
            } 
                
            acc[cat].push(curr);

            return acc;
        }, {});
}

export function getExpensesOfCategory(data, category){
    if(data.length === 0) return 0;
    const categorizedExpenses = getCategorizedExpenses(data);

    const arr = categorizedExpenses[category] || [];

    return arr.reduce((acc, curr) => {
            const amount = typeof curr.amount === 'number' ? curr.amount : parseFloat(curr.amount);
            return acc + (isNaN(amount) ? 0 : amount);
        }, 0)
}

export function getAmountByCategory(data){
    if (data.length === 0) return null;
    return data.reduce((acc, curr) => {
        const cat = curr.category;
        const amount = typeof curr.amount === 'number' ? curr.amount : parseFloat(curr.amount);
        
        if (!acc[cat]) {
            acc[cat] = 0;
        }
        
        acc[cat] += isNaN(amount) ? 0 : amount;

        return acc;
    }, {})
}

export function getDailyExpenses(data){
    if(data.length === 0) return null;
    const msInDay = 24 * 60 * 60 * 1000;
    const today = new Date();

    return (() => {
        const allDates = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(today - i * msInDay);
            return date.toLocaleDateString('en-US', lineFormat);
        });

        allDates.reverse();

        const prepopulatedData = allDates.reduce((acc, dateKey) => {
            acc[dateKey] = 0;
            return acc;
        }, {});

        if (data && data.length > 0) {
            data
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
}

export function getLimitStatus(limit, income, expenses) {
    if(limit == 0 || income === 0) {
        console.error("Monthly limit or income is 0, cannot calculate limit status.");
        return null;
    } 
    return (expenses / (income * limit)) * 100  
}

export function getAverageExpense(expensesTransactions){
    if (expensesTransactions.length === 0) return null;

    const amount =  expensesTransactions
        .map(item => item.amount);    

    return calculateIQR(amount);
}

export function getHighestExpense(expensesTransactions){
    if (expensesTransactions.length === 0) return null;
    return expensesTransactions.reduce((max, item) => {
        const amount = Number(item.amount) || 0;
        return amount > (Number(max.amount) || 0) ? item : max;
    }, expensesTransactions[0]);
}

export function getProjectedMonthly(data){
    const monthlyData = getMonthlyData(data);

    const amounts = monthlyData.map(entry => Number(entry.amount) || 0);

    const cleaned = getIQR(amounts);

    const total = cleaned.reduce((acc, curr) => {
        const amount = typeof curr.amount === 'number' ? curr.amount : parseFloat(curr.amount);
        return acc + (isNaN(amount) ? 0 : amount);
    }, 0);

    const today = new Date().getDate();
    const daysInMonth = new Date().getMonth() === 1 ? 28 : 30;

    const rollingAverage = total / today;

    return rollingAverage * daysInMonth;
}   

export function getMonthlyData(data){
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return data.filter(entry => {
        const entryDate = new Date(entry.transactionDate);
        return entryDate >= start && entryDate <= end;
    });
}

export function getHighestCategory(data) {
    if(data.length === 0) return null;
    const categorizedExpenses = getAmountByCategory(data);
    let maxCategory = null;
    let maxAmount = -Infinity;
    for (const [category, amount] of Object.entries(categorizedExpenses)) {
        if (amount > maxAmount) {
            maxAmount = amount;
            maxCategory = category;
        }
    }
    return { category: maxCategory, amount: maxAmount };
}