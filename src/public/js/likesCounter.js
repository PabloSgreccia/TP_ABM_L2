const $like = document.getElementById('like');
const $likeCounter = document.getElementById('likes-counter');

$like.addEventListener('click', async (e) => {
  e.preventDefault();
  const data = await updateCounter(parseInt($likeCounter.textContent, 10) + 1);
  if (data.status = 201) {
    $likeCounter.textContent = parseInt($likeCounter.textContent, 10) + 1
  } else{
    alert(data.error[0].msg)
  }
});

const updateCounter = async (counterValue) => {
  try {
    const request = await fetch('http://localhost:3000/counter/update', {
      method:"PATCH",
      body: JSON.stringify({
        "value": counterValue,
      }),
      headers : {
        "Content-Type": "application/json",
      }
    })
    const datos = await request.json()
    return datos;
  } catch (error) {
    return error;
  }
}