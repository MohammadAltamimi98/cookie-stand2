'use strict';
let workingHours=['6am','7am','8am','9am','10am', '11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm', 'Daily location total'];
let tableEL=document.createElement('table');
let theParent=document.getElementById('tablePlace');
theParent.appendChild(tableEL);


function getRandomIntInclusive(min, max) {
  return (Math.floor(Math.random() * (max - min + 1) + min));
}


let locationGloblal=[];


function Storelocation(location,minCustomer,maxCustomer,AvgCookiePerSale)
{
  this.location=location;
  this.minCustomer=minCustomer;
  this.maxCustomer=maxCustomer;
  this.AvgCookiePerSale=AvgCookiePerSale;
  this.totalCookiesPerDay=0;
  this.randomNumberCustomersPerHour=[];
  this.avgSalePerHour=[];
  locationGloblal.push(this);

}

Storelocation.prototype.getRandomCustomer= function()
{
  let randomCustomer;
  for (let i=0;i<workingHours.length;i++){
    randomCustomer = getRandomIntInclusive(this.minCustomer,this.maxCustomer);
    this.randomNumberCustomersPerHour.push(randomCustomer);
  }};



Storelocation.prototype.calSalePerHour=function(){
  let amountSoldPerHour = 1;
  for (let i=0;i<workingHours.length;i++)
  {

    amountSoldPerHour= Math.ceil(this.AvgCookiePerSale*this.randomNumberCustomersPerHour[i]);
    this.avgSalePerHour.push(amountSoldPerHour);
  }
};
Storelocation.prototype.innerData=function (){
  // for(let i=0;i<locationGloblal.length;i++){
  //   let newRows=document.createElement('tr');
  //   tableEL.appendChild(newRows);
  //   for(let j=0;j<workingHours.length+2;j++){

  //     if (j===0){
  //       let newCells=document.createElement('td');
  //       newRows.appendChild(newCells);
  //       newCells.textContent=locationGloblal[i].location;
  //     } else if (j<15){
  //       let newCells=document.createElement('td');
  //       newRows.appendChild(newCells);
  //       newCells.textContent=locationGloblal[i].avgSalePerHour[j-1];
  //     } else if (j===15){
  //       let newCells=document.createElement('td');
  //       newRows.appendChild(newCells);
  //       newCells.textContent=locationGloblal[i].totalCookiesPerDay;
  //     }
  //   }
  let newRow=document.createElement('tr');
  tableEL.appendChild(newRow);
  let tdEL=document.createElement('td');
  tdEL.textContent=this.location;
  newRow.appendChild(tdEL);

  for (let i=0;i<workingHours.length;i++){
    if((workingHours.length-1)===i){
      let tdEL=document.createElement('td');
      tdEL.textContent = this.totalCookiesPerDay;
      newRow.appendChild(tdEL);
    }

    else{
      let tdEL=document.createElement('td');
      tdEL.textContent=this.avgSalePerHour[i];
      this.totalCookiesPerDay=this.totalCookiesPerDay+this.avgSalePerHour[i];
      newRow.appendChild(tdEL);
    }

  }




  // }

};



//header
function header(){
  let headerEL=document.createElement('tr');
  tableEL.appendChild(headerEL);

  let headerData=document.createElement('th');

  headerData.textContent='Location';
  headerEL.appendChild(headerData);


  for (let i=0;i<workingHours.length;i++){
    headerData=document.createElement('th');
    headerData.textContent=`${workingHours[i]}`;
    headerEL.appendChild(headerData);
  }

  // let headerTotal=document.createElement('th');
  // headerEL.appendChild(headerTotal);
  // headerTotal.textContent='Daily location total';



}
header();









const seattle= new Storelocation('seattle',23,65,6.3);
const tokyo= new Storelocation('tokyo',3,24,1.2);
const dubai= new Storelocation('dubai',11,38,3.7);
const paris= new Storelocation('paris',20,38,2.3);
const lima= new Storelocation('lima',2,16,4.6);

// // //console.log(seattle);
seattle.getRandomCustomer();
seattle.calSalePerHour();
seattle.innerData();

// // //console.log(tokyo);
tokyo.getRandomCustomer();
tokyo.calSalePerHour();
tokyo.innerData();

// //console.log(dubai);
dubai.getRandomCustomer();
dubai.calSalePerHour();
dubai.innerData();

// //console.log(paris);
paris.getRandomCustomer();
paris.calSalePerHour();
paris.innerData();
// //console.log(lima);
lima.getRandomCustomer();
lima.calSalePerHour();
lima.innerData();






function footerEl1(){



  let footerEL=document.createElement('tr');
  tableEL.appendChild(footerEL);
  let footerData=document.createElement('th');
  footerData.textContent='Totals';
  footerEL.appendChild(footerData);



  // let total=0;
  let sum=0;
  for (let i=0;i<workingHours.length; i++){
    let footerDataTh = document.createElement('th');

    for(let j=0;j<locationGloblal.length;j++){
      if((workingHours.length-1)===i){
        sum =sum + locationGloblal[j].totalCookiesPerDay;

      }
      else{
        sum=sum + locationGloblal[j].avgSalePerHour[i];

      }

    }
    // footerData=document.createElement('th');
    // footerEL.appendChild(footerData);

    footerDataTh.textContent=sum;
    footerEL.appendChild(footerDataTh);
    // total=total+sum;
    sum=0;

  }
  // console.log(locationGloblal);
  // for(let i=0;i<workingHours.length+2;i++){
  //   if (i===15){
  //     let footerData=document.createElement('th');
  //     footerEL.appendChild(footerData);
  //     footerData.textContent=total;}

  // }
}
footerEl1();


// Form elements
let storeform=document.getElementById('storeform');
// let formsection=document.getElementById('formsection');
// formsection.appendChild(storeform);

storeform.addEventListener('submit', addNewBranch);
function addNewBranch(event)
{
  event.preventDefault();

  let locationnew=event.target.locationnew.value;
  let mincust=event.target.mincust.value;
  let maxcust=event.target.maxcust.value;
  let avgsale=event.target.avgsale.value;
  let newlocation= new Storelocation(locationnew,mincust,maxcust,avgsale);
  newlocation.getRandomCustomer();
  newlocation.calSalePerHour();
  newlocation.innerData();
}

