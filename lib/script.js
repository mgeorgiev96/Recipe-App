"use strict";

//https://api.spoonacular.com/recipes/97144/information?includeNutrition=false&apiKey=${api_key}
var p = document.getElementsByTagName("p");
var api_key = "fe10a0b591e5476890d2d10e224709c3",
    container = document.querySelector(".container"),
    search = document.querySelector(".search"),
    fa_search = document.querySelector(".fa-search");
var xml = new XMLHttpRequest();
var data;
var url;
var regex;

var getData = function getData() {
  xml.onreadystatechange = function () {
    if (xml.readyState === 4 && xml.status === 200) {
      data = JSON.parse(xml.responseText);

      for (var i = 0; i < data.results.length; i++) {
        container.innerHTML += "<div class=\"recipe_div\"><img class=\"".concat(data.results[i].id, " pop\" src=\"").concat(data.results[i].image, "\"><p>").concat(data.results[i].title, "</p></div>");
      }
    }
  };

  xml.open("GET", "https://api.spoonacular.com/recipes/complexSearch?query=traditional&number=100&apiKey=".concat(api_key), true);
  xml.send();
};

var requestInfo = function requestInfo(e) {
  var target = e.target;
  var id;

  if (target.classList.contains("pop")) {
    id = target.classList[0];

    xml.onreadystatechange = function () {
      if (xml.readyState === 4 && xml.status === 200) {
        url = JSON.parse(xml.responseText);
        window.open("".concat(url.sourceUrl));
      }
    };

    xml.open("GET", "https://api.spoonacular.com/recipes/".concat(id, "/information?includeNutrition=false&apiKey=").concat(api_key), true);
    xml.send();
  }
};

var locateRecipe = function locateRecipe() {
  var reg = new RegExp(" ".concat(search.value), "i");

  var _loop = function _loop(i) {
    if (reg.test(p[i].innerHTML)) {
      p[i].parentElement.style.display = "flex";
      p[i].parentElement.classList.add("active");
      setTimeout(function () {
        p[i].parentElement.classList.remove("active");
      }, 1000);
    } else {
      p[i].parentElement.style.display = "none";
    }
  };

  for (var i = 0; i < p.length; i++) {
    _loop(i);
  }

  search.value = "";
};

fa_search.addEventListener("click", locateRecipe);
window.addEventListener("click", requestInfo);
getData();