import React, {useState} from 'react';
import {useAddTransaction} from "../../hooks/useAddTransaction";
import {useForm} from "react-hook-form";
import {useGetTransactions} from "../../hooks/useGetTransactions";
import {useGetMoneyStatistics} from "../../hooks/useGetMoneyStatistics";
import logo from '../../images/img.png'
import {signOut} from 'firebase/auth'
import {auth} from '../../config/firebase-config'
import {useNavigate} from "react-router-dom";
import {RiCloseLine, RiMenu3Line} from "react-icons/ri";

function ExpenseTracker() {
    const authUser = JSON.parse(localStorage.getItem('auth'))
    const {addTransaction} = useAddTransaction();
    const {transactions} = useGetTransactions();
    const {statistic} = useGetMoneyStatistics()
    const {register,handleSubmit, reset} = useForm()
    const navigate = useNavigate()
    const [toggleMenu, setToggleMenu] = useState(false);
    const onSubmitHandle = async (data,e) => {
        e.preventDefault()
        await addTransaction({
            ...data
        })
        reset()
    }

    const onSignOut = async () => {
        try {
            await signOut(auth)
            localStorage.clear()
            navigate('/')
        }catch (err){
            console.log(err)
        }
    }

    return (
        <>
            <header className="header">
                <div className="header-container">
                    <div className="header-left">
                        <img src={logo} alt=""/>
                        <h3>Expense tracker</h3>
                    </div>
                    <div className="header-right">
                        <div className="profile-info">
                            <img src={authUser.profileImg} alt=""/>
                            <p>{authUser.name}</p>
                            <button onClick={onSignOut} className="log-out-btn">Sign Out</button>
                        </div>
                        <div className="small-menu">
                            {toggleMenu ?
                                <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)}/> :
                                <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)}/>
                            }
                            {
                                toggleMenu && (
                                    <div className="small-menu-wrap">
                                        <div className="small-menu-container">
                                            <div>
                                                <img src={authUser.profileImg} alt=""/>
                                                <p>{authUser.name}</p>
                                            </div>
                                            <div className="signOutBtnContainer">
                                                <button onClick={onSignOut} className="log-out-btn">Sign Out</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </header>
            <div className='expense-tracker'>
                <main className="main">
                    <div className="main-container">
                        <div className="balance">
                            <h3>Your balance:</h3>
                            <h2> ${statistic.balance}</h2>
                        </div>
                        <div className="summary">
                            <hr className="border-element" style={{height:'50px', border:'1px solid lightgray'}}/>
                            <div className="income">
                                <h4> Income</h4>
                                <p> ${statistic.income}</p>
                            </div>
                            <div className="expenses">
                                <h4> Expenses</h4>
                                <p> ${statistic.expenses}</p>
                            </div>
                        </div>
                        <div className="transactions">
                            <h3>Transactions</h3>
                            <ul className="transaction-list">
                                {transactions.map(transaction=>(
                                    <li>{transaction.description}
                                        <div>
                                            <p className="spend-money">
                                                {transaction.transactionType === 'expense'?
                                                    `-$${transaction.transactionAmount}` :
                                                    `+$${transaction.transactionAmount}`}
                                            </p>
                                            <hr style={{backgroundColor: transaction.transactionType === 'income' ? '#00dc00' : 'red'}} className="green-line"/>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <form className="add-transaction" onSubmit={handleSubmit(onSubmitHandle)}>
                            <h3>Add Transaction</h3>
                            <input {...register('description',{required:true})} type="text" placeholder="Description" required/>
                            <input {...register('transactionAmount',{required:true, min:0})} step='0.01' type="number" placeholder="Amount" required/>
                            <div className="type-of-money">
                                <div>
                                    <label htmlFor="expense">Expenses</label>
                                    <input {...register('transactionType')} type="radio" id="expense" value="expense"/>
                                </div>
                                <div>
                                    <label htmlFor="income">Income</label>
                                    <input {...register('transactionType')} type="radio" id="income" value="income"/>
                                </div>
                            </div>
                            <button type="submit">Add transaction</button>
                        </form>
                    </div>

                </main>
                <div className="container">

                </div>

            </div>

        </>
    );
}

export default ExpenseTracker;