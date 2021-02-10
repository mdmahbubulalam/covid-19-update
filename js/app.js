const searchCountry = country => {
    const countryInput = document.getElementById('countryInput').value;
    const countryName = countryInput.charAt(0).toUpperCase() + countryInput.slice(1);
    
    const mainUrl = `https://covid-api.mmediagroup.fr/v1/cases?country=${countryName}`;
    const statusDeathUrl = `https://covid-api.mmediagroup.fr/v1/history?country=${countryName}&status=deaths`;
    const statusConfirmedUrl = `https://covid-api.mmediagroup.fr/v1/history?country=${countryName}&status=confirmed`;
    const statusRecoveredUrl = `https://covid-api.mmediagroup.fr/v1/history?country=${countryName}&status=recovered `;


    Promise.all([
            fetch(mainUrl)
            .then(resMain => resMain.json()),
            fetch(statusDeathUrl)
            .then(resDeath => resDeath.json()),
            fetch(statusConfirmedUrl)
            .then(resConfirmed => resConfirmed.json()),
            fetch(statusRecoveredUrl)
            .then(resRecovered => resRecovered.json()),
        ])
        .then((data) => displayCovidStatus(data[0].All, data[1].All, data[2].All, data[3].All))
        .catch(error => errorText('Please enter a valid country name'))
}

const displayCovidStatus = (statusMain, statusDeath, statusConfirmed, statusRecovered) => {

    const statusConfirmedObj =statusConfirmed.dates;
    const statusConfirmedObjValue = Object.values(statusConfirmedObj);
    const newConfirmed=statusConfirmedObjValue[0]-statusConfirmedObjValue[1];

    const statusRecoveredObj =statusRecovered.dates;
    const statusRecoveredObjValue = Object.values(statusRecoveredObj);
    const newRecovered=statusRecoveredObjValue[0]-statusRecoveredObjValue[1];

    const statusDeathObj =statusDeath.dates;
    const statusDeathObjValue = Object.values(statusDeathObj);
    const newDeath=statusDeathObjValue[0]-statusDeathObjValue[1];

    const errorMessage = document.getElementById('errorText');
    errorMessage.innerText = '';

    const covidDetails = document.getElementById('covidDetails');
    const covidDetailsDiv = document.createElement('div');
    covidDetailsDiv.innerHTML='';
    covidDetailsDiv.className = 'covidDetails';

    covidDetailsDiv.innerHTML = `
        <p class="textSize">${'<b>Country</b>: '+statusMain.country}</p>
        <p class="textSize">${'<b>Capital</b>: '+statusMain.capital_city}</p>
        <p class="textSize">${'<b>Continent</b>: '+statusMain.continent}</p>
        <p class="textSize">${'<b>Location</b>: '+statusMain.location}</p>
        <p class="textSize">${'<b>Area</b>: '+statusMain.sq_km_area+'km<sup>2</sup>'}</p>
        <p class="textSize">${'<b>Population</b>: '+statusMain.population}</p>
        <p class="textSize">${'<b>Life Expectancy</b>: '+statusMain.life_expectancy}</p>
        <p class="textSize text-warning">${'<b>Confirmed</b>: '+statusMain.confirmed}</p>
        <p class="textSize text-success">${'<b>Recovered</b>: '+statusMain.recovered}</p>
        <p class="textSize text-danger">${'<b>Deaths</b>: '+statusMain.deaths}</p>
        <p class="textSize text-warning">${'<b>New Confirmed</b>: '+newConfirmed}</p>
        <p class="textSize text-success">${'<b>New Recovered</b>: '+newRecovered}</p>
        <p class="textSize text-danger">${'<b>New Deaths</b>: '+newDeath}</p>
        <p class="textSize">${'<b>Elevation in Meters</b>: '+statusMain.elevation_in_meters}</p>
    `
    covidDetails.appendChild(div);
}

const errorText = error => {
    const errorMessage = document.getElementById('errorText');
    errorMessage.innerText = error;
}