"use strict";
var $third_currTableRow = $("#PS #third_start");
var third_currValue = parseInt($third_currTableRow[0].textContent.trim().split("")[1]);


$(".add-row").click(function () {
   if ($("#PS").is(".active")) {
        let third_val = third_currValue + 1;
        let third_row = `<tr class="P${third_val}">
                  <td>P${third_val}</td>
                  <td><input class="form-control p-0" type="number" value="${third_val}"></td>
                  <td><input class="form-control p-0" type="number"></td>
                  <td><input class="form-control p-0" type="number"></td>
                  <td><input class="form-control p-0" type="number"></td>
              </tr>`;
        $("#PS-table").append(third_row);
        third_currValue =  third_val;
        console.log("this works")
        return
   }
});

$(".remove-row").click(function () {
  if ($("#PS").is(".active")) {
    let PSTableRows = $("#PS-table tr");

    if (PSTableRows.length > 2) {
      PSTableRows.last().remove();
    }
  } else if ($("#RR").is(".active")) {
    console.log("works");
  }
});

let ctx = $("#visualization");

$("#PS-btn").click(function () {
  let readyQueue = [];
  
  $("#PS-table tbody tr td").each(function (index, value) {
    if ($(value).find(".form-control").length) {
      readyQueue.push($(value).find(".form-control").val());
    } else {
      readyQueue.push(value.innerText);
    }
  });
    findNextIndexWithPriority(PS(groupByFour(readyQueue))) ;
});


function findNextIndexWithPriority(currentIndex, priorities) {
  var currentPriority = 1000000;
  if (currentIndex != -1) currentPriority = priorities[currentIndex];
  var resultPriority = 0;
  var resultIndex = -1;
  var samePriority = false;
  var areWeThereYet = false;

  $.each(priorities, function (key, value) {
    var changeInThisIteration = false;

    if (key == currentIndex) {
      areWeThereYet = true;
      return true;
    }
    if (value <= currentPriority && value >= resultPriority) {
      if (value == resultPriority) {
        if (currentPriority == value && !samePriority) {
          samePriority = true;
          changeInThisIteration = true;
          resultPriority = value;
          resultIndex = key;                            
        }                        
      }
      else if (value == currentPriority) {
        if (areWeThereYet) {
          samePriority = true;
          areWeThereYet = false;
          changeInThisIteration = true;
          resultPriority = value;
          resultIndex = key;
        }
      }
      else {
        resultPriority = value;
        resultIndex = key;
      }

      if (value > resultPriority && !changeInThisIteration)
        samePriority = false;
    }
  });
  return resultIndex;
}

function findNextIndex(currentIndex, array) {
  var currentTime = 0;
  if (currentIndex != -1) currentTime = array[currentIndex];            
  var resultTime = 1000000;
  var resultIndex = -1;
  var sameTime = false;
  var areWeThereYet = false;

  $.each(array, function (key, value) {
    var changeInThisIteration = false;

    if (key == currentIndex) {
      areWeThereYet = true;
      return true;
    }
    if (value >= currentTime && value <= resultTime) {
      if (value == resultTime) {                        
        if (currentTime == value && !sameTime) {
          sameTime = true;
          changeInThisIteration = true;
          resultTime = value;
          resultIndex = key;                            
        }                        
      }
      else if (value == currentTime) {
        if (areWeThereYet) {
          sameTime = true;
          areWeThereYet = false;
          changeInThisIteration = true;
          resultTime = value;
          resultIndex = key;
        }
      }
      else {
        resultTime = value;
        resultIndex = key;
      }

      if (value < resultTime && !changeInThisIteration)
        sameTime = false;
    }
  });
  return resultIndex;
}

function PS(readyQueue) {
  readyQueue.sort((a, b) => a[1] - b[1]);
  addPSData(myChart, readyQueue);
}

function groupByFour([a, b, c, d,...rest]) {
  if (rest.length === 0) return [[a, b, c, d].filter((x) => x !== undefined)];
  return [[a, b, c, d]].concat(groupByFour(rest));
}

function addPSData(chart, data) {
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
      text: "Priority Scheduling (PS) Visualization",
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