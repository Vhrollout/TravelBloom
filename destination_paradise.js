let clear = document.getElementById('clear');
let searchBtn = document.getElementById("searchBtn");
let bookBtn = document.getElementById("bookBtn");
let bookingDiv = document.getElementById("bookForm");
let form = document.getElementsByTagName("form");
let span = document.getElementById('span');
let body = document.querySelector('body');
let bookingData = []

function bookingForm() {
    bookingDiv.style.cssText = "display:block"; // the form element will appear
    body.classList.add("blur");// background blur on click and the class blur is added
    form.style.cssText = "display: flex; flex-direction: column;"
}

function cancelForm() {
    bookingDiv.style.cssText = "display: none;"//form element hide
    body.classList.remove("blur");//body element again appear
}

span.addEventListener("click", cancelForm)


function searchCities() {
    let input = document.getElementById("search").value.toLowerCase();
    let resultDiv = document.getElementById("results");
    fetch("cityData.json", {
        headers: {
            'Accept': 'application/json; charset=utf-8'
        }
    })
        .then(response => response.json())
        .then(data => {
            const country = data.countries.find(item => item.name.toLowerCase() === input);
            if (country) {
                resultDiv.innerHTML = '';
                const span = document.createElement("span");
                span.innerHTML = `<i class="fa fa-close fa-2x" id="span"></i>`;
                span.style.cssText = "float: right;"
                resultDiv.appendChild(span);
                span.addEventListener('click', function () {
                    resultDiv.style.cssText = "display: none";
                    resultDiv.innerHTML = '';
                })
                country.cities.forEach(city => {
                    const div = document.createElement('div');
                    div.innerHTML = `<div><h3>${city.name}</h3>
                                     <img src="${city.imageUrl}" alt="${city.name}">
                                     <figcaption>${city.description}</figcaption>
                                     <p>${city.price}</br>${city.Days}</p>
                                     <button id="bookBtn" type="submit" onclick="bookingForm()">Book Now</button></div>`; // Display city details
                    //styling the content of resulting div
                    div.style.cssText = 'width: 100%; height: auto; box-sizing: border-box; padding: 1rem;';
                    resultDiv.style.cssText = 'display:flex; overflow: hidden; justify-content: space-around; align-items: center; color: #1a2130; font-family: Lato, Arial';
                    resultDiv.appendChild(div);

                });
            }
            else {
                resultDiv.innerHTML = "No results found.";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

searchBtn.addEventListener("click", searchCities);

function clearText() {
    input = document.getElementById('search');
    input.value = '';
}

clear.addEventListener("click", clearText);


// const url = 'https://booking-com.p.rapidapi.com/v1/static/cities?country=it&page=0';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '900c1f3f69msh7986fbcc6c0ded2p14770ajsn1ffd579b1bb9',
// 		'x-rapidapi-host': 'booking-com.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }














