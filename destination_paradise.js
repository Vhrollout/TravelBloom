let clear = document.getElementById('clear');
let searchBtn = document.getElementById("searchBtn");
let bookBtn = document.getElementById("bookBtn");
let bookingDiv = document.getElementById("bookForm");
let form = document.getElementById("form");
let span = document.getElementById('span');
let body = document.querySelector('body');

let bookingData = []

function bookingForm() {
    bookingDiv.style.cssText = "display:block"; // the form element will appear
    body.classList.add("blur");// background blur on click and the class blur is added
}

function cancelForm() {
    bookingDiv.style.cssText = "display: none;"//form element hide
    body.classList.remove("blur"); //body element again appear
}

span.addEventListener("click", cancelForm);

const submitForm = () => {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;

    console.log('Email:', email);
    console.log('Name:', name);
    console.log('Contact:', contact);

    const condition = email === '' && name === '' && contact === '';

    const alertDiv = document.createElement('div');
    const alertP = document.createElement('p');
    alertDiv.appendChild(alertP);
    alertP.style.cssText = 'text-align: center; color: white; font-size: 1rem;';
    alertDiv.style.cssText = 'position: fixed; top: 15rem; left: 20rem; width: 20rem; height: 10rem; text-align: center; background-color: gray;';

    if (condition) {
        alertP.innerText = 'Please fill in all input fields to submit the form.';
    } else {
        alertP.innerText = 'Form submitted successfully!';
        const btn = document.createElement('button');
        btn.innerText = 'Okay';
        btn.style.padding = '1rem';
        btn.style.backgroundColor = 'skyblue';
        btn.style.margin = '1rem';
        btn.style.borderRadius = '1rem';
        alertDiv.appendChild(btn);
        confetti()

        btn.addEventListener('click', () => {
            setTimeout(() => {
                alertDiv.style.display = 'none';
                // Assuming you have a 'bookingDiv' defined somewhere
                bookingDiv.style.display = 'none';
                body.classList.remove("blur");
                clearForm(); // Clear input fields
            }, 1500); // Delay of 2000 milliseconds (2 seconds)
        });

    }

    document.body.appendChild(alertDiv);
};

//form submision
form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitForm();
});

//form inputs will reset
const clearForm = () => {
    document.getElementById('email').value = '';
    document.getElementById('name').value = '';
    document.getElementById('contact').value = '';
    document.getElementById('password').value = '';
};


//functionfor searching cities
function searchCities() {
    let input = document.getElementById("search").value.toLowerCase();
    let resultDiv = document.getElementById("results");
    resultDiv.innerHTML = '';//clear the div before rendering

    fetch("cityData.json", {
        headers: {
            'Accept': 'application/json; charset=utf-8'
        }
    })
        .then(response => response.json())
        .then(data => {
            const country = data.countries.find(item => item.name.toLowerCase() === input);
            if (country) {

                //cancel button to cancel div
                const span = document.createElement("span");
                span.innerHTML = `<i class="fa fa-close fa-2x" id="span"></i>`;
                span.style.cssText = "float: left; color: white; cursor: pointer;"
                resultDiv.appendChild(span);
                span.addEventListener('click', function () {
                    resultDiv.style.cssText = "display: none";
                    resultDiv.innerHTML = '';
                })

                //implementaion of fetched data in div
                country.cities.forEach(city => {
                    const div = document.createElement('div');
                    div.innerHTML = `
        <div class="city-card">
            <h3>${city.name}</h3>
            <img src="${city.imageUrl}" alt="${city.name}">
            <p class="description">${city.description}</p>
            <p class="details">${city.price} per night | ${city.Days} days</p>
        </div>
    `;
                    let btn = document.createElement('button');
                    btn.innerText = "Book Now";
                    btn.classList.add('bookingFormButton');
                    btn.addEventListener('click', () => {
                        resultDiv.style.display = "none";
                        bookingDiv.style.cssText = "display:block"; // the form element will appear
                        body.classList.add("blur");
                    })
                    div.appendChild(btn);

                    resultDiv.classList.add('overlay-container');
                    // Apply styling to the city card
                    div.classList.add('content');
                    resultDiv.appendChild(div);
                });
                ;
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














