async function fetchCountries() {
    try {
      let countriesResponse = await fetch('https://restcountries.com/v3.1/all');
      if (!countriesResponse.ok) {
        throw new Error('Failed to fetch countries');
      }
      let countries = await countriesResponse.json();
      let grid = document.querySelector('.countries-grid');
  
      for (const country of countries) {
        try {
          const unsplashImage = await fetchUnsplashImage(country.name.common);
  
          if (!unsplashImage) {
            console.log(`No image found for ${country.name.common}`);
            continue;
          }
  
          const card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `
            <img src="${unsplashImage}" alt="${country.name.common}">
            <h3>${country.name.common}</h3>
          `;
  
          card.addEventListener('click', () => openModal(country));
          grid.appendChild(card);
        } catch (error) {
          console.error(`Error processing country ${country.name.common}:`, error);
        }
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  }
  
  async function fetchUnsplashImage(query) {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=s8zYMbNbXf7pe2AwIsppKpiwnrTnKBHA3midVw3Geeg`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch Unsplash image');
      }
      const data = await response.json();
      return data.results[0]?.urls.small || null; 
    } catch (error) {
      console.error('Error fetching Unsplash image:', error);
      return null; 
    }
  }
  
  function openModal(country) {
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.close-modal');
    const countryName = document.getElementById('country-name');
    const countryFlag = document.getElementById('country-flag');
    const countryInfo = document.getElementById('country-info');
    const eventsList = document.getElementById('events-list');
  
    countryName.textContent = country.name.common;
    countryFlag.src = country.flags.png;
    countryInfo.textContent = `Capital: ${country.capital}, Population: ${country.population}`;
  
    fetchEvents(country.name.common).then((events) => {
      eventsList.innerHTML = '';
      events.forEach((event) => {
        const li = document.createElement('li');
        li.textContent = event.name.text;
        eventsList.appendChild(li);
      });
    });
  
    modal.classList.remove('hidden');
    closeModal.onclick = () => modal.classList.add('hidden');
  }
  
  async function fetchEvents(countryName) {
    try {
      const response = await fetch(
        `https://www.eventbriteapi.com/v3/events/search/?q=${encodeURIComponent(countryName)}&token=H5RNBZXJA356EB43RQYE`
      );
      if (!response.ok) {
        console.log('Failed to fetch events');
      }
      const data = await response.json();
      return data.events || [];
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  }
  
  fetchCountries();


let timeLeft = 3600;

function updateTimer() {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  document.getElementById('timer').textContent = formattedTime;

  if (timeLeft > 0) {
    timeLeft--;
  } else {
    clearInterval(timerInterval); 
    alert('The discount has expired!');
  }
}

const timerInterval = setInterval(updateTimer, 1000);

document.querySelector('.discount-button').addEventListener('click', function(){
  alert('Thank you for claiming the offer!');
});