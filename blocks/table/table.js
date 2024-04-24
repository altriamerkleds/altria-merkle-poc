async function createTableHeader(table){
    let tr=document.createElement("tr");
    let sno=document.createElement("th");sno.appendChild(document.createTextNode("S.No"));
    let country=document.createElement("th");country.appendChild(document.createTextNode("Countries"));
    let continent=document.createElement("th");continent.appendChild(document.createTextNode("Continent"));
    let capital=document.createElement("th");capital.appendChild(document.createTextNode("Capital"));
    let abbr=document.createElement("th");abbr.appendChild(document.createTextNode("Abbreviation"));
    tr.append(sno);tr.append(country);tr.append(capital);tr.append(continent);tr.append(abbr);
    table.append(tr);
}
async function createTableRow(table,row,i){
    let tr=document.createElement("tr");
    let sno=document.createElement("td");sno.appendChild(document.createTextNode(i));
    let country=document.createElement("td");country.appendChild(document.createTextNode(row.Country));
    let continent=document.createElement("td");continent.appendChild(document.createTextNode(row.Capital));
    let capital=document.createElement("td");capital.appendChild(document.createTextNode(row.Continent));
    let abbr=document.createElement("td");abbr.appendChild(document.createTextNode(row.Abbreviation));
    tr.append(sno);tr.append(country);tr.append(continent);tr.append(capital);tr.append(abbr);
    table.append(tr);
}

async function createSelectMap(jsonURL){
    const optionsMap=new Map();
    const { pathname } = new URL(jsonURL);

    const resp = await fetch(pathname);
    optionsMap.set("all","All Countries");optionsMap.set("asia","Asia");optionsMap.set("europe","Europe");optionsMap.set("africa","Africa");optionsMap.set("america","America");optionsMap.set("australia","Australia");
    const select=document.createElement('select');
    select.id = "region";
    select.name="region";
    optionsMap.forEach((val,key) => {
        const option = document.createElement('option');
        option.textContent = val;
        option.value = key;
        select.append(option);
      });

     const div=document.createElement('div');
     div.classList.add("region-select");
     div.append(select);
    return div;
}
async function createTable(jsonURL,val) {

    let  pathname = null;
    if(val){
        pathname=jsonURL;
    }else{
        pathname= new URL(jsonURL);
    }

    const resp = await fetch(pathname);
    const json = await resp.json();
    console.log("=====JSON=====> {} ",json);

    const table = document.createElement('table');
    createTableHeader(table);
    json.data.forEach((row,i) => {

        createTableRow(table,row,(i+1));


    });

    return table;
}

export default async function decorate(block) {
    const countries = block.querySelector('a[href$=".json"]');
    const parentDiv=document.createElement('div');
    parentDiv.classList.add('countries-block');

    if (countries) {
        parentDiv.append(await createSelectMap(countries.href));
        parentDiv.append(await createTable(countries.href,null));
        countries.replaceWith(parentDiv);

    }
    const dropdown=document.getElementById('region');
      dropdown.addEventListener('change', () => {
        let url=countries.href;
        if(dropdown.value!='all'){
            url=countries.href+"?sheet="+dropdown.value;
            url=countries.href+"?sheet="+dropdown.value;
        }
        const tableE=parentDiv.querySelector(":scope > table");
        let promise = Promise.resolve(createTable(url,dropdown.value));
        promise.then(function (val) {
            tableE.replaceWith(val);
        });
      });
  }