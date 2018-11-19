$(function(){
  console.log('scripts loaded');

  var myVar = setInterval(myTimer, 5000);

function myTimer() {


  var url= 'http://api.open-notify.org/iss-now.json';
  var url2= '';
  var html= '';
  var data= '';
  var data2=[];
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
      url2 = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + latitude +'&lon=' + longitude;
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
          errorMsg = data2.error;

          if (url2=data2.error){
              console.log('ISS is over the ocean');
              html += '<p> The International Space Station is over an ocean.</p>';
          }
          else{
              console.log('ISS is over land');
              html += '<p>' + issAddress.state + ', ' + issAddress.country + '</p>';
          }

          /*if (data.address!=undefined && data.address.country!=undefined){
            html += '<p>' + issAddress.state + ', ' + issAddress.country + '</p>';
          }
          else{
              console.log('ISS is over the ocean')
              html += '<p> The International Space Station is over an ocean.</p>';
          }*/



            $('#results').html(html)

        }// close second success

      });//close second ajax




    }// close first success

  }); // close first ajax


}// close timer function

});// close wrapper
