import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { listTransactionAPI } from "../../react-query/transactions/transactionServices";

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
  // fetching all transaction
  const {
    data: transactions,
    error,
    isLoading,
    isError,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["list-transactions"],
    queryFn: listTransactionAPI,
  });

  // ! calculate total income and expense
  const totals = transactions?.reduce(
    (acc, transaction) => {
      if (transaction?.type === "income") {
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  // ! data structure for the chart
  const data = {
    labels: ["income", "expense"],
    datasets: [
      {
        label: "Transactions",
        data: [totals?.income, totals?.expense],
        backgroundColor: ["rgba(54,162,235,0.5)", "rgba(209,39,75,0.5)"],
        hoverBackgroundColor: ["rgba(54,162,235,0.6)", "rgba(209,39,75,0.6)"],
        borderColor: ["#1B87CF", "#D1274B"],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    maintainaspectRation: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 25,
          boxWidth: 12,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Income VS Expense",
        font: {
          size: 18,
          weight: "bold",
          padding: {
            top: 10,
            bottom: 30,
          },
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6">
        Transaction Overview
      </h1>
      <div style={{ height: "350px" }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default TransactionChart;
