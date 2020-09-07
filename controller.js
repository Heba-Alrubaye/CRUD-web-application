window.addEventListener("load",init);
function init(){
    
    clearAll();
    loadId();
    showTotal();
    bindEvents();  
}

function clearAll(){

    /* this function clears the contents of the form except the ID (since ID is auto generated)*/ 
    let it = new Item();
    for (let k in it){
        if (k != 'id' && k != 'isMarked'){
        document.querySelector('#'+k).value = "";
        }
    }
}

let auto = autoGen();

function loadId(){
    /* this function automatically sets the value of ID */
    document.querySelector('#id').innerText = auto.next().value;
    

}

function showTotal(){
    /* this function populates the values of #total, #mark and #unmark ids of the form */

    it = itemOperations.items.length;
    itMark = itemOperations.countTotalMarked();
    itUmark = it - itMark
    
document.querySelector('#total').innerText = it;
document.querySelector('#mark').innerText = itMark;
document.querySelector('#unmark').innerText = itUmark;
}

function bindEvents(){
    
    document.querySelector('#remove').addEventListener('click',deleteRecords);
    document.querySelector('#add').addEventListener('click',addRecord);
    document.querySelector('#update').addEventListener('click',updateRecord)
    document.querySelector('#exchange').addEventListener('change',getExchangerate)
}

function deleteRecords(){
    /* this function deletes the selected record from itemOperations and prints the table using the function printTable*/
    
    var it = itemOperations.remove();
    printTable(it);
}



function addRecord(){
    /* this function adds a new record in itemOperations and then calls printRecord(). showTotal(), loadId() and clearAll()*/
    let it = new Item()
    for (let k in it){
        if (k==='isMarked'){
            continue;
        }
        if(k==='id'){
            it[k]=document.querySelector('#'+k).innerText;
            continue;    
        }
        it[k]=document.querySelector('#'+k).value;
    }
    itemOperations.add(it)
    printRecord(it)
    showTotal()
    loadId()
    clearAll()

}
function edit(){
    /*this function fills (calls fillFields()) the form with the values of the item to edit after searching it in items */ 

    let id = this.getAttribute('data-itemid');
    it = itemOperations.search(id);
    fillFields(it);

     
}
function fillFields(itemObject){
    /*this function fills the form with the details of itemObject*/
    for (let k in itemObject){
        if (k==='isMarked'){
            continue;
        }
        document.querySelector('#'+k).value = itemObject[k];
    }

}
function createIcon(className,fn, id){
 /* this function creates icons for edit and trash for each record in the table*/
    // <i class="fas fa-trash"></i>
    // <i class="fas fa-edit"></i>
    var iTag = document.createElement("i");
    iTag.className = className;
    iTag.addEventListener('click',fn);
    iTag.setAttribute("data-itemid", id) ;

    return iTag;
}


function updateRecord(){
    /*this function updates the record that is edited and then prints the table using printTable()*/
    
    for (let k in it){
        if (k==='isMarked'){
            continue;  
        }
        it[k]=document.querySelector('#'+k).value;
    }
    printTable(itemOperations.items)
}

function trash(){
    /*this function toggles the color of the row when its trash button is selected and updates the marked and unmarked fields */
    let id = this.getAttribute('data-itemid');
    itemOperations.markUnMark(id);
    showTotal();
    let tr = this.parentNode.parentNode;
    tr.classList.toggle('alert-danger');
    
}

function printTable(items){
   /* this function calls printRecord for each item of items and then calls the showTotal function*/
   var tbody = document.querySelector('#items');
   tbody.innerHTML="";
   items.forEach((it) => printRecord(it));
   showTotal();
}
function printRecord(item){
    var tbody = document.querySelector('#items');
    var tr = tbody.insertRow();
    var index = 0;
    for(let key in item){
        if(key=='isMarked'){
            continue;
        }
        let cell = tr.insertCell(index);
        cell.innerText = item[key] ;
        index++;
    }
    var lastTD = tr.insertCell(index);
    lastTD.appendChild(createIcon('fas fa-trash mr-2',trash,item.id));
    lastTD.appendChild(createIcon('fas fa-edit',edit,item.id));
}

async function getExchangerate(){
    /* this function makes an AJAX call to http://apilayer.net/api/live to fetch and display the exchange rate for the currency selected*/
    let price = document.querySelector('#price').value
    let exchange = document.querySelector('#exchange')
    let currency = exchange.options[exchange.selectedIndex].text
    console.log(currency);
    let response = await fetch('http://api.currencylayer.com/live?access_key=ba1af5bd67dced5425c035cbc78f15f1&format=1&currencies='+currency)
.then(res => res.json())
.then(data => {
    console.log(data.quotes);
    let exchangerate= data.quotes['USD'+currency]
    let newprice = price * exchangerate
    document.querySelector('#exrate').innerText ='Exchange Rate: '+ exchangerate +',  New Price: '+ newprice 

})
 .catch((e)=> {
     console.log(e);
    document.querySelector('#exrate').innerText='Unknwon'
})}