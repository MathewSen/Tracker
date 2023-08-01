// Chart.defaults.global.elements.rectangle.backgroundColor = '#FF0000';
let chartData = JSON.parse(localStorage.getItem('chartData'));
if (!chartData) {
  chartData = [1, 1, 1, 1, 1];
}
var bar_ctx = document.getElementById('bar-chart').getContext('2d');

var purple_orange_gradient = bar_ctx.createLinearGradient(0, 0, 0, 600);
purple_orange_gradient.addColorStop(0, '#D149B7');
purple_orange_gradient.addColorStop(1, 'transparent');

var bar_chart = new Chart(bar_ctx, {
    type: 'bar',
    data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",],
        datasets: [{
            label: '',
						backgroundColor: '#2A2C49',
            hoverBackgroundColor: '#2A2C49',
						borderWidth: 1,
            borderColor: '#D149B7'
        }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          ticks: {
  
          }
        }
      },
      plugins: {
        legend: {
          display: false // Hide the legend
        }
      },
      interaction: {
        mode: 'nearest', // or 'index' to only highlight the nearest point
        intersect: false,
        axis: 'x'
      }
    }
});
// Update the chart data with the stored or default data
bar_chart.data.datasets[0].data = chartData;
bar_chart.update();

// Get the buttons by their IDs
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');
const button5 = document.getElementById('button5');

const removeButton1 = document.getElementById('removeButton1');
const removeButton2 = document.getElementById('removeButton2');
const removeButton3 = document.getElementById('removeButton3');
const removeButton4 = document.getElementById('removeButton4');
const removeButton5 = document.getElementById('removeButton5');

const resetButton = document.getElementById('resetButton');
// Add event listeners to each button
button1.addEventListener('click', () => {
  // Add data to Monday (the first dataset's first element)
  chartData[0] += 1;
  updateChartDataAndStore();
});

removeButton1.addEventListener('click', () => {
  // Add data to Monday (the first dataset's first element)
  chartData[0] -= 1;
  updateChartDataAndStore();
});

button2.addEventListener('click', () => {
  // Add data to Tuesday (the first dataset's second element)
  chartData[1] += 1;
  updateChartDataAndStore();
});
removeButton2.addEventListener('click', () => {
  // Add data to Monday (the first dataset's first element)
  chartData[1] -= 1;
  updateChartDataAndStore();
});

button3.addEventListener('click', () => {
  // Add data to Wednesday (the first dataset's third element)
  chartData[2] += 1;
  updateChartDataAndStore();
});
removeButton3.addEventListener('click', () => {
  // Add data to Monday (the first dataset's first element)
  chartData[2] -= 1;
  updateChartDataAndStore();
});

button4.addEventListener('click', () => {
  // Add data to Thursday (the first dataset's fourth element)
  chartData[3] += 1;
  updateChartDataAndStore();
});
removeButton4.addEventListener('click', () => {
  // Add data to Monday (the first dataset's first element)
  chartData[3] -= 1;
  updateChartDataAndStore();
});

button5.addEventListener('click', () => {
  // Add data to Friday (the first dataset's fifth element)
  chartData[4] += 1;
  updateChartDataAndStore();
});
removeButton5.addEventListener('click', () => {
  // Add data to Monday (the first dataset's first element)
  chartData[4] -= 1;
  updateChartDataAndStore();
});



// Function to update the chart data and store it in localStorage
function updateChartDataAndStore() {
  bar_chart.data.datasets[0].data = chartData;
  bar_chart.update();
  localStorage.setItem('chartData', JSON.stringify(chartData));
}
