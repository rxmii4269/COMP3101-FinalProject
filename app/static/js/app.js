"use strict";

let $currTableRow = $("#FCFS #start");
let curValue = parseInt($currTableRow.text().split("")[1]);
$(".add-row").click(function () {
  if ($("#FCFS").is(".active")) {
    let val = curValue + 1;

    let row = `<tr class="P${val}"> 
                  <td>P${val}</td>
                  <td><input type="number" class="form-control p-0" name="arrivalTime" id="arrTime${val}" min="0" value="${val}"></td> 
                  <td><input id="service${val}" class="form-control p-0" type="number" value="${val}" min="0"></td>
              </tr>`;
    $("#FCFS-table").append(row);
    // let arrivalTime = $(`#execute${curValue}`).val();
    // let serviceTime = $(`#service${curValue}`).text();
    // calculateServiceTime(arrivalTime, serviceTime, curValue);
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

let ctx = $("#visualization");

$("#FCFS-btn").click(function () {
  let readyQueue = [];
  $("#FCFS-table tbody tr td").each(function (index, value) {
    if ($(value).find(".form-control").length) {
      readyQueue.push($(value).find(".form-control").val());
    } else {
      readyQueue.push(value.innerText);
    }
  });
  FCFS(groupByThree(readyQueue));
});

function FCFS(readyQueue) {
  readyQueue.sort((a, b) => a[1] - b[1]);
  addFCFSData(myChart, readyQueue);
}

function groupByThree([a, b, c, ...rest]) {
  if (rest.length === 0) return [[a, b, c].filter((x) => x !== undefined)];
  return [[a, b, c]].concat(groupByThree(rest));
}

function addFCFSData(chart, data) {
  let x_start = 0;
  let x_end = 0;
  data.forEach((info, index) => {
    x_end = index == 0 ? info[2] : parseInt(info[2]) + parseInt(x_start);

    let chartData = {
      label: info[0],
      backgroundColor: `rgba${Math.floor(Math.random() * 255)},${Math.floor(
        Math.random() * 255
      )},${Math.floor(Math.random() * 255)},1)`,
      borderColor: `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
        Math.random() * 255
      )},${Math.floor(Math.random() * 255)},1)`,
      fill: false,
      borderWidth: 15,
      pointRadius: 0,
      data: [
        {
          x: x_start,
          y: 15 - index - 1,
        },
        {
          x: x_end,
          y: 15 - index - 1,
        },
      ],
    };
    x_start = x_end;
    chart.data.datasets.push(chartData);
  });
  chart.update();
}


// eslint-disable-next-line no-undef
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    datasets: [],
  },
  options: {
    animation: {
        easing:"linear"
    },  
    title: {
      display: true,
      text: "First Come First Served (FCFS) Visualization",
      fontFamily: `system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`,
      fontSize: 16,
    },
    legend: {
      display: true,
      labels: {
        padding: 30,
        fontFamily: `system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`,
        fontSize: 16,
      },
    },
    scales: {
      xAxes: [
        {
          type: "linear",
          position: "bottom",
          ticks: {
            beginAtzero: true,
            stepSize: 1,
          },
          scaleLabel:{
            display: true,
            labelString: "Total CPU Cycles taken"
        },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
          },
          ticks: {
            beginAtZero: true,
            max: 15,
            stepSize: 1,
          },
        },
      ],
    },
  },
});
