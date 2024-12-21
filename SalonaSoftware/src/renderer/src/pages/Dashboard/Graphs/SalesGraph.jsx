import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js'
import ServicesPie from './ServicesPie'

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend)

const SalesGraph = () => {
  const [filterType, setFilterType] = useState(0)

  const generateData = () => {
    switch (filterType) {
      case 0:
        return {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          datasets: [
            {
              label: 'Current Week',
              data: [10, 20, 15, 25, 18, 22, 30],
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: true,
              tension: 0.4
            },
            {
              label: 'Last Week',
              data: [12, 18, 20, 22, 16, 19, 25],
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: true,
              tension: 0.4
            }
          ]
        }
      case 1:
        return {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Current Month',
              data: [300, 400, 350, 450],
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: true,
              tension: 0.4
            },
            {
              label: 'Last Month',
              data: [250, 300, 320, 380],
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: true,
              tension: 0.4
            }
          ]
        }
      case 2:
        return {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ],
          datasets: [
            {
              label: 'Current Year',
              data: [400, 500, 600, 700, 650, 700, 800, 750, 850, 900, 950, 1000],
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: true,
              tension: 0.4
            },
            {
              label: 'Last Year',
              data: [300, 400, 500, 550, 600, 650, 700, 720, 800, 850, 900, 950],
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: true,
              tension: 0.4
            }
          ]
        }
      default:
        return {}
    }
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
        text: 'Salon Sales Data'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Rupees Earned'
        },
        ticks: {
          color: '#333'
        },
        grid: {
          color: '#ddd'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time Period'
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
    <div className="w-full rounded-2xl bg-white p-4 my-4">
      <div className="w-full flex flex-col">
        <div className=" relative w-full flex justify-between">
          <div className="absolute top-0 left-0">
            <h2>Sales Graph</h2>
          </div>
          <div className="bg-gray-200 flex absolute rounded-md z-50 p-1 top-3 right-3">
            <h2
              onClick={() => setFilterType(0)}
              className={`px-2 py-1 ${filterType === 0 ? 'shadow-md bg-white text-gray-600 rounded-md cursor-default' : 'cursor-pointer'}`}
            >
              Daily
            </h2>
            <h2
              onClick={() => setFilterType(1)}
              className={`px-2 py-1 ${filterType === 1 ? 'shadow-md bg-white text-gray-600 rounded-md cursor-default' : 'cursor-pointer'}`}
            >
              Weekly
            </h2>
            <h2
              onClick={() => setFilterType(2)}
              className={`px-2 py-1 ${filterType === 2 ? 'shadow-md bg-white text-gray-600 rounded-md cursor-default' : 'cursor-pointer'}`}
            >
              Yearly
            </h2>
          </div>
        </div>
        <div className="w-full h-[500px]">
          <Line data={generateData()} options={options} />
        </div>
      </div>
    </div>
  )
}

export default SalesGraph
