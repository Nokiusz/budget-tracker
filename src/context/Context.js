import { createContext, useEffect, useState } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
export const GlobalContext = createContext();

export const ContextProvider = ({ children }) => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [currenciesData, setCurrenciesData] = useState([]);
  const [prioritiesData, setPrioritiesData] = useState([]);
  const [lastTransactionID, setLastTransactionID] = useState();
  const [typesData, setTypesData] = useState([]);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [showValues, setShowValues] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [ip, setIp] = useState('')
  const { switcher, status, themes } = useThemeSwitcher();

  const sumIncome = () => {
    const income = transactionsData.filter((item) => item.type === "income");
    setIncomeTotal(income.reduce((acc, item) => acc + item.value, 0));
  };

  const sumExpense = () => {
    const expense = transactionsData.filter((item) => item.type === "expense");
    setExpenseTotal(expense.reduce((acc, item) => acc + item.value, 0));
  };

  const getIp = async () => {
    fetch("./ip.json")
      .then((res) => res.json())
      .then((data) => {
        setIp(data.ip);
        console.log(data.ip);
      });
  }

  const LOCAL_IP = ip;
  console.log(LOCAL_IP);

  const BASE_URL = `http://${LOCAL_IP}:8000/api`;
  console.log(BASE_URL);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await fetch(`${BASE_URL}/transactions/list`);
    const dataJson = await data.json();
    setTransactionsData(dataJson.rows);
    setIsLoading(false);
  };

  const fetchLastTransactionID = async () => {
    const data = await fetch(`${BASE_URL}/lastTransaction`);
    const dataJson = await data.json();
    setLastTransactionID(dataJson.rows);
  }


  const fetchCategories = async () => {
    const data = await fetch(`${BASE_URL}/Categories`);
    const dataJson = await data.json();
    setCategoriesData(dataJson.rows);
  };

  const fetchTypes = async () => {
    const data = await fetch(`${BASE_URL}/Types`);
    const dataJson = await data.json();
    setTypesData(dataJson.rows);
  };

  const fetchCurrencies = async () => {
    const data = await fetch(`${BASE_URL}/Currencies`);
    const dataJson = await data.json();
    setCurrenciesData(dataJson.rows);
  };

  const fetchPriorities = async () => {
    const data = await fetch(`${BASE_URL}/Priorities`);
    const dataJson = await data.json();
    setPrioritiesData(dataJson.rows);
  };

  const toggleTheme = (isChecked) => {
    console.log(isChecked)
    localStorage.setItem("darkMode", isChecked);
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };




  useEffect(() => {
    toggleTheme(JSON.parse(localStorage.getItem("darkMode")));
  }, []);


  useEffect(() => { getIp() }, [ip]);
  useEffect(() => {
    fetchData();
  }, [ip]);

  useEffect(() => {
    fetchCategories();
  }, [ip]);

  useEffect(() => {
    fetchLastTransactionID();
  }, [ip]);

  useEffect(() => {
    fetchTypes();
  }, [ip]);

  useEffect(() => {
    fetchCurrencies();
  }, [ip]);

  useEffect(() => {
    fetchPriorities();
  }, [ip]);

  useEffect(() => {
    if (localStorage.getItem("showValues") === null) {
      localStorage.setItem("showValues", true);
    }
    if (localStorage.getItem("darkMode") === null) {
      localStorage.setItem("darkMode", false);
    }
    setShowValues(JSON.parse(localStorage.getItem("showValues")));
    setIsDarkMode(JSON.parse(localStorage.getItem("darkMode")));
  }, []);

  useEffect(() => {
    sumIncome();
    sumExpense();
  }, [transactionsData]);

  const providerValue = {
    BASE_URL,
    fetchData,
    transactionsData,
    setTransactionsData,
    categoriesData,
    setCategoriesData,
    typesData,
    setTypesData,
    currenciesData,
    setCurrenciesData,
    prioritiesData,
    setPrioritiesData,
    incomeTotal,
    setIncomeTotal,
    expenseTotal,
    setExpenseTotal,
    showValues,
    setShowValues,
    isDarkMode,
    setIsDarkMode,
    toggleTheme,
    isLoading,
    setIsLoading,
    fetchLastTransactionID,
    lastTransactionID,
    setLastTransactionID
  };

  return (
    <GlobalContext.Provider value={providerValue}>
      {children}
    </GlobalContext.Provider>
  );
};
