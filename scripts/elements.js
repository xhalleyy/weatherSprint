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
    outCol2.className = "col bgOpacity border-rad opacity py-4 px-5 mb-4";

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

export { futureTimes, OtherDatesInfo}
/* <div id="futureTimes">
<div class="container">
  <div class="row">
    <div class="col-1"></div>
    <div class="col whiteBG border-rad layout pt-4 px-5" style="opacity: .7;">
      <div class="row pt-2">
        <div class="col ">
          <h id="futureDate1" class="placeLocation">Date</h2>
          <p id="future1Desc" class="placeLocation"><hr class="dottedLine">Description</p>
        </div>
        <div class="col text-center">
          <div class="row">
            <div class="col timeText">8am
              <p id="morning1Icon" class="iconFont curr-times-font" ></p>
              <h2 id="date1AMTemp" class="timeTempText"></h2>
            </div>
            <div class="col timeText">noon
              <p id="noon1Icon" class="iconFont curr-times-font" ></p>
              <h2 id="date1Noon" class="timeTempText"></h2>
            </div>
            <div class="col timeText">8pm
              <p id="night1Icon" class="iconFont curr-times-font" ></p>
              <h2 id="date1PM" class="timeTempText"></h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-1"></div>
  </div>
</div>
</div> */

export function OffCanvasCity(cityName){
  let p = document.createElement("p");
  p.classList.add("ps-4");
  p.classList.add("mt-1");
  p.textContent = cityName;

  let innerDiv = document.createElement("div");
  innerDiv.id = cityName.replaceAll(", ", "_");
  innerDiv.classList.add("favoriteBody");
  // innerDiv.classList.add("d-flex");
  // innerDiv.classList.add("align-items-center");

  innerDiv.appendChild(p);

  let outerDiv = document.createElement("div");
  outerDiv.classList.add("offcanvas-body");
  outerDiv.setAttribute('data-bs-dismiss', 'offcanvas')

  outerDiv.appendChild(innerDiv);
  return outerDiv;
}


{/* <div class="offcanvas-body">
        <div id="favoriteCity" class="favoriteBody d-flex align-items-center">
          <p class="ps-4 mt-1">Favorite City</p>
        </div>
      </div> */}