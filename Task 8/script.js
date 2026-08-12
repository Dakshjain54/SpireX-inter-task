const planButtons = document.querySelectorAll('.plan-btn');
const msg = document.getElementById('msg');
const msgText = document.getElementById('msg-text');

let msgTimeout;

planButtons.forEach(button => {
  button.addEventListener('click', () => {
    const planName = button.getAttribute('data-plan');
    showNotification(`${planName} Plan selected!`);
  });
});

function showNotification(message) {
  msgText.textContent = message;
  msg.classList.add('show');
  clearTimeout(msgTimeout);
  msgTimeout = setTimeout(() => {
    msg.classList.remove('show');
  }, 3000);
}

