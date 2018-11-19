$(function(){
  console.log('scripts loaded');

  var myVar = setInterval(myTimer, 5000);

function myTimer() {


  var url= 'http://api.open-notify.org/iss-now.json';
  var url2= '';
  var html= '';
  var data= '';
  var data2='';
  var coordinates = [];



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
      url2 = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + 35.9209386 +'&lon=' + -79.1095029;
      console.log(url2);

      var issAddress = [];
      var errorMsg = [];

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
          console.log(issAddress.country)
          errorMsg = data2.error;

          if (errorMsg='Unable to geocode'){
              html += '<p> The International Space Station is over an ocean.</p>';
          }
          else{
              html += '<p>' + issAddress.state + ', ' + issAddress.country + '</p>';
          }

            $('#results').html(html)

        }// close second success

      });//close second ajax




    }// close first success

  }); // close first ajax


}// close timer function

});// close wrapper
