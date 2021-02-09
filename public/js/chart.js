window.onload = () => {
      
  var days = [];
  for (var i = 1; i < 61; i++) {
    days.push(i);
  }
  var applications = [];
  for (var i = 0; i < 60; i++) {
    var num = Math.floor(Math.random() * 11)
    applications.push(num);
  }

  $.get( "/api/applications/", data => {
    console.log(data)
    displayApps(data)
    displayResp(data)
    displayInt(data)
    formatData(data)
  });

  function displayApps(data) {
    $('#apps-num').text(data.length);
  }

  function displayResp(data) {
    var count = 0;
    for (var i = 0; i < data.length; i++) {
      var response = data[i].status;
      if (response === "Awaiting Response") {
        continue;
      } else {
        count++;
      }
      console.log(response);
    } 
    $('#responses').text(count);
  }

  function displayInt(data) {
    var count = 0;
    for (var i = 0; i < data.length; i++) {
      var response = data[i].status;
      if (response === "Interview") {
        count++;
      }
      console.log(response);
    } 
    $('#interviews').text(count);
  }

  function formatData(data) {
    var tracker = {};
    for (var i = 0; i < data.length; i++) {
      var rawDate = data[i].createdAt.toString();
      var formatDate = rawDate.substr(5, 5);
      if (tracker[formatDate]) {
        tracker[formatDate] = tracker[formatDate] + 1;
      } else {
        tracker[formatDate] = 1;
      }
    }
    var chartX = Object.keys(tracker)
    var chartY = chartX.map(function(keys) {
      return tracker[keys];
    })

    var data = {
      labels: chartX,
      datasets: [{
        label: "Applications By Day",
        backgroundColor: 'rgb(175, 107, 88)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(85, 96, 82)',
        data: chartY,
      }]
    };
    var options = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          stacked: true,
          gridLines: {
            display: true,
            color: 'rgb(85, 96, 82)'
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          }
        }]
      }
    }
    Chart.Bar('chart', {
      options: options,
      data: data
    })
  }

  


  
}