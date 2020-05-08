

$(document).ready(function () {


  const test = false;


  const now = moment().format('MMMM Do YYYY');


  let currentHr24 = moment().format('H');
  let currentHr12 = moment().format('h');


  if (test) {
    currentHr24 = 13;
    currentHr12 = 1;
  }

  let $dateHeading = $('#currentDay');
  $dateHeading.text(now);


  const saveIcon = "./images/save-regular.svg";


  let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

  if (test) { console.log(storedPlans); }


  if (storedPlans !== null) {
    planTextArr = storedPlans;
  } else {


    planTextArr = new Array(9);
    planTextArr[4] = "";
  }

  if (test) { console.log("full array of planned text", planTextArr); }


  let $plannerDiv = $('#plannerContainer');

  $plannerDiv.empty();

  if (test) { console.log("current time", curr); }



  for (let hour = 9; hour <= 17; hour++) {

    let index = hour - 9;


    let $rowDiv = $('<div>');
    $rowDiv.addClass('row');
    $rowDiv.addClass('plannerRow');
    $rowDiv.attr('hour-index', hour);


    let $col2TimeDiv = $('<div>');
    $col2TimeDiv.addClass('col-md-2');


    const $timeBoxSpn = $('<span>');

    $timeBoxSpn.attr('class', 'timeBox');


    let displayHour = 0;
    let ampm = "";
    if (hour > 12) {
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }


    $timeBoxSpn.text(`${displayHour} ${ampm}`);


    $rowDiv.append($col2TimeDiv);
    $col2TimeDiv.append($timeBoxSpn);

    let $dailyPlan = $('<input>');

    $dailyPlan.attr('id', `input-${index}`);
    $dailyPlan.attr('hour-index', index);
    $dailyPlan.attr('type', 'text');
    $dailyPlan.attr('class', 'dailyPlan');


    $dailyPlan.val(planTextArr[index]);


    let $col9IptDiv = $('<div>');
    $col9IptDiv.addClass('col-md-9');


    $rowDiv.append($col9IptDiv);
    $col9IptDiv.append($dailyPlan);


    let $col1SaveDiv = $('<div>');
    $col1SaveDiv.addClass('col-md-1');

    let $saveBtn = $('<i>');
    $saveBtn.attr('id', `saveid-${index}`);
    $saveBtn.attr('save-id', index);
    $saveBtn.attr('class', "fa fa-save saveIcon");


    $rowDiv.append($col1SaveDiv);
    $col1SaveDiv.append($saveBtn);


    updateRowColor($rowDiv, hour);


    $plannerDiv.append($rowDiv);
  };


  function updateRowColor($hourRow, hour) {

    if (test) { console.log("rowColor ", currentHr24, hour); }

    if (hour < currentHr24) {

      if (test) { console.log("lessThan"); }
      $hourRow.css("background-color", "lightgrey")
    } else if (hour > currentHr24) {
      if (test) { console.log("greaterthan"); }
      $hourRow.css("background-color", "green")
    } else {
      if (test) { console.log("equal"); }
      $hourRow.css("background-color", "red")
    }
  };


  $(document).on('click', 'i', function (event) {
    event.preventDefault();

    if (test) { console.log('click pta before ' + planTextArr); }

    let $index = $(this).attr('save-id');

    let inputId = '#input-' + $index;
    let $value = $(inputId).val();

    planTextArr[$index] = $value;


    if (test) { console.log('value ', $value); }
    if (test) { console.log('index ', $index); }
    if (test) { console.log('click pta after ' + planTextArr); }


    $(`#saveid-${$index}`).removeClass('shadowPulse');
    localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
  });


  $(document).on('change', 'input', function (event) {
    event.preventDefault();
    if (test) { console.log('onChange'); }
    if (test) { console.log('id', $(this).attr('hour-index')); }



    let i = $(this).attr('hour-index');

    $(`#saveid-${i}`).addClass('shadowPulse');
  });
});