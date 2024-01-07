const apiKey: string = "58754873f237ca24a3e5548338429feb";
const apiUrl: string = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox: HTMLInputElement | null = document.querySelector(".search-box input");
const searchBtn: HTMLButtonElement | null = document.querySelector(".search-box button");
const weatherIcon: HTMLImageElement | null = document.querySelector(".weather-icon");
const loadingOverlay: HTMLElement | null = document.querySelector(".loading-overlay");

async function checkWeather(city: string): Promise<void> {


    const cityEl = document.querySelector(".city");
    const tempEl = document.querySelector(".temp");
    const humidityEl = document.querySelector(".humidity");
    const windEl = document.querySelector(".wind");

    if (!(cityEl && tempEl && humidityEl && windEl)) {
        throw new Error("Element not found");
    }
    try {
        if (loadingOverlay) {
            loadingOverlay.style.display = "flex"; // Show loading overlay
        }

        const response: Response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (loadingOverlay) {
            loadingOverlay.style.display = "none"; // Hide loading overlay
        }

        if (response.status === 404) {
            document.querySelector(".error")?.classList.add("visible");
            document.querySelector(".weather")?.classList.remove("visible");
        } else {
            const data: any = await response.json();

            cityEl.innerHTML = data.name; // adds city name
            tempEl.innerHTML = Math.round(data.main.temp) + "&degC"; // adds temp, which is the api object is inside main object
            humidityEl.innerHTML = data.main.humidity + "%"; // adds humidity, which is the api object is inside main object
            windEl.innerHTML = data.wind.speed + " km/hr"; // adds wind speed, which is the api object is inside main object

            if (data.weather[0].main === "Clouds") {
                weatherIcon?.setAttribute("src", "images/clouds.png");
            } else if (data.weather[0].main === "Clear") {
                weatherIcon?.setAttribute("src", "images/clear.png");
            } else if (data.weather[0].main === "Rain") {
                weatherIcon?.setAttribute("src", "images/rain.png");
            } else if (data.weather[0].main === "Drizzle") {
                weatherIcon?.setAttribute("src", "images/drizzle.png");
            } else if (data.weather[0].main === "Mist") {
                weatherIcon?.setAttribute("src", "images/mist.png");
            }

            document.querySelector(".weather")?.classList.add("visible");
            document.querySelector(".error")?.classList.remove("visible");
        }
    } catch (error) {
        console.log('An error occurred:', error);
    } finally {
        if (loadingOverlay) {
            loadingOverlay.style.display = "none";
        }
    }
}

if (searchBtn && searchBox) {
    searchBtn.addEventListener('click', () => {
        checkWeather(searchBox.value);
    });
}
