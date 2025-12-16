$(function () {
  function dataPicker() {
    var today = new Date();
    if (window.innerWidth >= 1224) {
        //$('#datefilter').daterangepicker();
      $('#datefilter').daterangepicker({
        autoUpdateInput: false,
        showDropdowns: true,
        alwaysShowCalendars: true,
        showCustomRangeLabel: false,
        opens: "center",
        maxDate: today,
        locale: {
          "format": "MM/DD/YYYY",
          "separator": " - ",
          "applyLabel": "Принять",
          "cancelLabel": "Отмена",
          "fromLabel": "От",
          "toLabel": "До",
          "customRangeLabel": "Свой",
          "daysOfWeek": [
              "Вс",
              "Пн",
              "Вт",
              "Ср",
              "Чт",
              "Пт",
              "Сб"
            ],
          "monthNames": [
              "Январь",
              "Февраль",
              "Март",
              "Апрель",
              "Май",
              "Июнь",
              "Июль",
              "Август",
              "Сентябрь",
              "Октябрь",
              "Ноябрь",
              "Декабрь"
            ],
        },
        ranges: {
          'Все время': [moment(), moment()],
          'День': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Неделя': [moment().subtract(6, 'days'), moment()],
          'Месяц': [moment().subtract(29, 'days'), moment()],
          'Год': [moment().subtract(12, 'month').startOf('month'), moment().subtract(0, 'month').calendar('month')]
        },
      });
      $('#datefilter').on('apply.daterangepicker', function (ev, picker) {
            var dataRange = picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'),
                dateVal = (picker.chosenLabel == 'Все время') ? 'alltime': dataRange;
            $(this).val(dateVal);
            console.log(dateVal);  
      });
      $('#datefilter').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
      });
    } else if (window.innerWidth <= 767) {
      $('#datefilter').daterangepicker({
        singleDatePicker: true,
        autoUpdateInput: false,
        showDropdowns: true,
        alwaysShowCalendars: true,
        showCustomRangeLabel: false,
        opens: "center",
        maxDate: today,
        locale: {
          "format": "MM/DD/YYYY",
          "separator": " - ",
          "applyLabel": "Выбрать",
          "cancelLabel": "Отмена",
          "fromLabel": "От",
          "toLabel": "До",
          "customRangeLabel": "Свой",
          "daysOfWeek": [
              "Вс",
              "Пн",
              "Вт",
              "Ср",
              "Чт",
              "Пт",
              "Сб"
            ],
          "monthNames": [
              "Январь",
              "Февраль",
              "Март",
              "Апрель",
              "Май",
              "Июнь",
              "Июль",
              "Август",
              "Сентябрь",
              "Октябрь",
              "Ноябрь",
              "Декабрь"
            ],
        },
        ranges: {
          'Все время': [moment(), moment()],
          'День': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Неделя': [moment().subtract(6, 'days'), moment()],
          'Месяц': [moment().subtract(29, 'days'), moment()],
          'Год': [moment().subtract(12, 'month').startOf('month'), moment().subtract(0, 'month').endOf('month')]
        },
      })
    };
  }
  dataPicker()
  $(window).resize(function () {
    dataPicker()
  })
});