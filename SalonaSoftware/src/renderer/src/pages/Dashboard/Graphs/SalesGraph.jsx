import React, { useEffect, useState } from 'react'
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
import useDashboard from '../../../services/useDashboard'

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend)

const SalesGraph = () => {
  const [filterType, setFilterType] = useState('yearly')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [chartData, setChartData] = useState(null)

  const { getDashboard } = useDashboard()

  const fetchData = async () => {
    console.log('Filter:', filterType)
    console.log('Start Date:', startDate)
    console.log('End Date:', endDate)

    const data = await getDashboard({
      filter: filterType,
      start_date: startDate,
      end_date: endDate
    })
    console.log('Dashboard Data', data)

    if (data && data.labels && data.current_data) {
      setChartData({
        labels: data.labels,
        datasets: [
          {
            label: 'Current Year',
            data: data.current_data,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Last Year',
            data: data.last_period_data,
            borderColor: 'rgba(0, 99, 255, 1)',
            backgroundColor: 'rgba(25, 99, 132, 0.2)',
            fill: true,
            tension: 0.4
          }
        ]
      })
    }
  }

  // Set the start date to 3 months ago (first day of that month) and end date to today
  const setInitialDates = () => {
    const today = new Date()
    const startOfMonth = new Date(today.getFullYear(), today.getMonth() - 3, 1)
    const endOfMonth = new Date(today)

    // Format the dates to YYYY-MM-DD
    const formattedStartDate = startOfMonth.toISOString().split('T')[0]
    const formattedEndDate = endOfMonth.toISOString().split('T')[0]

    setStartDate(formattedStartDate)
    setEndDate(formattedEndDate)
  }

  useEffect(() => {
    // Set initial dates on component mount
    setInitialDates()
  }, [])

  useEffect(() => {
    fetchData()
  }, [filterType, startDate, endDate])

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

  // Get the current date formatted as YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="w-full rounded-2xl bg-white p-4 my-4">
      <div className="w-full flex flex-col">
        <div className="relative w-full flex justify-between">
          <div className="bg-gray-200 flex absolute rounded-md z-50 p-1 top-3 right-3">
            <h2
              onClick={() => setFilterType('daily')}
              className={`px-2 py-1 ${filterType === 'daily' ? 'shadow-md bg-white text-gray-600 rounded-md cursor-default' : 'cursor-pointer'}`}
            >
              Daily
            </h2>
            <h2
              onClick={() => setFilterType('weekly')}
              className={`px-2 py-1 ${filterType === 'weekly' ? 'shadow-md bg-white text-gray-600 rounded-md cursor-default' : 'cursor-pointer'}`}
            >
              Weekly
            </h2>
            <h2
              onClick={() => setFilterType('yearly')}
              className={`px-2 py-1 ${filterType === 'yearly' ? 'shadow-md bg-white text-gray-600 rounded-md cursor-default' : 'cursor-pointer'}`}
            >
              Yearly
            </h2>
          </div>
        </div>

        {/* Date Range Inputs */}
        <div className="flex space-x-4 mt-4">
          <div className="flex items-center">
            <label htmlFor="startDate" className="mr-2 text-sm">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded-md p-2"
              max={today} // Restrict start date to today or earlier
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="endDate" className="mr-2 text-sm">
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded-md p-2"
              max={today} // Restrict end date to today or earlier
            />
          </div>
        </div>

        <div className="w-full h-[500px] mt-6">
          {/* Render the Line chart only if data is available */}
          {chartData ? (
            <Line data={chartData} options={options} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SalesGraph
