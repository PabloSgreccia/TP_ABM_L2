const $message = document.getElementById('floating-message');

if ($message) {
  let timeOut = setTimeout(() => {
    $message.remove();
  }, 3000);
}