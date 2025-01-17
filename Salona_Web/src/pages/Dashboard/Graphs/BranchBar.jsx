import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

const BranchBar = () => {
  const data = {
    labels: ['Branch A', 'Branch B', 'Branch C', 'Branch D', 'Branch E'],
    datasets: [
      {
        label: 'Current Month Sales (₹)',
        data: [50000, 40000, 60000, 70000, 30000],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Last Month Sales (₹)',
        data: [45000, 35000, 55000, 65000, 25000],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Branch Sales Comparison'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Branches'
        },
        ticks: {
          color: '#333'
        },
        grid: {
          color: '#ddd'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Sales (₹)'
        },
        ticks: {
          color: '#333'
        },
        grid: {
          color: '#ddd'
        }
      }
    }
  }

  return (
    <div className="w-full h-[500px] bg-gray-100 rounded-xl p-5">
      <h2 className="text-xl font-bold mb-4">Sales Comparison of Salon Branches</h2>
      <div className="relative h-[400px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default BranchBar
