// src/components/ServiceDoughnut.js
import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const ServiceDoughnut = () => {
  const data = {
    labels: ['Haircuts', 'Facials', 'Massages', 'Manicures', 'Pedicures'],
    datasets: [
      {
        label: 'Service Breakdown',
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 2
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          boxPadding: 5,
          font: {
            size: 16
          }
        },
        display: true,
        align: ''
      },
      tooltip: {
        enabled: true
      },
      title: {
        display: true,
        text: 'Service Breakdown',
        font: {
          size: 24
        },
        padding: '0'
      }
    },
    maintainAspectRatio: false
  }

  return (
    <div className="w-full h-full bg-white mb-10 rounded-lg shadow-md p-5">
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default ServiceDoughnut
