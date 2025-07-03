
export const format = { 
    year: 'numeric', month: 'long', day: 'numeric', 
    hour: '2-digit', minute: '2-digit', hour12: true,
};

export const lineFormat = {
    month: 'short', day: 'numeric'
}

export const monthlyLimit = 0.75;

export const sampleTransactions = [
    {
        id: 1,
        item: 'Lunch at Cafe',
        transactionDate: new Date(2025, 5, 15, 12, 30), // June 15, 2025 - 2 weeks ago
        amount: 350,
        flow: 1,
        category: 'Food'
    },
    {
        id: 2,
        item: 'Bus Fare',
        transactionDate: new Date(2025, 5, 16, 8, 15), // June 16, 2025
        amount: 50,
        flow: 1,
        category: 'Transpo'
    },
    {
        id: 3,
        item: 'Electric Bill',
        transactionDate: new Date(2025, 5, 16, 18, 0), // June 16, 2025
        amount: 1200,
        flow: 1,
        category: 'Bills'
    },
    {
        id: 4,
        item: 'Grocery Shopping',
        transactionDate: new Date(2025, 5, 17, 16, 45), // June 17, 2025
        amount: 800,
        flow: 1,
        category: 'Groceries'
    },
    {
        id: 5,
        item: 'Movie Night',
        transactionDate: new Date(2025, 5, 17, 20, 0), // June 17, 2025
        amount: 400,
        flow: 1,
        category: 'Entertainment'
    },
    {
        id: 6,
        item: 'Gym Membership',
        transactionDate: new Date(2025, 5, 18, 10, 0), // June 18, 2025
        amount: 600,
        flow: 1,
        category: 'Health'
    },
    {
        id: 7,
        item: 'Online Shopping',
        transactionDate: new Date(2025, 5, 18, 14, 20), // June 18, 2025
        amount: 1500,
        flow: 1,
        category: 'Shopping'
    },
    {
        id: 8,
        item: 'Salary',
        transactionDate: new Date(2025, 5, 19, 9, 0), // June 19, 2025
        amount: 10000,
        flow: 2,
        category: null
    },
    {
        id: 9,
        item: 'Freelance Project',
        transactionDate: new Date(2025, 5, 19, 19, 0), // June 19, 2025
        amount: 2500,
        flow: 2,
        category: null
    },
    {
        id: 10,
        item: 'Gift Received',
        transactionDate: new Date(2025, 5, 20, 11, 0), // June 20, 2025
        amount: 700,
        flow: 2,
        category: null
    },
    {
        id: 11,
        item: 'Coffee',
        transactionDate: new Date(2025, 5, 21, 9, 10), // June 21, 2025
        amount: 120,
        flow: 1,
        category: 'Food'
    },
    {
        id: 12,
        item: 'Taxi Ride',
        transactionDate: new Date(2025, 5, 21, 18, 30), // June 21, 2025
        amount: 300,
        flow: 1,
        category: 'Transpo'
    },
    {
        id: 13,
        item: 'Water Bill',
        transactionDate: new Date(2025, 5, 22, 15, 0), // June 22, 2025
        amount: 400,
        flow: 1,
        category: 'Bills'
    },
    {
        id: 14,
        item: 'Supermarket',
        transactionDate: new Date(2025, 5, 23, 17, 30), // June 23, 2025
        amount: 950,
        flow: 1,
        category: 'Groceries'
    },
    {
        id: 15,
        item: 'Concert Ticket',
        transactionDate: new Date(2025, 5, 23, 21, 0), // June 23, 2025
        amount: 2000,
        flow: 1,
        category: 'Entertainment'
    },
    {
        id: 16,
        item: 'Doctor Visit',
        transactionDate: new Date(2025, 5, 24, 10, 0), // June 24, 2025
        amount: 800,
        flow: 1,
        category: 'Health'
    },
    {
        id: 17,
        item: 'Clothes Shopping',
        transactionDate: new Date(2025, 5, 25, 13, 0), // June 24, 2025
        amount: 1800,
        flow: 1,
        category: 'Shopping'
    },
    {
        id: 18,
        item: 'Bonus',
        transactionDate: new Date(2025, 5, 25, 9, 0), // June 25, 2025
        amount: 3000,
        flow: 2,
        category: null
    },
    {
        id: 19,
        item: 'Allowance',
        transactionDate: new Date(2025, 5, 25, 8, 0), // June 25, 2025
        amount: 1500,
        flow: 2,
        category: null
    },
    {
        id: 20,
        item: 'Dinner Out',
        transactionDate: new Date(2025, 5, 26, 19, 30), // June 26, 2025
        amount: 600,
        flow: 1,
        category: 'Food'
    },
    {
        id: 21,
        item: 'Train Fare',
        transactionDate: new Date(2025, 5, 26, 7, 45), // June 26, 2025
        amount: 80,
        flow: 1,
        category: 'Transpo'
    },
    {
        id: 22,
        item: 'Internet Bill',
        transactionDate: new Date(2025, 5, 27, 16, 0), // June 27, 2025
        amount: 1200,
        flow: 1,
        category: 'Bills'
    },
    {
        id: 23,
        item: 'Bakery',
        transactionDate: new Date(2025, 5, 27, 8, 30), // June 27, 2025
        amount: 200,
        flow: 1,
        category: 'Groceries'
    },
    {
        id: 24,
        item: 'Streaming Subscription',
        transactionDate: new Date(2025, 5, 28, 22, 0), // June 28, 2025
        amount: 500,
        flow: 1,
        category: 'Entertainment'
    },
    {
        id: 25,
        item: 'Pharmacy',
        transactionDate: new Date(2025, 5, 28, 11, 0), // June 28, 2025
        amount: 350,
        flow: 1,
        category: 'Health'
    },
    {
        id: 26,
        item: 'Shoe Shopping',
        transactionDate: new Date(2025, 5, 29, 15, 0), // June 29, 2025 (Today)
        amount: 2200,
        flow: 1,
        category: 'Shopping'
    },
    {
        id: 27,
        item: 'Investment Return',
        transactionDate: new Date(2025, 5, 29, 10, 0), 
        amount: 5000,
        flow: 2,
        category: null
    },
    {
        id: 28,
        item: 'Side Hustle',
        transactionDate: new Date(2025, 5, 21, 20, 0), // June 21, 2025
        amount: 1200,
        flow: 2,
        category: null
    },
    {
        id: 29,
        item: 'Breakfast',
        transactionDate: new Date(2025, 5, 20, 7, 30), // June 20, 2025
        amount: 180,
        flow: 1,
        category: 'Food'
    },
    {
        id: 30,
        item: 'Bus Fare',
        transactionDate: new Date(2025, 5, 19, 8, 10), // June 19, 2025
        amount: 50,
        flow: 1,
        category: 'Transpo'
    },
    {
        id: 31,
        item: 'Mobile Load',
        transactionDate: new Date(2025, 5, 18, 12, 0), // June 18, 2025
        amount: 100,
        flow: 1,
        category: 'Bills'
    },
    {
        id: 32,
        item: 'Supermarket',
        transactionDate: new Date(2025, 5, 17, 17, 0), // June 17, 2025
        amount: 900,
        flow: 1,
        category: 'Groceries'
    },
    {
        id: 33,
        item: 'Arcade',
        transactionDate: new Date(2025, 5, 16, 19, 0), // June 16, 2025
        amount: 300,
        flow: 1,
        category: 'Entertainment'
    },
    {
        id: 34,
        item: 'Vitamins',
        transactionDate: new Date(2025, 5, 22, 8, 0), // June 22, 2025
        amount: 250,
        flow: 1,
        category: 'Health'
    },
    {
        id: 35,
        item: 'Online Shopping',
        transactionDate: new Date(2025, 5, 28, 14, 0), // June 28, 2025
        amount: 1300,
        flow: 1,
        category: 'Shopping'
    },
    {
        id: 36,
        item: 'Refund',
        transactionDate: new Date(2025, 5, 29, 16, 0), // June 29, 2025 (Today)
        amount: 400,
        flow: 2,
        category: null
    },
    {
        id: 37,
        item: 'April',
        transactionDate: new Date(2025, 4, 12, 12, 0),
        amount: 400,
        flow: 1,
        category: 'Shopping'
    }
];

export const sampleReports = [
    {
        id: 1,
        month: 'March',
        year: 2025,
        isComplete: true
    },
    {
        id: 2,
        month: 'April',
        year: 2025,
        isComplete: true
    },
    {
        id: 3,
        month: 'May',
        year: 2025,
        isComplete: true
    },
    {
        id: 4,
        month: 'June',
        year: 2025,
        isComplete: true
    },
    {
        id: 5,
        month: 'July',
        year: 2025,
        isComplete: false
    }
];