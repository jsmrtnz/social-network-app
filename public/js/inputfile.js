function customInputFile(){
  const input = document.querySelector('.input-file');
  let label	 = input.nextElementSibling;
  input.addEventListener('change', (event) => {
    var fileName = event.target.files[0].name;
    label.innerHTML = fileName;
  });
}

// const inputs = document.querySelectorAll('.input-file');
// Array.prototype.forEach.call(inputs, function(input){
//   const label	 = input.nextElementSibling;
//   input.addEventListener('change', (event) => {
//     var fileName = event.target.files[0].name;
//     label.innerHTML = fileName;
//   });
// });