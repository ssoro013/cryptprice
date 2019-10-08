import React from 'react';
import Chart from 'chart.js'

const BitcoinChart = (props) => {
    const myChartRef = document.getElementById('bitcoinChart').getContext('2d');
    new Chart(myChartRef, {
            type: "line",
            data: {
                labels: props.labels,
                datasets: [
                    {
                        label: `${props.coin} Price Index`,
                        data: props.prices,
                        backgroundColor: ['rgba(0, 0, 0, 0)'],
                        borderColor: ['rgb(255, 0, 0)'],
                        borderWidth: 3
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    return (
    <div>
        <canvas id="bitcoinChart"
        ref={myChartRef}/>
    </div>
    )
    
}

export default BitcoinChart;