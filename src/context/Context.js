import { createContext, useEffect, useState } from 'react';

export const GlobalContext = createContext();

export const ContextProvider = ({ children }) => {
    const [transactionsData, setTransactionsData] = useState([]);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [showValues, setShowValues] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const sumIncome = () => {
        const income = transactionsData.filter(item => item.type === 'income');
        setIncomeTotal(income.reduce((acc, item) => acc + item.value, 0));

    }

    const sumExpense = () => {
        const expense = transactionsData.filter(item => item.type === 'expense');
        setExpenseTotal(expense.reduce((acc, item) => acc + item.value, 0));
    }

    const BASE_URL = 'http://192.168.0.157:5000/api'

    const fetchData = async () => {
        const data = await fetch(`${BASE_URL}/transactions/list`);
        const dataJson = await data.json();
        setTransactionsData(dataJson.rows);
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (localStorage.getItem('showValues') === null) {
            localStorage.setItem('showValues', true);
        }
        if (localStorage.getItem('darkMode') === null) {
            localStorage.setItem('darkMode', false);
        }
        setShowValues(JSON.parse(localStorage.getItem('showValues')));
        setDarkMode(JSON.parse(localStorage.getItem('darkMode')));

    }, [])


    useEffect(() => {
        sumIncome();
        sumExpense();
    }, [transactionsData])


    const providerValue = {
        transactionsData,
        setTransactionsData,
        incomeTotal,
        setIncomeTotal,
        expenseTotal,
        setExpenseTotal,
        showValues,
        setShowValues,
        darkMode,
        setDarkMode
    };

    return (
        <GlobalContext.Provider value={providerValue}>
            {children}
        </GlobalContext.Provider>
    );
};