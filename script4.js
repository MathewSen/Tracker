const colors2 = {
    red: {
        Default: "rgba(233, 76, 76, 1)",
        Half: "rgba(233, 76, 76, 0.5)",
        Quarter: "rgba(233, 76, 76, 0.25)",
        Zero: "rgba(233, 76, 76, 0)"
      }
    }

    gradient2 = ctx.createLinearGradient(0, 25, 0, 300);
    gradient2.addColorStop(0, colors2.red.Half);
    gradient2.addColorStop(0.35, colors2.red.Quarter);
    gradient2.addColorStop(1, colors2.red.Zero);
    
// Sample data, replace this with your actual data
  
let lossesPerTradeData = []; // Initialize an empty array to store the user data
let lineChart; // Store the Chart instance in a variable

// Function to create the line chart
function createLineChart() {
  if (lineChart) {
    // Destroy the previous Chart instance if it exists
    lineChart.destroy();
  }

  const ctx = document.getElementById('lossesChart').getContext('2d');
  ctx.canvas.height = 300;

  const chartData = {
    labels: Array.from({ length: lossesPerTradeData.length }, (_, i) => ` ${i + 1}`),
    datasets: [{
      label: '',
      data: lossesPerTradeData,
      borderColor: colors2.red.Default,
      fill: true,
      backgroundColor: gradient2,
      pointBackgroundColor: colors2.red.Default,
      lineTension: 0.2,
      borderWidth: 2,
      pointRadius: 3
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        ticks: {}
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
  };

  lineChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: chartOptions
  });
}

function updateChartWithData(data) {
  // Parse the input string into an array of numbers
  const newData = data.split(',').map(Number);

  // Append new data to the existing array
  lossesPerTradeData = lossesPerTradeData.concat(newData);

  // Save the updated data to local storage
  localStorage.setItem('lossesPerTradeData', JSON.stringify(lossesPerTradeData));

  // Recreate the chart with the updated data
  createLineChart();
}

function deleteLastValue() {
  if (lossesPerTradeData.length > 0) {
    // Remove the last element from the array
    lossesPerTradeData.pop();

    // Save the updated data to local storage
    localStorage.setItem('lossesPerTradeData', JSON.stringify(lossesPerTradeData));

    // Recreate the chart with the updated data
    createLineChart();
  }
}

// Load data from local storage if available
const storedData = localStorage.getItem('lossesPerTradeData');
if (storedData) {
  lossesPerTradeData = JSON.parse(storedData);
}

// Call the function to create the line chart when the page loads
document.addEventListener('DOMContentLoaded', createLineChart);

// Add event listener to the submit button to update the chart when the user enters data and clicks submit
document.getElementById('submitBtn').addEventListener('click', () => {
  const inputData = document.getElementById('lossesInput').value;
  updateChartWithData(inputData);
});

// Add event listener to the delete button to remove the last value from the chart
document.getElementById('deleteBtn').addEventListener('click', deleteLastValue);
