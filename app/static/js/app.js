"use strict";

let $currTableRow = $("#FCFS #start");
let curValue = parseInt($currTableRow.text().split("")[1]);
$(".add-row").click(function () {
  if ($("#FCFS").is(".active")) {
    let val = curValue + 1;
    let row = `<tr> 
                  <td>P${val}</td>
                  <td><input class="form-control p-0" type="number" value="${val}"></td>
                  <td><input class="form-control p-0" type="number"></td> 
              </tr>`;
    $("#FCFS-table").append(row);
    curValue = val;
  } else if ($("#SJN").is(".active")) {
    console.log($("#SJN-table"));
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

function FCFS(readyQueue) {}
