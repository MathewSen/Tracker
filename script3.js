const colors = {
    purple: {
default: "rgba(76, 233, 76, 1)",
half: "rgba(76, 233, 76, 0.5)",
quarter: "rgba(76, 233, 76, 0.25)",
zero: "rgba(76, 233, 76, 0)"
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)"
    }
  };
  
  const weight = [100, 400, 500, 600, 900];
  
  const ctx = document.getElementById("canvas").getContext("2d");
  ctx.canvas.height = 100;

  // Initialize the weight array with the values from localStorage, or an empty array if it's not available
  let chartWeightData = JSON.parse(localStorage.getItem("weight")) || [];

  gradient = ctx.createLinearGradient(0, 25, 0, 300);
  gradient.addColorStop(0, colors.purple.half);
  gradient.addColorStop(0.35, colors.purple.quarter);
  gradient.addColorStop(1, colors.purple.zero);

  
  const options = {
    type: "line",
    data: {
      labels: Array.from({ length: chartWeightData.length }, (_, i) => ` ${i + 1}`),
      datasets: [
        {
          fill: true,
          backgroundColor: gradient,
          pointBackgroundColor: colors.purple.default,
          borderColor: colors.purple.default,
          data: chartWeightData,
          lineTension: 0.2,
          borderWidth: 2,
          pointRadius: 3
        }
      ]
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
  };
  
  window.onload = function () {
    window.myLine = new Chart(ctx, options);

    // Update the chart with the weight data from localStorage
    window.myLine.data.datasets[0].data = chartWeightData;
    window.myLine.update();
  };

  // Get references to the button and pop-up div
  const addWeightButton = document.getElementById("addWeightButton");
  const popupDiv = document.getElementById("popupDiv");
  const weightInput = document.getElementById("weightInput");
  const submitWeightButton = document.getElementById("submitWeightButton");

  // Show the pop-up div when the button is clicked
  addWeightButton.addEventListener("click", () => {
    popupDiv.style.display = "block";
  });

  // Function to add the input value to the weight array and update the chart
  function addWeightValue() {
    const inputValue = parseFloat(weightInput.value);
    if (!isNaN(inputValue)) {
      chartWeightData.push(inputValue);
      window.myLine.data.datasets[0].data = chartWeightData;
      window.myLine.update();
      // Save the updated weight array to localStorage
      localStorage.setItem("weight", JSON.stringify(chartWeightData));
      popupDiv.style.display = "none";
      weightInput.value = "";
    }
  }

 // Function to delete the last day's weight from the chart and localStorage
 function deleteLast() {
    if (chartWeightData.length > 0) {
      chartWeightData.pop();
      window.myLine.data.datasets[0].data = chartWeightData;
      window.myLine.update();
      // Save the updated weight array to localStorage
      localStorage.setItem("weight", JSON.stringify(chartWeightData));
    }
  }
