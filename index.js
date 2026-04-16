// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

// Error Handling
function showError(message) {
  const errorBox = document.querySelector("#error-message");
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

function hideError() {
  const errorBox = document.querySelector("#error-message");
  errorBox.textContent = "";
  errorBox.classList.add("hidden");
}

// Fetch weather alerts for a given US state abbreviation
function fetchWeatherAlerts(state) {
  const STATE_ABBR = state.trim().toUpperCase();

  // Empty or invalid input error
  if (!STATE_ABBR || STATE_ABBR.length !== 2) {
    showError("Please enter a valid 2-letter state abbreviation.");
    return;
  }

  // Clear previous errors before new request
  hideError();

  fetch(`https://api.weather.gov/alerts/active?area=${STATE_ABBR}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("API Data:", data);

      // Clear error on success
      hideError();

      displayAlerts(data);
    })
    .catch((error) => {
      
      console.log(error.message);

      showError(error.message || "Something went wrong while fetching data.");
    });
}

// Display Data
function displayAlerts(data) {
  const container = document.querySelector("#alerts-display");
  container.innerHTML = "";

  const alerts = data.features || [];

  // Summary
  const summary = document.createElement("h2");
  const title = data.title || "Weather Alerts";

  summary.textContent = `${title}: ${alerts.length}`;
  container.appendChild(summary);

  // No alerts case
  if (alerts.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "No active weather alerts for this state.";
    container.appendChild(msg);
    return;
  }

  // List alerts
  const list = document.createElement("ul");

  alerts.forEach((alert) => {
    const li = document.createElement("li");
    li.textContent = alert?.properties?.headline || "No headline available";
    list.appendChild(li);
  });

  container.appendChild(list);
}

// Event Listener and Clearing
document.querySelector("#fetch-alerts").addEventListener("click", () => {
  const input = document.querySelector("#state-input");
  const state = input.value;

  //reset UI
  input.value = "";
  document.querySelector("#alerts-display").innerHTML = "";


  fetchWeatherAlerts(state);
});