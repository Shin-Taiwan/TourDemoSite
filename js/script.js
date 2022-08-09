'use strict';
import {asyncGetData} from "./getdata.js"

//DOM宣告
let selectZone = document.querySelector('.header-js-select');
let clickZone = document.querySelector('.btn-js-click');
let card = document.querySelector('.main-js-card');
let main_title = document.querySelector('.main_title')
let pageSelect = document.querySelector('.pagination');
let selectPage = 1;
//listener
selectZone.addEventListener('change', (e)=>controller(e['target']['value']), false)
clickZone.addEventListener('click', (e)=>controller(e['target']['value']), false)
pageSelect.addEventListener('click', changePage, false);

//create select option 
function optionInitial(data) {
    const zoneAry = new Array();
    const len = data.length;
    for (let i = 0;i < len; i++) {
        zoneAry.push(data[i]['Zone'])
    }
    const zoneSet = [...new Set(zoneAry)]
    //create option
    let selectList = "";
    for (let item of zoneSet) {
        selectList += `<option value=${item}>${item}</option>`;
    }
    let defaultSelect = "<option selected disabled>--請選擇行政區--</option>"
    selectZone.innerHTML = defaultSelect + selectList;
}

//Controller
let filterDataAry = new Array()
function controller(filters){
    const judgeAry = filters === 'all' ? data : data.filter(item => item.Zone === filters);
    main_title.textContent = filters === 'all' ? '全部景點' : filters;
    if (filters !== 'all'){
        document.querySelector(`option[value=${filters}]`).selected = true;
    }
    filterDataAry = judgeAry;
    renderPageNumber(1);
    selectPageData(1)
    selectPage = 1;
}


//filter card component
function filterCard(dataAry){
    const len = dataAry.length;
    let createCard="";
    for (let i = 0; i< len; i++){   
        createCard += cardContent(dataAry[i]);
    }
    card.innerHTML=createCard;
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
// pagination
function changePage(e) {
    
    // 抓所點到的頁數
    const pageNum = Number(e.target.innerText);
    const totalpage = Math.ceil(filterDataAry.length / 4);

    // 點選頁數
    if (e.target.className === "page-link page-link-js") {
      selectPageData(pageNum);
      renderPageNumber(pageNum);
      selectPage = pageNum;
    }
  
    // 點選上一頁
    if (e.target.className === "page-link pagination-previous-js") {
      const prevPage = (selectPage - 1 === 0) ? selectPage : (selectPage - 1);
      selectPage = prevPage;
      selectPageData(prevPage);
      renderPageNumber(prevPage);
    }
  
   // 點選下一頁
    if (e.target.className === "page-link pagination-next-js") {
      const nextPage = (selectPage + 1 > totalpage) ? selectPage : (selectPage + 1);
      selectPage = nextPage;
      selectPageData(nextPage);
      renderPageNumber(nextPage);
    }
  }
  
  function renderPageNumber(pageNum) {
      // 算出總頁數，無條件進位
      const totalpage = Math.ceil(filterDataAry.length / 4);
      const prevPage = `<li class="page-item "><a class="page-link pagination-previous-js" href="#">Previous</a></li>`;
      const nextPage = `<li class="page-item "><a class="page-link pagination-next-js" href="#">Next</a></li>`;
      let str = '';

      for (let i = 1; i <= totalpage; i++) {
        // 一開始預設顯示第一頁，如果是第一頁會加上 .active 樣式
        str += (i === pageNum) ?
          `<li class="page-item active"><a class="page-link page-link-js" href="#">${i}</a></li>`
          :
          `<li class="page-item "><a class="page-link page-link-js" href="#">${i}</a></li>`
      }
      // 判斷頁數：如果超過1頁才加入前一頁跟下一頁的功能
      pageSelect.innerHTML = (totalpage > 1) ? prevPage + str + nextPage : str;
  }
  
  function selectPageData(pageNum) {
      // 引入所選地區的觀光景點資料，再依據所點選頁碼去抓出某4筆資料
      const pageData = filterDataAry.slice((pageNum - 1) * 4, pageNum * 4);
      // 將資料丟入 renderTouristList 渲染
      filterCard(pageData);
  }
  
//Get DATA
let result = await asyncGetData();
const data = result['data']['result']['records']
optionInitial(data);
controller('all')


