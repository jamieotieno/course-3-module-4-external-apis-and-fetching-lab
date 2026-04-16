// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
// Fetch weather alerts for a given US state abbreviation
function fetchWeatherAlerts(state) {
  const STATE_ABBR = state.trim().toUpperCase();

  // basic validation
  if (!STATE_ABBR || STATE_ABBR.length !== 2) {
    showError("Please enter a valid 2-letter state abbreviation.");
    return;
  }

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
      displayAlerts(data);
    })
    .catch((error) => {
      showError("Network error. Please try again later.");
      console.log(error);
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

  // Clear previous UI before fetching new data
  document.querySelector("#alerts-display").innerHTML = "";
  hideError();

  // Clear input field after reading value
  input.value = "";

  // Fetch new data
  fetchWeatherAlerts(state);
});