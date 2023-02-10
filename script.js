// Set seat variables
var numberOfSeats = $('#range--seats').val(); //number of seats
var totalSeatsCost = 0;
var extraSeat = 995;
var seat = 2250;

// Set Ultra Perfomance variables
var ultra_liscence = "none";
var subscription = 1250;
var subscription_extra = 995;
var total_subscription_cost = 0;
var annual_subscription_cost = 0;
var buyOnce = 5000;
var buyOnce_extra = 2500;
var total_buyOnce_cost = 0;

// Discount 
var discount = 0.7;
var total_cost = 0; // Value stored in data attribute of total
var feb_discount = 0;

var discount_switch = true; // Turn discount on and off

/* Configure sliders
----------------------------------------------------------------- */

var $element = $('input[type="range"]');
var $handle;

$('#totals').hide();

$element
  .rangeslider({
    polyfill: false,
    onInit: function() {
      $handle = $('.rangeslider__handle', this.$range);
      updateHandle($handle[0], this.value);
    }
  })
  .on('input', function() {
    updateHandle($handle[0], this.value);
  });

function updateHandle(el, val) {
  el.textContent = val;
}

/* Functions
----------------------------------------------------------------- */

//Display cost of seats function
function showSeatCost() {
  $('.output--lisence-cost').html("$" + totalSeatsCost);
  $('.output--lisence-cost').attr('data-total-cost', totalSeatsCost);
}

//Display discount cost
function update_feb_discount() {

  //console.log(total_cost);
  if (discount_switch == true) { // Turn Feb discount ON
    
    if (ultra_liscence == "subscription") {
      total_cost = total_subscription_cost;
    } else if (ultra_liscence == "buyOnce") {
      total_cost = total_buyOnce_cost;
    } else if (ultra_liscence == "none") {
      total_cost = totalSeatsCost;
    }

    //console.log(total_cost);

    $('.output--lisence-cost').attr('data-total-cost', total_cost);

    feb_discount = discount * total_cost;
    feb_discount = feb_discount.toFixed(0); // rounds to 2 decimal places

    //console.log('Total Cost:',total_cost); 
    //console.log('Discount:',feb_discount);

    $('.output--discount').html("$" + feb_discount);
    $('.output--discount').attr('data-discount-cost', feb_discount);
    add_commas();
  } else if (discount_switch == false) { // Turn Feb discount OFF
    $('#discount-cost').hide();
    $('.output--lisence-cost').removeClass('strikethrough');
  }
}

//Display annual SUBSCRIPTION cost based on number of seats
$('#annual-sub-cost').hide();

function show_hide_annual_subscription_cost() { // Only shows if seats is greater than zero
  if (numberOfSeats != 0 && ultra_liscence == "subscription") {
    annual_subscription_cost = subscription + ((numberOfSeats - 1) * subscription_extra);
    $('.output--annual-sub').html("$" + annual_subscription_cost);
    $('#annual-sub-cost').show('fade');
    add_commas();
  } else {
    $('.output--annual-sub').html("$0");
    $('#annual-sub-cost').hide('fade');
    add_commas();
  }
}

//Display Ultra Performance SUBSCRIPTIONS cost based on number of seats
function update_total_subscription_cost() {
  if (numberOfSeats > 1) {
    total_subscription_cost = subscription + ((numberOfSeats - 1) * subscription_extra) + totalSeatsCost;
    $('.output--lisence-cost').html("$" + total_subscription_cost);
    $('.output--lisence-cost').attr('data-total-cost', total_subscription_cost);
    add_commas();
  } else if (numberOfSeats == 1) {
    total_subscription_cost = seat + subscription;
    $('.output--lisence-cost').html("$" + total_subscription_cost);
    $('.output--lisence-cost').attr('data-total-cost', total_subscription_cost);
  } else {
    $('.output--lisence-cost').html("$0");
  }
}

//Display Ultra Performance BUY ONCE cost based on number of seats
function update_total_buyOnce_cost() {
  if (numberOfSeats != 0) {
    total_buyOnce_cost = buyOnce + ((numberOfSeats - 1) * buyOnce_extra) + totalSeatsCost;
    $('.output--lisence-cost').html("$" + total_buyOnce_cost);
    $('.output--lisence-cost').attr('data-total-cost', total_buyOnce_cost);
    add_commas();
  } else {
    $('.output--lisence-cost').html("$0");
  }
}

//Updte Ultra Performance cost depending on which option is selected
function update_ultra_cost() {
  // Change Ultra Performance cost on slider value change
  if (ultra_liscence == "subscription") {
    update_total_subscription_cost();
    show_hide_annual_subscription_cost();
    add_commas();
  } else if (ultra_liscence == "buyOnce") {
    update_total_buyOnce_cost();
    add_commas();
  } else if (ultra_liscence == "none") {
    $('.output--lisence-cost').html("$" + totalSeatsCost);
    add_commas();
  }

}

/* Event functions / Calculates and displays cost of seats using range slider
----------------------------------------------------------------- */
$('#range--seats').on("change", function() {
  numberOfSeats = $(this).val();
  if (numberOfSeats > 1) {
    $('.output--lisence-cost').removeAttr('data-total-cost', null);
    totalSeatsCost = seat + ((numberOfSeats - 1) * extraSeat);
    showSeatCost();
    update_ultra_cost(); //If ultra option selected
    update_feb_discount();
    $('#totals').show('fade');
  } else if (numberOfSeats == 1) {
    $('.output--lisence-cost').removeAttr('data-total-cost', null);
    totalSeatsCost = seat;
    showSeatCost();
    update_ultra_cost(); //If ultra option selected
    update_feb_discount();
    $('#totals').show('fade');
  } else {
    $('.output--lisence-cost').removeAttr('data-total-cost', null);
    totalSeatsCost = 0;
    showSeatCost();
    update_ultra_cost();
    update_feb_discount();
    $('#totals').hide('fade');
  }
}).trigger("change");

/* Radio buttons for Ultra Performance
----------------------------------------------------------------- */
$('input:radio[name="toggler--ultra"]').change(
  function() {

    if ($(this).is(':checked') && $(this).val() == subscription) {
      $('.output--lisence-cost').removeAttr('data-total-cost');
      ultra_liscence = "subscription";
      update_total_subscription_cost();
      show_hide_annual_subscription_cost();
      update_ultra_cost();
      update_feb_discount();
      //console.log(ultra_liscence);
    } else if ($(this).is(':checked') && $(this).val() == buyOnce) {
      $('.output--lisence-cost').removeAttr('data-total-cost');
      ultra_liscence = "buyOnce";
      update_total_buyOnce_cost();
      show_hide_annual_subscription_cost();
      update_ultra_cost();
      update_feb_discount();
      //console.log(ultra_liscence);
    } else if ($(this).is(':checked') && $(this).val() == '0') {
      $('.output--lisence-cost').removeAttr('data-total-cost');
      ultra_liscence = "none";
      showSeatCost();
      show_hide_annual_subscription_cost();
      update_ultra_cost();
      update_feb_discount()
    }
  });

//Format totals to have commas/*
function add_commas() {
  $.fn.digits = function() {
    return this.each(function() {
      $(this).html($(this).html().replace(

        /(\d)(?=(\d{3})+(?!\d))/g, "$1,"

      ));
    })
  }
  $(".output").digits();
}