import {useGetTransactions} from "./useGetTransactions";

export const useGetMoneyStatistics = () => {
    const {transactions} = useGetTransactions();
    const getIncome = ()=>{
        let income = 0;
        transactions.forEach(t=> {
            if (t.transactionType === 'income') {
                income += Number(t.transactionAmount)
            }
        })
        return income;
    }

    const getExpenses = () => {
        let expenses = 0;
        transactions.forEach(t=> {
            if (t.transactionType === 'expense') {
                expenses += Number(t.transactionAmount)
            }
        })
        return expenses;
    }
    const getBalance = () => {
        const balance = getIncome() - getExpenses();
        return balance < 0 ? 0.0: balance;
    }

    const statistic = {
        balance: getBalance().toFixed(2),
        income: getIncome().toFixed(2),
        expenses: getExpenses().toFixed(2)
    }
    return {statistic}
}