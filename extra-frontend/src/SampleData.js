
export const format = { 
    year: 'numeric', month: 'long', day: 'numeric', 
    hour: '2-digit', minute: '2-digit', hour12: true 
};

export const sampleTransactions = [
    {
        id: 1,
        item: 'Lunch at Cafe',
        transactionDate: new Date(2025, 5, 1, 12, 30),
        amount: 350,
        flow: 1,
        category: 'Food'
    },
    {
        id: 2,
        item: 'Bus Fare',
        transactionDate: new Date(2025, 5, 2, 8, 15),
        amount: 50,
        flow: 1,
        category: 'Transpo'
    },
    {
        id: 3,
        item: 'Electric Bill',
        transactionDate: new Date(2025, 4, 28, 18, 0),
        amount: 1200,
        flow: 1,
        category: 'Bills'
    },
    {
        id: 4,
        item: 'Grocery Shopping',
        transactionDate: new Date(2025, 5, 3, 16, 45),
        amount: 800,
        flow: 1,
        category: 'Groceries'
    },
    {
        id: 5,
        item: 'Movie Night',
        transactionDate: new Date(2025, 5, 4, 20, 0),
        amount: 400,
        flow: 1,
        category: 'Entertainment'
    },
    {
        id: 6,
        item: 'Gym Membership',
        transactionDate: new Date(2025, 4, 30, 10, 0),
        amount: 600,
        flow: 1,
        category: 'Health'
    },
    {
        id: 7,
        item: 'Online Shopping',
        transactionDate: new Date(2025, 5, 5, 14, 20),
        amount: 1500,
        flow: 1,
        category: 'Shopping'
    },
    {
        id: 8,
        item: 'Salary',
        transactionDate: new Date(2025, 4, 31, 9, 0),
        amount: 10000,
        flow: 2,
        category: null
    },
    {
        id: 9,
        item: 'Freelance Project',
        transactionDate: new Date(2025, 5, 2, 19, 0),
        amount: 2500,
        flow: 2,
        category: null
    },
    {
        id: 10,
        item: 'Gift Received',
        transactionDate: new Date(2025, 5, 3, 11, 0),
        amount: 700,
        flow: 2,
        category: null
    },
    {
        id: 11,
        item: 'Coffee',
        transactionDate: new Date(2025, 5, 6, 9, 10),
        amount: 120,
        flow: 1,
        category: 'Food'
    },
    {
        id: 12,
        item: 'Taxi Ride',
        transactionDate: new Date(2025, 5, 6, 18, 30),
        amount: 300,
        flow: 1,
        category: 'Transpo'
    },
    {
        id: 13,
        item: 'Water Bill',
        transactionDate: new Date(2025, 5, 7, 15, 0),
        amount: 400,
        flow: 1,
        category: 'Bills'
    },
    {
        id: 14,
        item: 'Supermarket',
        transactionDate: new Date(2025, 5, 8, 17, 30),
        amount: 950,
        flow: 1,
        category: 'Groceries'
    },
    {
        id: 15,
        item: 'Concert Ticket',
        transactionDate: new Date(2025, 5, 9, 21, 0),
        amount: 2000,
        flow: 1,
        category: 'Entertainment'
    },
    {
        id: 16,
        item: 'Doctor Visit',
        transactionDate: new Date(2025, 5, 10, 10, 0),
        amount: 800,
        flow: 1,
        category: 'Health'
    },
    {
        id: 17,
        item: 'Clothes Shopping',
        transactionDate: new Date(2025, 5, 11, 13, 0),
        amount: 1800,
        flow: 1,
        category: 'Shopping'
    },
    {
        id: 18,
        item: 'Bonus',
        transactionDate: new Date(2025, 5, 12, 9, 0),
        amount: 3000,
        flow: 2,
        category: null
    },
    {
        id: 19,
        item: 'Allowance',
        transactionDate: new Date(2025, 5, 13, 8, 0),
        amount: 1500,
        flow: 2,
        category: null
    },
    {
        id: 20,
        item: 'Dinner Out',
        transactionDate: new Date(2025, 5, 13, 19, 30),
        amount: 600,
        flow: 1,
        category: 'Food'
    },
    {
        id: 21,
        item: 'Train Fare',
        transactionDate: new Date(2025, 5, 14, 7, 45),
        amount: 80,
        flow: 1,
        category: 'Transpo'
    },
    {
        id: 22,
        item: 'Internet Bill',
        transactionDate: new Date(2025, 5, 14, 16, 0),
        amount: 1200,
        flow: 1,
        category: 'Bills'
    },
    {
        id: 23,
        item: 'Bakery',
        transactionDate: new Date(2025, 5, 15, 8, 30),
        amount: 200,
        flow: 1,
        category: 'Groceries'
    },
    {
        id: 24,
        item: 'Streaming Subscription',
        transactionDate: new Date(2025, 5, 15, 22, 0),
        amount: 500,
        flow: 1,
        category: 'Entertainment'
    },
    {
        id: 25,
        item: 'Pharmacy',
        transactionDate: new Date(2025, 5, 16, 11, 0),
        amount: 350,
        flow: 1,
        category: 'Health'
    },
    {
        id: 26,
        item: 'Shoe Shopping',
        transactionDate: new Date(2025, 5, 17, 15, 0),
        amount: 2200,
        flow: 1,
        category: 'Shopping'
    },
    {
        id: 27,
        item: 'Investment Return',
        transactionDate: new Date(2025, 5, 18, 10, 0),
        amount: 5000,
        flow: 2,
        category: null
    },
    {
        id: 28,
        item: 'Side Hustle',
        transactionDate: new Date(2025, 5, 19, 20, 0),
        amount: 1200,
        flow: 2,
        category: null
    },
    {
        id: 29,
        item: 'Breakfast',
        transactionDate: new Date(2025, 5, 20, 7, 30),
        amount: 180,
        flow: 1,
        category: 'Food'
    },
    {
        id: 30,
        item: 'Bus Fare',
        transactionDate: new Date(2025, 5, 20, 8, 10),
        amount: 50,
        flow: 1,
        category: 'Transpo'
    },
    {
        id: 31,
        item: 'Mobile Load',
        transactionDate: new Date(2025, 5, 20, 12, 0),
        amount: 100,
        flow: 1,
        category: 'Bills'
    },
    {
        id: 32,
        item: 'Supermarket',
        transactionDate: new Date(2025, 5, 20, 17, 0),
        amount: 900,
        flow: 1,
        category: 'Groceries'
    },
    {
        id: 33,
        item: 'Arcade',
        transactionDate: new Date(2025, 5, 20, 19, 0),
        amount: 300,
        flow: 1,
        category: 'Entertainment'
    },
    {
        id: 34,
        item: 'Vitamins',
        transactionDate: new Date(2025, 5, 21, 8, 0),
        amount: 250,
        flow: 1,
        category: 'Health'
    },
    {
        id: 35,
        item: 'Online Shopping',
        transactionDate: new Date(2025, 5, 21, 14, 0),
        amount: 1300,
        flow: 1,
        category: 'Shopping'
    },
    {
        id: 36,
        item: 'Refund',
        transactionDate: new Date(2025, 5, 21, 16, 0),
        amount: 400,
        flow: 2,
        category: null
    }
];