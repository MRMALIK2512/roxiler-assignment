import React from "react";
import months from "../utils/months";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import apiConnector from "../services/apiConnector";
import { transactionUrl } from "../services/path";

export const Transactions = (props) => {
  //states
  const [loading, setLoading] = useState(false);
  const currMonth = props.month;
  const setCurrentMonth = props.setMonth;
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [transactions, setTransactions] = useState([]);

  //handlerFuntions
  function handleSelectChange(event) {
    setCurrentMonth(event.target.value);
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }
  function decreaseHandler() {
    setPage(page - 1);
  }
  function increaseHandler() {
    setPage(page + 1);
  }
  function handleSearchClick(){
    fetchTransactions();
  }
  function handleKeyDown (event) {
    if (event.key === 'Enter') {
        fetchTransactions();
    }
};
  // api methods
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const newTransactions = await apiConnector.get(
        `${transactionUrl}?month=${currMonth}&search=${search}&page=${page}`
      );
      setTotalPages(newTransactions.data.totalPages);
      setPage(newTransactions.data.currentPage);
      setTransactions(newTransactions.data.transactions);
    } catch (err) {
      console.log("Error while fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  //useffect
  useEffect(() => {
    fetchTransactions();
    console.log(transactions);
  }, [currMonth, page]);

  useEffect(() => {}, [transactions]);

  return (
    <div className="w-full flex flex-col gap-8  items-center">
      <div className=" w-[95%]  px-1 py-3 flex justify-around items-center sticky  ">
        <div className="w-auto flex items-center gap-3">
          <input
            type="text"
            name="inputField"
            placeholder="Search Transactions"
            className="border border-gray-400 px-2 py-3 rounded-2xl shadow-lg drop-shadow-sm "
            onChange={handleSearchChange}
            value={search}
            onKeyDown={handleKeyDown}
          />
          <button className=" border border-gray-400 px-3 py-3 rounded-full shadow-md  hover:shadow-2xl " onClick={handleSearchClick}>
            <FaSearch />
          </button>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="dropdown" className="font-bold text-xl">Select Month:</label>
          <select id="dropdown" name="dropdown" onChange={handleSelectChange} className="px-5 py-2 border border-gray-400">
            <option value="">All</option>
            {months.map((month, index) => {
              return (
                <option value={month} key={index}>
                  {month}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <table className="w-[95%] table-fixed ">
    <thead>
        <tr className="border border-black bg-red-200">
            <th className="w-1/10 py-2">Transaction ID</th>
            <th className="w-1/8 py-2">Title</th>
            <th className="w-1/6 py-2">Description</th>
            <th className="w-1/8 py-2">Price</th>
            <th className="w-1/8 py-2">Date of Sale</th>
            <th className="w-1/8 py-2">Sold</th>
            <th className="w-1/8 py-2">Category</th>
            <th className="w-1/8 py-2">Image</th>
        </tr>
    </thead>
    <tbody className="w-full">
    {loading ? (
        <tr className = "w-full h-full flex justify-center items-center">
            <td colSpan="8" className="text-center">Loading...</td>
        </tr>
    ) : (
        transactions.map((transaction, index) => (
            <tr key={index} className="border border-black bg-red-200">
                <td className="p-2 flex justify-center items-center ">{transaction.id}</td>
                <td className="p-2 font-bold ">{transaction.title}</td>
                <td className="p-2 text-xs text-justify">{transaction.description}</td>
                <td className="p-2 flex justify-center items-center font-bold">{parseFloat(transaction.price).toFixed(2)}</td>
                <td className="p-2">{transaction.dateOfSale.split('T')[0]}<br/>{transaction.dateOfSale.split('T')[1].split('.')[0]}</td>
                <td className="p-2 flex justify-center items-center">{transaction.sold ? "Yes" : "No"}</td>
                <td className="p-2 ">{transaction.category.split(' ')[0].toUpperCase()} <br /> {transaction.category.split(' ')[1]?.toUpperCase()} </td>
                <td className="p-2 flex items-center justify-center">
                    <img src={transaction.image} alt={transaction.title} className="w-[100px] h-[100px]"/>
                </td>
            </tr>
        ))
    )}
</tbody>

</table>


      <div className = "w-[50%] flex px-3 py-3 justify-center items-center gap-2 mx-auto">
        {page > 1 && <button onClick={decreaseHandler} className="px-4 py-2 border border-gray-500 bg-red-200 rounded-xl" >Prev</button>}
        {page <= totalPages - 1 && (
          <button onClick={increaseHandler} className="px-4 py-2 border border-gray-500 bg-red-200 rounded-xl">Next</button>
        )}
      </div>
    </div>
  );
};
