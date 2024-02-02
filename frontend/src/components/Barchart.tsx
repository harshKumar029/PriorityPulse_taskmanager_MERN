import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { PastWeek } from '../utility/apiService';

interface BarChartProps {
  isDataUpdated: boolean;
}

const BarChart: React.FC<BarChartProps> = ({ isDataUpdated }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PastWeek();
        const countsByDate: Record<string, { true: number; false: number }> = {};
        response.forEach((item: any) => {
          const date = new Date(item.date);
          const day = date.toLocaleString('en-US', { day: '2-digit' });
          const month = date.toLocaleString('en-US', { month: 'long' });
          const formattedDate = `${day} ${month}`;

          if (!countsByDate[formattedDate]) {
            countsByDate[formattedDate] = { true: 0, false: 0 };
          }
          if (item.completed) {
            countsByDate[formattedDate].true++;
          } else {
            countsByDate[formattedDate].false++;
          }
        });

        const labels = Object.keys(countsByDate);
        const falseData = labels.map(date => countsByDate[date].false);
        const trueData = labels.map(date => countsByDate[date].true);

        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        if (chartRef && chartRef.current) {
          const ctx = chartRef.current.getContext('2d');
          if (ctx) {
            Chart.register(...registerables);
            chartInstance.current = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: labels,
                datasets: [
                  {
                    label: 'Incompleted',
                    data: falseData,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                  },
                  {
                    label: 'Completed',
                    data: trueData,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235)',
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                scales: {
                  y: {
                    ticks: {
                      color: '#fff', // Color of the y-axis values
                    },
                    grid: {
                      color: 'rgba(255, 255, 255, 0.3)', // Color of grid lines on the y-axis
                    },
                    beginAtZero: true, // Start the y-axis from zero
                  },
                  x: {
                    ticks: {
                      color: '#fff', // Color of the y-axis values
                    },
                    grid: {
                      color: 'rgba(255, 255, 255, 0.3)', // Color of grid lines on the y-axis
                    },
                    beginAtZero: true, // Start the y-axis from zero
                  },
                },
                plugins: {
                  title: {
                    display: true,
                    text: 'Task Status',
                    font: {
                      size: 16,
                      weight: 'bold',
                    },
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
              }

            });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isDataUpdated]); // Trigger fetchData when isDataUpdated changes
  
  return (
    <div className='barchart'>
      <div className='wrapper'>
        <canvas ref={chartRef} />
      </div>
    </div>
  )
};

export default BarChart;
