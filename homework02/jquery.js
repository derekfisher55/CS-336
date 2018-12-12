$(document).ready(function() {
  $('#addPerson').submit(function(event) {
      event.preventDefault();
      var form = $('#addPerson');
      $.ajax({
        type: 'POST',
        url: '/people',
        data: form.serialize(),
        dataType: 'json',
        success: function(res) {
          $("<em>", { html: res.msg }).appendTo("body");
        }
      })
      .fail(function( xhr, status, errorThrown ) {
        alert( "Error!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
      })
  });

  $('#getPerson').submit(function(event) {
    event.preventDefault();
    var form = $('#getPerson');
    $.ajax({
      type: 'GET',
      url: '/people/' + $('#ID').val(),
      data: form.serialize(),
      dataType: 'json',
      success: function(res) {
        $("<div>", { html: "First Name: " + res.msg.first + "<br \> Last Name:
        " + res.msg.last + "<br \> ID: " + res.msg.ID +
        "<br \> Start Date: " + res.msg.startDate }, "</div>").appendTo("body");
      }
    })
    .fail(function( xhr, status, errorThrown ) {
      alert( "Error! Person not found!" );
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.dir( xhr );
    })
  });
})
