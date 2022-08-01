const $message = document.getElementById('floating-message');

if ($message) {
  setTimeout(() => {
    $message.remove();
  }, 3000);
}