$(document).ready(function() {

  // Dynamic Next Button
  $(".btn-next").on("click", function () {
    nextStep = $("#" + $(this).parents(".slider-step").data("nextStep"));
    $(this).parents(".slider-step").attr("data-anim", "hide-to--left");
    nextStep.attr("data-anim", "show-from--right");
  });

  // Dynamic Back Button
  $(".btn-back").on("click", function () {
    backTo = $("#" + $(this).parents(".slider-step").data("backTo"));
    $(this).parents(".slider-step").attr("data-anim", "hide-to--right");
    backTo.attr("data-anim", "show-from--left");
  });

  // Table
  var inputRow = document.querySelector('#inputrow').cloneNode(true);
  var valRow = document.querySelector('#valrow').cloneNode(true);

  $('[data-input]').append(inputRow.innerHTML);

  $('[data-hidden]').append(valRow.innerHTML);

  function setContentEditable() {
    $('tr[data-input="true"] > td.ce').attr('contenteditable', 'true');
    $('td.ce span.placeholder').attr('contenteditable', 'false');
    return;
  }

  // Table- Set appended row editable
  setContentEditable();

  // Table- Bind each content cell to (hidden) cell
  $('[data-input] td').each(function (i, el) {
    var ph = $('.placeholder')[i];
    $(el).on('input', function (e) {
      console.log(ph, i);
      var bindText = text => {
        let cell = $('[data-hidden] td')[i];
        $(cell).text(text);
      };
      $(ph).detach();
      bindText(e.target.innerText);
    });
    $(el).on('blur', function (e) {
      if ($(el).text() === "") {
        $(el).text("text");
      }
    });
  });

  // Table - Add new row
  $('button[data-save]').on('click', function (e) {
    $('[data-hidden] td').each(function (i, el) {
      if ($(el).text() === "") {
        $(el).text('null');
      }
    });
    $('[data-hidden]').removeAttr('data-hidden');
    $('[data-input]').html('');
    var html = $('#inputrow').html();
    $('[data-input]').html(html);
    $('<tr data-hidden></tr>').insertBefore('[data-input]').append(valRow.innerHTML);
    setContentEditable();
  });


  // Select picker
  $(function() {
    $(".selectpicker").selectpicker({
    });
  });
});
