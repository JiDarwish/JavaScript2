//creating a button and writing sth into it and assigning it to a value
let button1 = document.createElement("button");
button1.setAttribute("id", "consoleLogButton");
button1.innerHTML = "Click me!";
document.body.appendChild(button1);

// console logging sth once the button is clicked
button1.onclick = function () {
    console.log("You clicked me!");
}

//another button will be used for the weather
let button2 = document.createElement("button");
button2.setAttribute("id", "consoleLogButton");
button2.innerHTML = "Weather here!";
document.body.appendChild(button2);


//Get request
const url = "http://api.openweathermap.org/data/2.5/weather?q=amsterdam&appid=11e661e44bd9490bd46f564cfef15b90&units=metric";
let weather = new XMLHttpRequest();
weather.open("GET", url, false);
weather.send(null);
//parse the JSON to make it easier to read later on
let data = JSON.parse(weather.response);

// the request is done all I have to do is assign values to some variables
let city = data.name;
let temp = data.main.temp;
let weatherState = data.weather[0].main;
let pressure = data.main.pressure;

//creating HTML elements
let div = document.createElement("div");
div.setAttribute("id", "weathreContainer");
let h2 = document.createElement("h2");
h2.setAttribute("id", "weatherHeader");
let p = document.createElement("p");
p.setAttribute("id", "actualWeather");


// adding weather info
h2.innerHTML = "The weather in " + city;
p.innerHTML = 
    "weather state: " + weatherState + "<br>"+
    "tempreture: " + temp + "<br>" +
    "Pressure: " + pressure;



//Appending elements to the div
div.appendChild(h2);
div.appendChild(p);

// appending the div  once button clicked!
button2.onclick = function () {
    document.body.appendChild(div);
}
