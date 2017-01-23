let landingP = document.getElementById('landingP');
let game = document.getElementById('game')

landingP.addEventListener('click', (e) => {
  landingP.style.display = 'none';
  game.style.visibility = 'visible';
})