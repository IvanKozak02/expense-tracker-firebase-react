import {useEffect, useState} from "react";
import {collection, query, where, orderBy, onSnapshot} from 'firebase/firestore'
import {db} from "../config/firebase-config";
import {useGetUserInfo} from './useGetUserInfo'

export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const {userId} = useGetUserInfo();

    const getTransactions = async () => {
        let unsubscribe;
        try {
            const transactionCollectionRef = collection(db, 'transactions');
            const queryTransactions = query(transactionCollectionRef,
                where('userId', '==', userId),
                orderBy('createdAt')
            );
            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                let docs = []
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    docs.push({...data, id})
                })
                setTransactions(docs)
            })
        } catch (err) {
            console.error(err)
        }
        return () => unsubscribe();
    }

    useEffect(() => {
        getTransactions()
    }, [transactions])

    return {transactions}
}