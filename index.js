import blink from 'blink-detection';

const updateModelStatus = () => {
  const status = document.querySelector('.model-status');
  if (status) {
    status.innerHTML = 'Model loaded! You can start!';
    status.classList.add('fade-out');
    status.classList.remove('model-status');
  }
};

const videoElement = document.querySelector('video');

var raf;
const init = async () => {
  await blink.loadModel();
  await blink.setUpCamera(videoElement);

  let leftEye = document.getElementById('left-eye');
  let rightEye = document.getElementById('right-eye');
  let blinkIndicator = document.getElementById('blink-indicator');
  let winkIndicator = document.getElementById('wink-indicator');

  const predict = async () => {
    let result = await blink.getBlinkPrediction();
    updateModelStatus();

    if (result) {
      if (result.blink) {
        blinkIndicator.style.color = 'red';
      } else {
        blinkIndicator.style.color = 'green';
      }
    }
    raf = requestAnimationFrame(predict);
  };
  predict();
};

init();
