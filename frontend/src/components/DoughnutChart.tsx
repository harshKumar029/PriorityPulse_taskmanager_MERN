import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { PastWeek } from '../utility/apiService';

interface DoughnutChartProps {
    isDataUpdated: boolean;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ isDataUpdated }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart<"doughnut", number[], string> | null>(null);
    const [trueCount, setTrueCount] = useState<any>(0);
    const [FalseCount, setFalseCount] = useState<any>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await PastWeek();
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const filteredResponse = response.filter((item: any) => {
                    const itemDate = new Date(item.date);
                    itemDate.setHours(0, 0, 0, 0);
                    return itemDate.getTime() === today.getTime();
                })
                const counts: { true: number; false: number } = { true: 0, false: 0 };
                filteredResponse.forEach((item: any) => {
                    if (item.completed) {
                        counts.true++;
                    } else {
                        counts.false++;
                    }
                });
                setTrueCount(counts.true)
                setFalseCount(counts.false)

                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                if (chartRef && chartRef.current) {
                    const ctx = chartRef.current.getContext('2d');
                    if (ctx) {
                        Chart.register(...registerables);
                        chartInstance.current = new Chart(ctx, {
                            type: 'doughnut',
                            data: {
                                datasets: [{
                                    data: [counts.true, counts.false],
                                    backgroundColor: [
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 99, 132, 0.5)',
                                    ],
                                    borderColor: [
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 99, 132, 1)',
                                    ],
                                    borderWidth: 1,
                                }],
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                cutout: '70%',
                                plugins: {
                                    title: {
                                        display: false,
                                    },
                                },
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
    }, [isDataUpdated]); // Add isDataUpdated to the dependency array
    return (
        <div className='donchart'>
            <div className='wrapper'>
                <section className='donchartcanva'>
                    <canvas ref={chartRef} />
                </section>
                <section>
                    <h1>Good going!</h1>
                    <p>You are almost there to complete<br /> your task, keep going </p>
                    <div>
                        <section>
                            <span></span>
                            <p>{trueCount} Completed</p>
                        </section>
                        <section>
                            <span></span>
                            <p>{FalseCount} On Going</p>
                        </section>
                    </div>
                </section>
            </div>
        </div>
    )
};

export default DoughnutChart;
