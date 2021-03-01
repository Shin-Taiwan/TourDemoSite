'use strict';

//AJAX
let xhr = new XMLHttpRequest();
let data = [];
xhr.open('get','https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json',true);
xhr.send(null);
xhr.onload = function(){
    data = JSON.parse(xhr.responseText);
    optionInitial(data['result']['records']);
    cardInitial(data['result']['records']);
}

//DOM宣告
let selectZone = document.querySelector('.header-js-select');
let clickZone = document.querySelector('.btn-js-click');
let card = document.querySelector('.main-js-card');
let main_title = document.querySelector('.main_title')

//listener
selectZone.addEventListener('change', filterCard, false)
clickZone.addEventListener('click', filterCard, false)

//create select option 
function optionInitial(data) {
    let zoneSet = new Set();
    //重複排除
    const len = data.length;
    for (let i = 0;i < len; i++) {
        let zone = data[i]['Zone']
        zoneSet.add(zone);
    }
    //create option
    let selectList = "";
    for (let item of zoneSet) {
        selectList += `<option value=${item}>${item}</option>`;
    }
    let defaultSelect = "<option selected disabled>--請選擇行政區--</option>"
    selectZone.innerHTML = defaultSelect + selectList;
}

//initial card component
function cardInitial(data){
    //create card
    const len = data.length;
    let createCard ="";
    for (let i = 0; i< len; i++){
        createCard += cardContent(data[i]);
    }
    card.innerHTML=createCard;       
}

//filter card component
function filterCard(event){
    let value = event['target']['value'];
    let createCard = "";
    let cardData = data['result']['records'];
    const len = cardData.length;
    for (let i = 0; i< len; i++){
        if (value === cardData[i]['Zone']){
            createCard += cardContent(cardData[i]);
        }
    }
    
    main_title.textContent=`${value}`;
    card.innerHTML=createCard;

    //bind button and select
    document.querySelector(`option[value=${value}]`).selected = true;
}

//create card content
const cardContent = (data)=>{
    let img = data['Picture1'];
    let name = data['Name'];
    let zone = data['Zone'];
    let opentime = data['Opentime'];
    let add = data['Add'];
    let tel = data['Tel'];
    let ticket = data['Ticketinfo'];
    return`
    <div class="col-md-6">
         <div class="main card-img-wrap bg-cover" style="background-image: url(${img});">
         </div>     
         <div class="card mb-5">                         
             <div class="card-body main-card-body">
                 <p class="card-text">
                     <ul class="d-flex list-unstyled justify-content-between text-white">
                         <li class="h4">${name}</li>
                         <li class="">${zone}</li>
                     </ul>
                     <ul class="list-unstyled">
                         <li><img src="./images/icons_clock.png" alt=""> ${opentime}</li>
                         <li class="py-2"><img src="./images/icons_pin.png" alt="">${add}</li>
                         <ul class="d-flex list-unstyled justify-content-between">
                             <li class=""><img src="./images/icons_phone.png" alt="">${tel}</li>
                             <li class=""><img src="./images/icons_tag.png" alt="">${ticket}</li>
                         </ul>
                     </ul>                        
                 </p>
             </div>
         </div>
    </div>`
}


