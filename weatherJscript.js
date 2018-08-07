var mainData;
var severalCityData;
var filterByToday = [];
var listByDay = [];

var paramCity = "3116474,3128760,2772400,3062773,3441575,2950159,3078610";

var bcn = "https://api.openweathermap.org/data/2.5/forecast?q=";
var bcn2 = "&lang=es&units=metric&APPID=f68585383622f70889d24366e064123f";

var severalCity = "https://api.openweathermap.org/data/2.5/group?id=" + paramCity + "&lang=es&units=metric&APPID=f68585383622f70889d24366e064123f";

var city = "https://api.openweathermap.org/data/2.5/forecast?q=montgat&lang=es&units=metric&APPID=f68585383622f70889d24366e064123f";

 var myBtnSearch = document.getElementById("myBtnSearch").addEventListener("click", addCity);

startForecast(severalCity);
startForecast(city);

forecastCity = {
  Barcelona: "barcelona",
  Montgat: "montgat",
  Madird: "madrid",
  Montevideo: "montevideo,uy",
  Vienna: "vienna",
  Linz: "linz",
  Praga: "prague",
  Brno: "brno",
  Vladislav: "vladislav,cz",
  London: "London",
  Paris: "paris",
  Roma: "roma",
}

var app = new Vue({
  el: '#app',
  data: {
    forecast: [],
    severalCity: [],
    filterByToday: [],
    filterByDay: []
    
  },
  methods: {
    selectCity: function (name, country) {

      console.log("vue-- " + name, country);
      selectCity(name, country);
    }
  }
});



function startForecast(data) {
  fetch(data, {
    method: "GET",

  }).then(function (response) {

    if (response.ok) {
      // add a new promise to the chain
      return response.json();
    }
    // signal a server error to the chain
    throw new Error(response.statusText);
  }).then(function (json) {
    // equals to .success in JQuery Ajax call
    console.log(json);
    if (json.cnt > 8) {
      mainData = json;
      data = json;
     
    } else {
      severalCityData = json.list;
      app.severalCity = severalCityData;
      severalJsonCity(severalCityData);
    }


    if (mainData["cod"] == "404") {
      alert(mainData["message"]);
    } else {

      app.forecast = mainData;
      console.log("forecast", app.forecast);
      app.forecast.list[0].weather[0].iconima = "http://openweathermap.org/img/w/" + app.forecast.list[0].weather[0].icon + ".png";
      createTodayData(mainData);
     
    }
    // note that this does not add a new promise
  }).catch(function (error) {
    // called when an error occurs anywhere in the chain
    console.log("Request failed: " + error.message);
  });
}


app.severalCity = severalCityData;
//app.forecastCity = forecastCity;
app.filterByToday = filterByToday;
app.filterByDay = listByDay;

// ----------LLAMAR LAS FUNCIONES --------------------


function createTodayData(mainData) {
  filterByToday.splice(0);
  
  console.log(mainData.list);
  console.log("filterByToday", filterByToday);
  

  var date = mainData.list[0].dt_txt.slice(0, 10);
  console.log(mainData.list[0].dt_txt);
  console.log(date);
  console.log(mainData.city.name);

  
    for (var i = 0; i < mainData.list.length - 15; i++) {
    
    mainData.list[i].weather[0].iconima = "http://openweathermap.org/img/w/" + mainData.list[i].weather[0].icon + ".png";
    var jsonDate = mainData.list[i].dt_txt;
    var d = new Date(jsonDate);
    var optionDate = {
      weekday: 'short',
      //year: 'numeric',
      //month: 'short',
      //day: 'numeric'
    };
    var optionTime = {
      hour: 'numeric',
      minute: 'numeric'
    };
    var nuevaDate = d.toLocaleDateString('es-GB', optionDate);
    var newTime = d.toLocaleTimeString('es-GB', optionTime);
    mainData.list[i].newDate = nuevaDate;
    mainData.list[i].newTime = newTime;

    filterByToday.push(mainData.list[i]);
  }
  filterPorDay();
}

function filterPorDay(){
  
  listByDay.splice(0);
  
    for (var j = 0; j < mainData.list.length; j += 8) {
    
    //console.log("filterByDay", listByDay);

    mainData.list[j].weather[0].iconima = "http://openweathermap.org/img/w/" + mainData.list[j].weather[0].icon + ".png";

    var jsonDate = mainData.list[j]["dt_txt"];
    var d = new Date(jsonDate);
    var optionDate = {
      weekday: 'long',
      //month: 'short',
      //day: 'numeric'
    };
    var optionDate2 = {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    };
    var nuevaDate = d.toLocaleDateString('es-GB', optionDate).toUpperCase();
    var nuevaDate2 = d.toLocaleDateString('es-GB', optionDate2);
    mainData.list[j].newDate = nuevaDate;
    mainData.list[j].newDate2 = nuevaDate2;

   // console.log(mainData.list[j]);
    
    listByDay.push(mainData.list[j]);
  }
  console.log("listByDay", listByDay);
}




function severalJsonCity(mainData) {

  for (var i = 0; i < mainData.length; i++) {

    mainData[i].weather[0].iconima = "http://openweathermap.org/img/w/" + mainData[i].weather[0].icon + ".png";
  }
}


function selectCity(item, country) {
 
  console.log(country);
  var land = country;
   console.log(land);
  
  document.getElementById("mainSelectedCity").style.display = "block";
  document.getElementById("severalCity").style.display = "none";
  // var search = document.getElementById("mySearch").value;
  //alert("Has escogido" + " " + search);
  city = bcn + item + "," + land + bcn2;
  console.log(city);
  startForecast(city);
   //filterByDay.splice(0);
}


function addCity() {


  //document.getElementById('nameCity').style.display = "none";
  var selectedCity = document.getElementById("nameCity").value;
  console.log(selectedCity);
  //paramCity = paramCity + "," + mainData.city.id;
  //console.log(paramCity);
  //forecastCity[selectedCity] = selectedCity;
  //console.log(forecastCity);
  //selectCity(selectedCity);
  selectCity(selectedCity);

}


/*
function openModalWindow() {

  startForecast(severalCity);

  document.getElementById("nameCity").value = "";
  document.getElementById("contenedorForecast").style.display = "none";
  document.getElementById("mainContenCity").style.display = "flex";
  var modal = document.getElementById('myModal');
  // Get the button that opens the modal
  var btn = document.getElementById("myBtn").addEventListener("click", addCity);

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  // When the user clicks the button, open the modal 
  //btn.onclick = function() {
  modal.style.display = "block";
  //}
  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
*/