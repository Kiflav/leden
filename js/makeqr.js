var qrcode = new QRCode(document.getElementById("qrcode"), {
  width: 200,
  height: 200 });

function makeCode(code) {
  var elText = code;

  if (!elText) {
    return;
  }
  else{
	 qrcode.makeCode(elText);
  }	
}
makeCode(uc);