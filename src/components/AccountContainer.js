import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  
  // Fetch transactions from the backend
  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setFilteredTransactions(data); // initially, show all transactions
      })
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  const addTransaction = (newTransaction) => {
    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => response.json())
      .then((transaction) => {
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          transaction,
        ]);
        setFilteredTransactions((prevFiltered) => [
          ...prevFiltered,
          transaction,
        ]);
      })
      .catch((error) => console.error("Error adding transaction:", error));
  };

  const handleSearch = (searchTerm) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredTransactions(filtered);
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <AddTransactionForm onAddTransaction={addTransaction} />
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
