$.getJSON("/taxiConsult/getList", function (data) {
  $(".list-taxis").empty();
  for (var taxi in data.taxis) {
    if (data.taxis.hasOwnProperty(taxi)) {
      var tmpl = $(".list-taxis-template").clone();
      tmpl.removeClass("list-taxis-template");
      $(".title", tmpl).text(data.taxis[taxi].mark + ' ' + data.taxis[taxi].model);
      $(".serial", tmpl).text(data.taxis[taxi].serial);
      $(".list-taxis").append(tmpl);
      tmpl.show();
    }
  }
});
