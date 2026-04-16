// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
// Function to fetch weather alerts for a given US state abbreviation
function fetchWeatherAlerts(state) {

  if (!state || typeof state !== "string") {
    console.log("Please provide a valid state abbreviation.");
    return;
  }

  const STATE_ABBR = state.toUpperCase();

  fetch(`https://api.weather.gov/alerts/active?area=${STATE_ABBR}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Log full API response
      console.log("Weather Alerts Data:", data);
    })
    .catch((error) => {
      // Handle network or API errors
      console.log("Error fetching weather alerts:", error.message);
    });
}