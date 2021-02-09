const searchCountry = country => {
    const countryInput = document.getElementById('countryInput').value;
    const countryName = countryInput.charAt(0).toUpperCase() + countryInput.slice(1);
    const url = `https://covid-api.mmediagroup.fr/v1/cases?country=${countryName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCovidStatus(data.All))
        .catch(error => errorText('Please enter a valid country name'))
}

const displayCovidStatus = status => {
    const errorMessage = document.getElementById('errorText');
    errorMessage.innerText = '';
    const covidDetails = document.getElementById('covidDetails');
    const div = document.createElement('div');
    div.className = 'covidDetails';
    div.innerHTML = `
        <p class="textSize">${'<b>Country</b>: '+status.country}</p>
        <p class="textSize">${'<b>Capital</b>: '+status.capital_city}</p>
        <p class="textSize">${'<b>Continent</b>: '+status.continent}</p>
        <p class="textSize">${'<b>Location</b>: '+status.location}</p>
        <p class="textSize">${'<b>Area</b>: '+status.sq_km_area+'km<sup>2</sup>'}</p>
        <p class="textSize">${'<b>Population</b>: '+status.population}</p>
        <p class="textSize">${'<b>Life Expectancy</b>: '+status.life_expectancy}</p>
        <p class="textSize text-warning">${'<b>Confirmed</b>: '+status.confirmed}</p>
        <p class="textSize text-success">${'<b>Recovered</b>: '+status.recovered}</p>
        <p class="textSize text-danger">${'<b>Deaths</b>: '+status.deaths}</p>
        <p class="textSize">${'<b>Elevation in Meters</b>: '+status.elevation_in_meters}</p>
    `
    covidDetails.appendChild(div);
}

const errorText = error => {
    const errorMessage = document.getElementById('errorText');
    errorMessage.innerText = error;
}