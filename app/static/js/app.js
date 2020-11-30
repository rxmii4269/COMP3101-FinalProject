"use strict";

var $currTableRow = $("#FCFS #start");
var curValue = parseInt($currTableRow[0].textContent.trim().split("")[1]);
var $second_currTableRow = $("#SJN #second_start");
var second_currValue = parseInt($second_currTableRow[0].textContent.trim().split("")[1]);
var $third_currTableRow = $("#PS #third_start");
var third_currValue = parseInt($third_currTableRow[0].textContent.trim().split("")[1]);
var $fourth_currTableRow = $("#RR #fourth_start");
var fourth_currValue = parseInt($fourth_currTableRow[0].textContent.trim().split("")[1]);
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
              </tr>`;
        $("#SJN-table").append(sec_row);
        second_currValue = sec_val;
        console.log("this works")
        return
    }

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

  if ($("#RR").is(".active")) {
    let fourth_val = fourth_currValue + 1;
    let fourth_row = `<tr class="P${fourth_val}">
                  <td>P${fourth_val}</td>
                  <td><input class="form-control p-0" type="number" value="${fourth_val}"></td>
                  <td><input class="form-control p-0" type="number"></td>
              </tr>`;
    $("#RR-table").append(fourth_row);
    fourth_currValue = fourth_val;
    return
  }

});

$(".remove-row").click(function () {
  if ($("#FCFS").is(".active")) {
    let FCFSTableRows = $("#FCFS-table tr");

    if (FCFSTableRows.length > 2) {
      FCFSTableRows.last().remove();
      curValue -= 1
      return
    }
  }

  if ($("#SJN").is(".active")) {
    let SJNTableRows = $("#SJN-table tr");

    if (SJNTableRows.length > 2) {
      SJNTableRows.last().remove();
      second_currValue -= 1
    return
    }
   }

  if ($("#PS").is(".active")) {
    let PSTableRows = $("#PS-table tr");

    if (PSTableRows.length > 2) {
      PSTableRows.last().remove();
      third_currValue -= 1
    return
    }
    console.log("works");
  }

  if ($("#RR").is(".active")) {
    let RRTableRows = $("#RR-table tr");

    if (RRTableRows.length > 2) {
      RRTableRows.last().remove();
      fourth_currValue -= 1
    return
    }
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

function FCFS(readyQueue) {
  readyQueue.sort((a, b) => a[1] - b[1]);
  addFCFSData(myChart, readyQueue);
}


function groupByThree([a, b, c, ...rest]) {
  if (rest.length === 0) return [[a, b, c].filter((x) => x !== undefined)];
  return [[a, b, c]].concat(groupByThree(rest));
}

function addSJNData(chart, data) {
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
    chart.update();
  });

}


// eslint-disable-next-line no-undef
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    datasets: [],
  },
  options: {
    animation: {
        easing:"easeInElastic"
    },
    title: {
      display: true,
      text: "Shortest Job Next (SJN) Visualization",
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
            labelString: "Total Service Time Taken",
            fontSize: 16,
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
