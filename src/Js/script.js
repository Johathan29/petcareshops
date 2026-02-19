// JavaScript
const phoneInput = document.querySelector('#form.phone');

phoneInput.addEventListener('click', (e) => {
  alert('asdasd')
});
function keyUp(e){
    let input = e.target.value.replace(/\D/g, ''); // Elimina todo lo que no sea número
  let formatted = '';

  // Aplica el formato (xxx) xxx-xxxx
  if (input.length > 0) {
    formatted = '(' + input.substring(0, 3);
  }
  if (input.length > 3) {
    formatted += ') ' + input.substring(3, 6);
  }
  if (input.length > 6) {
    formatted += '-' + input.substring(6, 10);
  }

  e.target.value = formatted;
}