let accountSizes = JSON.parse(localStorage.getItem("accountSizes")) || [];

function updateLocalStorage(data) {
  localStorage.setItem("accountSizes", JSON.stringify(data));
}

function openModal() {
  const modalBackground = document.getElementById("modalBackground");
  modalBackground.innerHTML = `
    <div class="modal-content">
      <h2>Add Portfolio Size</h2>
      <input type="number" id="dataInput">
      <div class="modal-actions">
        <button onclick="confirmInput()">Add</button>
        <button onclick="cancelInput()">Cancel</button>
      </div>
    </div>
  `;
  modalBackground.style.display = "block";
}

function closeModal() {
  const modalBackground = document.getElementById("modalBackground");
  modalBackground.style.display = "none";
  modalBackground.innerHTML = ""; // Remove modal content from the DOM
}

function confirmInput() {
  const newData = parseFloat(document.getElementById("dataInput").value);
  if (!isNaN(newData)) {
    accountSizes.push(newData);
    closeModal();
    updateLocalStorage(accountSizes);
    updateChart();
  } else {
    alert("Invalid input! Please enter a valid number.");
  }
}

function deleteLastDay() {
  if (accountSizes.length > 0) {
    accountSizes.pop();
    updateLocalStorage(accountSizes);
    updateChart();
  }
}

function cancelInput() {
  closeModal();
}

function updateChart() {
  const ctx = document.getElementById("lineChart").getContext("2d");
  const chartData = {
    labels: Array.from({ length: accountSizes.length }, (_, i) => `Day ${i + 1}`),
    datasets: [{
      label: "Account Size",
      data: accountSizes,
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: "rgba(75, 192, 192, 1)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
      fill: true
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
        ticks: {
          beginAtZero: true,
          stepSize: 200 // Adjust the step size based on your data range
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
  };

  new Chart(ctx, {
    type: "line",
    data: chartData,
    options: chartOptions
  });
}

updateChart(); // Initial chart creation