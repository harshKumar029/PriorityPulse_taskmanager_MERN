import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { PastWeek } from '../utility/apiService';

const BarChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PastWeek();
        console.log('Past Week Data:', response);

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

        console.log("testing123",labels,falseData,trueData)
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
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                  },
                  {
                    label: 'Completed',
                    data: trueData,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  title: {
                    display: true,
                    text: 'Task Status', // title
                    font: {
                      size: 16,
                      weight: 'bold',
                    },
                  },
                },
                responsive: true, // Move responsive option here
                maintainAspectRatio: false, // Move maintainAspectRatio option here
              },
            });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return( 
    <div style={{width: 600,height: 300,backgroundColor: 'none',}}>
  <canvas  ref={chartRef} />
  </div>
  )
};

export default BarChart;
