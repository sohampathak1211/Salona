import React, { useRef, useEffect } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

const Line = () => {
  const chartRef = useRef(null);
  let chartInstance = useRef(null);

  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Women',
        data: [30, 20, 60, 70, 10, 50, 40, 60, 30, 50, 80, 45],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Men',
        data: [80, 40, 30, 40, 50, 20, 70, 20, 10, 60, 30, 55],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Salon Sales Data (Monthly)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Rupees Earned',
        },
        ticks: {
          color: '#333',
        },
        grid: {
          color: '#ddd',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Months of the Year',
        },
        ticks: {
          color: '#333',
        },
        grid: {
          color: '#ddd',
        },
      },
    },
  };

  useEffect(() => {
    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data,
      options,
    });

    return () => chartInstance.current.destroy();
  }, []);

  return (
    <div style={{ width: '80%', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default Line;
