//https://api.spoonacular.com/recipes/97144/information?includeNutrition=false&apiKey=${api_key}
let p = document.getElementsByTagName("p")
const api_key = "fe10a0b591e5476890d2d10e224709c3",
container = document.querySelector(".container"),
search = document.querySelector(".search"),
fa_search = document.querySelector(".fa-search")
xml = new XMLHttpRequest();
let data;
let url;
let regex;

const getData = ()=>{

xml.onreadystatechange= ()=>{
    if(xml.readyState === 4 && xml.status ===200){
        data = JSON.parse(xml.responseText)
        for(let i=0;i<data.results.length;i++){
            container.innerHTML += `<div class="recipe_div"><img class="${data.results[i].id} pop" src="${data.results[i].image}"><p>${data.results[i].title}</p></div>`
        }
    }
}
    xml.open("GET",`https://api.spoonacular.com/recipes/complexSearch?query=traditional&number=100&apiKey=${api_key}`,true)
    xml.send();
}


const requestInfo = (e)=>{
    let target = e.target
    let id
    if(target.classList.contains("pop")){
        id = target.classList[0]
    xml.onreadystatechange= ()=>{
    if(xml.readyState === 4 && xml.status ===200){
        url = JSON.parse(xml.responseText)
        window.open(`${url.sourceUrl}`)
    }
}
    xml.open("GET",`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${api_key}`,true)
    xml.send();
    }
}



const locateRecipe = ()=>{
    let reg = new RegExp(` ${search.value}`,"i")
    for(let i=0;i<p.length;i++){
        if(reg.test(p[i].innerHTML)){
            p[i].parentElement.style.display = "flex"
            p[i].parentElement.classList.add("active")
            setTimeout(()=>{
                p[i].parentElement.classList.remove("active")
            },1000)
        }else{
            p[i].parentElement.style.display = "none"
        }
    }
    
    search.value = ""
}

fa_search.addEventListener("click",locateRecipe)
window.addEventListener("click",requestInfo)

getData();


