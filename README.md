# Creating a detailed README content for the project
detailed_readme_content = """
# Weather Dashboard Application

This project is a **Weather Dashboard** application built using **React**. It allows users to view the current weather and a seven-day forecast for their location, as well as search for weather conditions in other cities. The app also includes a dark mode toggle for better user experience.

## Features

### 1. Current Location Weather
- Uses the **Geolocation API** to obtain the user's latitude and longitude.
- Fetches current weather data and a seven-day forecast from the **OpenWeather API**.
- Displays weather conditions such as temperature, humidity, wind speed, and more.

### 2. City Search
- Allows users to search for any city by name.
- Fetches and displays both the current weather and a seven-day forecast for the searched city.
- Handles cases where the city is not found by the API.

### 3. Dark Mode Toggle
- Provides users the option to switch between light and dark modes.
- The toggle is located in the header for easy access.

### 4. Responsive UI
- The app is designed with a clean and simple layout.
- Components such as the search bar, weather cards, and forecast display are optimized for desktop and mobile views.

## Components

### `App.js`
- The main component that manages application state and handles API calls.
- Integrates other components like `SearchBar`, `WeatherCard`, and `SevenDayForecast`.

### `SearchBar.js`
- A component that provides a search input for users to enter city names.
- Calls the `fetchSearchedCityWeather` function from the parent `App` component upon form submission.

### `WeatherCard.js`
- Displays current weather data in a card format.
- Includes key information such as temperature, weather conditions, and location.

### `SevenDayForecast.js`
- Renders a seven-day weather forecast.
- Displays data for each day, including high and low temperatures and weather icons.

## Technologies Used

- **React**: For building the user interface.
- **Axios**: For making HTTP requests to the OpenWeather API.
- **OpenWeather API**: For fetching real-time weather data.
- **CSS**: For styling the application.
- **Geolocation API**: For retrieving the user's current location.

## Installation and Setup

1. Clone the repository:
   ```sh
   git clone <repository-url>
