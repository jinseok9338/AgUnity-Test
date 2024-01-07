"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var apiKey = "58754873f237ca24a3e5548338429feb";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
var searchBox = document.querySelector(".search-box input");
var searchBtn = document.querySelector(".search-box button");
var weatherIcon = document.querySelector(".weather-icon");
var loadingOverlay = document.querySelector(".loading-overlay");
function checkWeather(city) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var cityEl, tempEl, humidityEl, windEl, response, data, error_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    cityEl = document.querySelector(".city");
                    tempEl = document.querySelector(".temp");
                    humidityEl = document.querySelector(".humidity");
                    windEl = document.querySelector(".wind");
                    if (!(cityEl && tempEl && humidityEl && windEl)) {
                        throw new Error("Element not found");
                    }
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 8]);
                    if (loadingOverlay) {
                        loadingOverlay.style.display = "flex"; // Show loading overlay
                    }
                    return [4 /*yield*/, fetch(apiUrl + city + "&appid=".concat(apiKey))];
                case 2:
                    response = _e.sent();
                    if (loadingOverlay) {
                        loadingOverlay.style.display = "none"; // Hide loading overlay
                    }
                    if (!(response.status === 404)) return [3 /*break*/, 3];
                    (_a = document.querySelector(".error")) === null || _a === void 0 ? void 0 : _a.classList.add("visible");
                    (_b = document.querySelector(".weather")) === null || _b === void 0 ? void 0 : _b.classList.remove("visible");
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    data = _e.sent();
                    cityEl.innerHTML = data.name; // adds city name
                    tempEl.innerHTML = Math.round(data.main.temp) + "&degC"; // adds temp, which is the api object is inside main object
                    humidityEl.innerHTML = data.main.humidity + "%"; // adds humidity, which is the api object is inside main object
                    windEl.innerHTML = data.wind.speed + " km/hr"; // adds wind speed, which is the api object is inside main object
                    if (data.weather[0].main === "Clouds") {
                        weatherIcon === null || weatherIcon === void 0 ? void 0 : weatherIcon.setAttribute("src", "images/clouds.png");
                    }
                    else if (data.weather[0].main === "Clear") {
                        weatherIcon === null || weatherIcon === void 0 ? void 0 : weatherIcon.setAttribute("src", "images/clear.png");
                    }
                    else if (data.weather[0].main === "Rain") {
                        weatherIcon === null || weatherIcon === void 0 ? void 0 : weatherIcon.setAttribute("src", "images/rain.png");
                    }
                    else if (data.weather[0].main === "Drizzle") {
                        weatherIcon === null || weatherIcon === void 0 ? void 0 : weatherIcon.setAttribute("src", "images/drizzle.png");
                    }
                    else if (data.weather[0].main === "Mist") {
                        weatherIcon === null || weatherIcon === void 0 ? void 0 : weatherIcon.setAttribute("src", "images/mist.png");
                    }
                    (_c = document.querySelector(".weather")) === null || _c === void 0 ? void 0 : _c.classList.add("visible");
                    (_d = document.querySelector(".error")) === null || _d === void 0 ? void 0 : _d.classList.remove("visible");
                    _e.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6:
                    error_1 = _e.sent();
                    console.log('An error occurred:', error_1);
                    return [3 /*break*/, 8];
                case 7:
                    if (loadingOverlay) {
                        loadingOverlay.style.display = "none";
                    }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
if (searchBtn && searchBox) {
    searchBtn.addEventListener('click', function () {
        checkWeather(searchBox.value);
    });
}
