define(function(){
  var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft XMLHTTP");
  xmlhttp.onreadystatechange = callback;



  function callback(){
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
      var responsTest = xmlhttp.responseText;
      alert(responsTest);
    }
  }
});