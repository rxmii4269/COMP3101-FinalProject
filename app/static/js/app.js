"use strict";

let $currTableRow = $("#FCFS #start");
let curValue = parseInt($currTableRow.text().split("")[1]);
let $second_currTableRow = $("#SJN #second_start");
let second_currValue = parseInt($second_currTableRow[0].textContent.trim().split("")[1]);
$(".add-row").click(function () {
  if ($("#FCFS").is(".active")) {
    let val = curValue + 1;
    let row = `<tr class="P${val}"> 
                  <td>P${val}</td>
                  <td><input class="form-control p-0" type="number" value="${val}"></td>
                  <td><input class="form-control p-0" type="number"></td> 
              </tr>`;
    $("#FCFS-table").append(row);
    curValue = val;
    return
  }

  if ($("#SJN").is(".active")) {
        let sec_val = second_currValue + 1;
        let sec_row = `<tr class="P${sec_val}">
                  <td>P${sec_val}</td>
                  <td><input class="form-control p-0" type="number" value="${sec_val}"></td>
                  <td><input class="form-control p-0" type="number"></td>
                  <td><input class="form-control p-0" type="number"></td>
              </tr>`;
        $("#SJN-table").append(sec_row);
        second_currValue = sec_val;
        console.log("this works")
        return
    }
});

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
    $("#FCFS-table tbody tr").each(function(){
        $(this).each(function(){
            
            console.log($("input[type='number']").val());
        });
    });
});


$("#SJN-btn").click(function (){
    $("#SJN-table tbody tr").each(function(){
        $(this).each(function(){
            console.log($("input[type = 'number']").val());
        });
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
