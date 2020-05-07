function generate() {
  let complexity = document.getElementById("slider").value;
  let values =
    "ABCDEFGHIJKLMNOPQRSTUVVWXYZabcdefghijklmnopqrstuvwxyz123456789!@#$%^&*()_+";
  let password = "";
  for (var i = 0; i <= complexity; i++) {
    password =
      password +
      values.charAt(Math.floor(Math.random() * Math.floor(values.length - 1)));
  }
  document.getElementById("display").value = password;
  document.getElementById("last_passwords").innerHTML += password + "<br/>";
}
document.getElementById("length").innerHTML = "Length:8-128";
document.getElementById("slider").oninput = function() {
  if (document.getElementById("slider").value > 0) {
    document.getElementById("length").innerHTML =
      "Length" + document.getElementById("slider").value;
  }
};
function copyPassword() {
  document.getElementById("display").select();

  document.execCommand("Copy");

  alert("Password copied to clipboard!");
}
