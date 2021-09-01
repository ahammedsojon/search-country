const loadCountries = () => {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(data => displayCountries(data))
}
loadCountries();

const displayCountries = countries => {
    const countriesDiv = document.getElementById('countries');
    countries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('country');
        countryDiv.innerHTML = `
        <h3>${country.name}</h3>
        <p>${country.capital}</p>
       <button onclick="loadCountryByName('${country.name}')">country details</button>
        `;
        countriesDiv.appendChild(countryDiv);
    })
}
const loadCountryByName = name => {
    const url = `https://restcountries.eu/rest/v2/name/${name}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayCountryDetails(data))
}
const displayCountryDetails = details => {
    const detailsInfo = details[0];
    console.log(detailsInfo);
    const countryDetails = document.getElementById('country-details');
    countryDetails.classList.add('show')
    countryDetails.innerHTML = `
    <h3>Country: ${detailsInfo.name}</h3>
    <h4>Region: ${detailsInfo.region}</h4>
    <p>Population: ${detailsInfo.population}</p>
    <img width="200px" src="${detailsInfo.flag}">
    `
}
const searchInput = document.getElementById('search');
searchInput.addEventListener('keyup', (e) => {
    const searchVal = e.target.value;
    console.log(searchVal);
    const countries = document.getElementsByClassName('country');
    for (const country of countries) {
        if (country.children[0].innerText.toLowerCase().includes(searchVal.toLowerCase())) {
            country.style.display = 'block';
        } else {
            country.style.display = 'none';
        }
    }
})