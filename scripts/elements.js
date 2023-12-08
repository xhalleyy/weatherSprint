import { SearchCityApi, removeFav } from "./app.js";
let futureTimes = document.getElementById("futureTimes");

function OtherDatesInfo() {
    futureTimes.innerHTML = " ";

    // Inner Portion: Morning
    let p1 = document.createElement("p");
    p1.textContent = "8am";
    let p2 = document.createElement("p");
    p2.id = "morning1Icon";
    p2.classList.add("iconFont");
    p2.classList.add("curr-times-font");
    let h2 = document.createElement("h2");
    h2.classList.add("timeTempText");
    h2.id = "date1AMTemp";

    let morningDiv = document.createElement("div");
    morningDiv.classList.add("col");
    morningDiv.classList.add("timeText");

    morningDiv.appendChild(p1);
    morningDiv.appendChild(p2);
    morningDiv.appendChild(h2);

    // Inner-Portion: Noon
    let p3 = document.createElement("p");
    p3.textContent = "noon";
    let p4 = document.createElement("p");
    p4.id = "noon1Icon";
    p4.classList.add("iconFont");
    p4.classList.add("curr-times-font");
    let noonH2 = document.createElement("h2");
    noonH2.classList.add("timeTempText");
    noonH2.id = "date1Noon";

    let noonDiv = document.createElement("div");
    noonDiv.classList.add("col");
    noonDiv.classList.add("timeText");

    noonDiv.appendChild(p3);
    noonDiv.appendChild(p4);
    noonDiv.appendChild(noonH2);

    // Inner-Portion: Night
    let p5 = document.createElement("p");
    p5.textContent = "8pm";
    let p6 = document.createElement("p");
    p6.id = "night1Icon";
    p6.classList.add("iconFont");
    p6.classList.add("curr-times-font");
    let nightH2 = document.createElement("h2");
    nightH2.classList.add("timeTempText");
    nightH2.id = "date1PM";

    let nightDiv = document.createElement("div");
    nightDiv.classList.add("col");
    nightDiv.classList.add("timeText");

    nightDiv.appendChild(p5);
    nightDiv.appendChild(p6);
    nightDiv.appendChild(nightH2);

    // Wrap inner inside a div, which contains the row
    let innerRow = document.createElement("div");
    innerRow.className = "row";

    innerRow.appendChild(morningDiv);
    innerRow.appendChild(noonDiv);
    innerRow.appendChild(nightDiv);

    let innerCol = document.createElement("div");
    innerCol.classList.add("col");
    innerCol.classList.add("text-center");

    innerCol.appendChild(innerRow);

    let dateH2 = document.createElement("h2");
    dateH2.id = "futureDate1";
    dateH2.className = "placeLocation";
    dateH2.textContent = "Date";
    let hr = document.createElement("hr");
    hr.className = "dottedName";
    let p7 = document.createElement("p");
    p7.id = "future1Desc";
    p7.className = "placeLocation";
    p7.textContent = "Description";

    let innerCol2 = document.createElement("div");
    innerCol2.className = "col";

    innerCol2.appendChild(dateH2);
    innerCol2.appendChild(hr);
    innerCol2.appendChild(p7);

    let outRow = document.createElement("div");
    outRow.classList.add("row");
    outRow.classList.add("pt-2");

    outRow.appendChild(innerCol2);
    outRow.appendChild(innerCol);

    // outer divs of the columns and rows
    let outCol2 = document.createElement("div");
    outCol2.className = "col bgOpacity border-rad opacity py-4 px-5 mb-4 remove-margin";

    outCol2.appendChild(outRow);

    let outCol1 = document.createElement("div");
    outCol1.className = "col-1";
    let outCol3 = document.createElement("div");
    outCol3.className = "col-1"

    let outerMostRow = document.createElement("div");
    outerMostRow.className = "row";

    outerMostRow.appendChild(outCol1);
    outerMostRow.appendChild(outCol2);
    outerMostRow.appendChild(outCol3);

    let container = document.createElement("div");
    container.className = "container";
    container.id = "remove";
    container.appendChild(outerMostRow);
    futureTimes.appendChild(container);
}

{/* <div class="offcanvas-body">
<div id="favoriteCity" class="favoriteBody d-flex align-items-center">
  <div class="container">
    <div class="row">
      <div class="col-10">
        <p class="ps-4 mt-1">Favorite City</p>
      </div>
      <div class="col-2 d-flex align-items-center">
        <span class="material-symbols-outlined">
          close
          </span>
      </div>
    </div>
  </div>
</div>
</div>  */}

function OffCanvasCity(cityName){
  let span = document.createElement("span");
  span.className = "material-symbols-outlined";
  span.textContent = "close";
  
  let col1 = document.createElement("div");
  col1.className = "col-2 d-flex align-items-center";
  
 
  col1.appendChild(span);

  let p = document.createElement("p");
  p.classList.add("ps-4");
  p.classList.add("mt-2");
  p.classList.add("elementPadding");
  p.textContent = cityName;

  let col2 = document.createElement("div");
  col2.className = "col-10";
  col2.appendChild(p);

  col2.addEventListener('click', function (e) {
    SearchCityApi(cityName);
    inject.innerHTML = "";
  })
  col2.setAttribute('data-bs-dismiss', 'offcanvas')

  let row = document.createElement("div");
  row.className = "row my-2";
  row.appendChild(col2);
  row.appendChild(col1);

  let container = document.createElement("div");
  container.className = "container";
  container.appendChild(row);

  
  let innerDiv = document.createElement("div");
  innerDiv.id = cityName.replaceAll(", ", "_");
  innerDiv.classList.add("favoriteBody");
  innerDiv.classList.add("mx-4");
  
  innerDiv.appendChild(row);
  
  let outerDiv = document.createElement("div");
  outerDiv.classList.add("offcanvas-body");
  
  outerDiv.appendChild(innerDiv);
  col1.addEventListener("click", function(e){
    // console.log("Hi");
    removeFav(cityName);
    outerDiv.remove();
  })
  return outerDiv;
}

export { futureTimes, OtherDatesInfo, OffCanvasCity }