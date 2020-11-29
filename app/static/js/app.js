"use strict";

let $currTableRow = $("#FCFS #start");
let curValue = parseInt($currTableRow.text().split("")[1]);
$(".add-row").click(function () {
  if ($("#FCFS").is(".active")) {
    let val = curValue + 1;
    
    
    let row = `<tr class="P${val}"> 
                  <td>P${val}</td>
                  <td id="">${val}</td>
                  <td><input id="execute${val}" class="form-control p-0" type="number" value="3"></td> 
                  <td id="service${val}"></td>
              </tr>`;
    $("#FCFS-table").append(row);
    let arrivalTime = $(`#execute${curValue}`).val();
    let serviceTime = $(`#service${curValue}`).text();
    calculateServiceTime(arrivalTime,serviceTime,curValue);
    curValue = val;
    

  } else if ($("#SJN").is(".active")) {
    console.log($("#SJN-table"));
  }
});

let calculateServiceTime = (arrivalTime,prevServiceTime,curValue) =>{
    let serviceTime = parseInt(arrivalTime) + parseInt(prevServiceTime);
    console.log(serviceTime);
    $(`#service${curValue+1}`).text(serviceTime);
}

$(".remove-row").click(function () {
  if ($("#FCFS").is(".active")) {
    let FCFSTableRows = $("#FCFS-table tr");

    if (FCFSTableRows.length > 2) {
      FCFSTableRows.last().remove();

    }
  } else if ($("#SJN").is(".active")) {
    console.log("works");
  }
});

let ctx = $("#visualization"); 

$("#FCFS-btn").click(function () {
   $("#FCFS-table tbody tr td").each(function(index,value){

    
    if ($(value).find('.form-control').length){
        console.log($(value).find('.form-control').val());
    }
    else{
        console.log(value.innerText);
    }
   });
});

// eslint-disable-next-line no-undef
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
      datasets: [
      {

          label: 'Scatter Dataset',
          backgroundColor: "rgba(246,156,85,1)",
          borderColor: "rgba(246,156,85,1)",
          fill: false,
          borderWidth : 15,
          pointRadius : 0,
          data: [
              {
                  x: 0,
                  y: 9
              }, {
                  x: 9,
                  y: 9
              }
          ]
      },
      {
          backgroundColor: "rgba(208,255,154,1)",
          borderColor: "rgba(208,255,154,1)",
          fill: false,
          borderWidth : 15,
          pointRadius : 0,
          data: [
              {
                  x: 3,
                  y: 7
              }, {
                  x: 5,
                  y: 7
              }
          ]
      },
      {

          label: 'Scatter Dataset',
          backgroundColor: "rgba(246,156,85,1)",
          borderColor: "rgba(246,156,85,1)",
          fill: false,
          borderWidth : 15,
          pointRadius : 0,
          data: [
              {
                  x: 5,
                  y: 5
              }, {
                  x: 10,
                  y: 5
              }
          ]
      },
      {
          backgroundColor: "rgba(208,255,154,1)",
          borderColor: "rgba(208,255,154,1)",
          fill: false,
          borderWidth : 15,
          pointRadius : 0,
          data: [
              {
                  x: 10,
                  y: 3
              }, {
                  x: 13,
                  y: 3
              }
          ]
      }
      ]
  },
  options: {
      legend : {
          display : true
      },
      scales: {
          xAxes: [{
              type: 'linear',
              position: 'bottom',
              ticks : {
                  beginAtzero :true,
                  stepSize : 1
              }
          }],
          yAxes : [{
              scaleLabel : {
                  display : true
              },
              ticks : {
                  beginAtZero :true,
                  max : 10
              }
          }]
      }
  },
});



function FCFS(readyQueue) {

}
