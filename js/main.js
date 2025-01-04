var navbarLink = document.querySelectorAll(".nav-link")
for (let i = 0; i < navbarLink.length; i++) {
    navbarLink[i].addEventListener("click", function () {
        for (let j = 0; j < navbarLink.length; j++) {
            navbarLink[j].classList.remove("active");

        }
        this.classList.add("active")

    })
}
// Helper function to format the date
function formatDate(dateString, format = "DD MMMM") {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    if (format === "DD MMMM") return `${day} ${month}`;
    if (format === "DD/MM/YYYY") return `${day}/${date.getMonth() + 1}/${year}`;
    return dateString;
}

// Helper function to get the weekday name
function getDayOfWeek(dateString) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date(dateString).getDay()];
}

// Function to generate a weather card
function generateWeatherCard(data, index, mainStyle, headerStyle) {
    const dayData = data.forecast.forecastday[index];
    const { date, day } = dayData;
    const { maxtemp_c, mintemp_c, mintemp_f, maxwind_kph, condition, daily_chance_of_rain } = day;

    return `
    <div class="col-md-4 ${mainStyle} p-0">
    <div class="divHeader ${headerStyle} d-flex justify-content-between p-1">
        <p>${getDayOfWeek(date)}</p>
        ${index === 0 ? `<p>${formatDate(date, "DD MMMM")}</p>` : ""}
    </div>
    <div class="divBody  p-3">
        ${index === 0 ? `
            <h1 class="mb-4" style="font-size: 30px;">${data.location.name}</h1>
             <h1 class="mb-4" style="font-size: 70px;">${maxtemp_c}°C</h1>
            <img src="https:${condition.icon}" alt="Weather Icon" class="mb-4">
            <p class="text-info mb-4">${condition.text}</p>
            <div class="d-flex justify-content-around mt-2">
            <div class="d-flex"><i class="fa-solid fa-umbrella me-2"></i><p>${daily_chance_of_rain}%</p></div>
            <div class="d-flex"><i class="fa-solid fa-wind me-2"></i><p>${maxwind_kph} km/h</p></div>
            <div class="d-flex"><i class="fa-solid fa-sun me-2"></i><p>${mintemp_c}°C</p></div>
            </div>
        ` : `
             <div class=" text-center">
            <div class=" mb-3 ">
            <img src="https:${condition.icon}" alt="Weather Icon" class="me-3 mb-4" style="width: 50px;">
            <h2 class="mb-2" style="font-size: 25px;">${maxtemp_c}°C</h2>
            <p class="mb-4">${mintemp_f}°F</p>
            </div>
            <p class="text-info mb-4">${condition.text}</p>
             </div>
        `}
    </div>
</div>
    `;
}

// Fetch weather data and render cards
function fetchWeatherData(location, days = 3) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=5d294894f30f452daf3152821242112&q=${location}&days=${days}`;

    const forecastDiv = document.querySelector(".forcastDiv");
    forecastDiv.innerHTML = "<p>Loading...</p>"; // Show loading state

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("Invalid location or API error");
            return res.json();
        })
        .then(data => {
            forecastDiv.innerHTML = `
                ${generateWeatherCard(data, 0, "bg-second-main-color", "headerColorForbg-Secondry")}
                ${generateWeatherCard(data, 1, "bg-second-card", "headerColorForbg-Main")}
                ${generateWeatherCard(data, 2, "bg-second-main-color", "headerColorForbg-Secondry")}
            `;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            forecastDiv.innerHTML = "<p>Location not found. Please try again.</p>";
        });
}

document.getElementById("search-btn").addEventListener("click", function () {
    const location = document.getElementById("location-input").value.trim();
    if (location) {
        fetchWeatherData(location); // Fetch weather for the typed location
    } else {
        fetchWeatherData("Cairo"); // Default to Cairo if input is empty
    }
});

// Event listener for clearing the input
document.getElementById("location-input").addEventListener("input", function () {
    const location = this.value.trim();
    if (!location) {
        fetchWeatherData("Cairo"); // Reset to Cairo when input is cleared
    }
});


// Initial weather fetch for default location (Cairo)
fetchWeatherData("Cairo");




//da 34n a4of kol char mawgod kam mara
// let x = "hello ahmed mohamed mohamed"

// let newMap = new Map()
// for (const character of x) {
//     if (newMap.has(character)) {
//         const res = newMap.get(character)
//         newMap.set(character, res + 1)

//     }
//     else {
//         newMap.set(character, 1)

//     }
// }
// console.log(newMap);
