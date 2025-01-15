document.addEventListener('DOMContentLoaded', function() {

  // Load the navbar initially
  // loadNavbar('navbar');

  const url = 'travel_recommendation_api.json';

  let travelData = []; // Stores all the data fetched

  // Fetch the data
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(`Could not fetch JSON response from ${url}`);
      }
    })
    .then(data => {
      travelData = data;
    })
    .catch(error => console.error(error));

  // Ensure buttons are present before adding event listeners
  const searchBtn = document.getElementById('search-btn');
  const resetBtn = document.getElementById('reset-btn');

  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const searchTerm = document.getElementById('search-text').value.trim();
      const filteredDestinations = filterDestinations(searchTerm, travelData.countries);

      if (filteredDestinations.length === 0) {
        displayNoResultsMessage();
      } else {

        displayRecommendations(filteredDestinations);
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('search-text').value = '';
      document.getElementById('recommendations').innerHTML = '';
    });
  }
});

function displayRecommendations(countries) {
  const container = document.getElementById('recommendations');
        container.innerHTML = '';
  countries.forEach(country => {

    const countryContainer = document.createElement('div');
    countryContainer.className = 'recommendation-card';

    const countryName = document.createElement('h3');
    countryName.textContent = country.name;
    countryContainer.appendChild(countryName);

    country.cities.forEach(city => {
      const cityContainer = document.createElement('div');
      cityContainer.className = 'city-card';

      const cityImage = document.createElement('img');
      cityImage.src = city.imageUrl;
      cityImage.alt = city.name;
      cityContainer.appendChild(cityImage);

      const cityName = document.createElement('h4');
      cityName.textContent = city.name;
      cityContainer.appendChild(cityName);

      const cityDescription = document.createElement('p');
      cityDescription.textContent = city.description;
      cityContainer.appendChild(cityDescription);

      countryContainer.appendChild(cityContainer);

      container.appendChild(countryContainer);

    });
  });
}

function filterDestinations(keyword, countries) {
  return countries.filter(country => {
    const matchedCountry = country.name.toLowerCase().includes(keyword.toLowerCase());
    const matchedCity = country.cities.some(city => city.name.toLowerCase().includes(keyword.toLowerCase()));
    return matchedCountry || matchedCity;
  });
}

function displayNoResultsMessage() {
  const container = document.getElementById('recommendations');
  container.innerHTML = '<p>No results found for your search.</p>';
}

// Helper method to reuse nav-bar code
function loadNavbar(containerClass, navbarFile = 'navbar.html') {
  const container = document.querySelector(`.${containerClass}`);

  if (!container) {
    console.error(`Container with class "${containerClass}" not found.`);
    return false;
  }

  fetch(navbarFile)
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(`Failed to load navbar from ${navbarFile}`);
      }
    })
    .then(html => {
      container.innerHTML = html;
      return true;  // return true to indicate successful loading
    })
    .catch(error => console.error(error));
  return false;  // if loading failed
}
