function loadCss(filename) {
  var link = document.getElementById('stylesheet');
  link.href = filename;
}

function toggleCss() {
  var link = document.getElementById('stylesheet');
  var toggleSwitch = document.getElementById('flip-checkbox');
  if (toggleSwitch.checked) {
    link.href = 'dark.css'; // Apply dark mode CSS
  } else {
    link.href = 'light.css'; // Apply light mode CSS
  }
}

function updateText() {
  var varCode = document.getElementById('varCode').value;
  var varNumber = document.getElementById('varNumber').value;
  for (let i = 0; i <= varNumber.length; i++) {
    varNumber = varNumber.replace(" ", "");
  }
  varNumber = varNumber.substr(varNumber.length - 10);
  var lnk = document.getElementById('lnk');
  lnk.href = "https://api.whatsapp.com/send/?phone=%2B" + varCode + varNumber + "&text&type=phone_number&app_absent=0";
  lnk.innerHTML = lnk.href;
}

function openLink() {
  var varCode = document.getElementById('varCode').value;
  var varNumber = document.getElementById('varNumber').value;
  for (let i = 0; i <= varNumber.length; i++) {
    varNumber = varNumber.replace(" ", "");
  }
  varNumber = varNumber.substr(varNumber.length - 10);
  var openBtn = "https://api.whatsapp.com/send/?phone=%2B" + varCode + varNumber + "&text&type=phone_number&app_absent=0";
  window.open(openBtn);
}


 // Get references to the input field and the submit button
 const varNumberInput = document.getElementById('varNumber');
 const submitButton = document.getElementById('openBtn');

 // Function to check if the input field is empty
 function checkInput() {
   if (varNumberInput.value.trim() === '') { // If input is empty
     submitButton.disabled = true; // Disable the button
   } else {
     submitButton.disabled = false; // Enable the button
   }
 }

 // Add event listener to input field to check its state on input
 varNumberInput.addEventListener('input', checkInput);

 // Call the function initially to set the initial state of the button
 checkInput();