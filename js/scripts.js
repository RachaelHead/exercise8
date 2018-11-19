$(function(){
  console.log('scripts loaded');

  var url= 'http://api.open-notify.org/iss-now.json';
  var url2= '';
  var html= '';
  var data= '';
  var data2='';
  var coordinates = [];
  var oceanMsg = 'The International Space Station is over the ocean.';



  $.ajax({
    type:'GET',
    url: url,
    data: data,
    dataType: 'json',
    async: true,
    success: function (data){
      console.log(data);
      coordinates = data.iss_position
      var latitude = data.iss_position.latitude;
      var longitude = data.iss_position.longitude;
      url2 = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + latitude +'&lon=' + longitude;
      console.log(url2);
      html += latitude;

      var issAddress = [];

      $.ajax({
        type: 'GET',
        url: url2,
        data: data2,
        dataType: 'json',
        async: true,
        success: function (data2){
          console.log(data2);
          issAddress = data2.address;
          console.log(issAddress);
        }// close second success

      });//close second ajax
      $('#results').html(html)

      /*if (issAddress='undefined'){
        $('#results').html(oceanMsg);
      }*/

    }// close first success

  }); // close first ajax




});// close wrapper
