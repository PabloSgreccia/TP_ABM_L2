const $boton = document.getElementById('boton');

boton.addEventListener('click', async (e) => {
  e.preventDefault();

  const pattern = document.querySelector("[required]").pattern;
  let regEx = new RegExp(pattern)

  let fruitType = document.getElementById('fruitType').value;

  if (regEx.test(fruitType)) {
    const data = await store(fruitType);
    if (data.status === 200) {
      // alert(`${data.msg}: ${data.type}`)
      window.location.href = '/fruits/list';
    } else {
      alert(data.error[0].msg)
    }
  } 
})

const store = async (fruitType) => {
  try {
    const request = await fetch('http://localhost:3000/fruits/store',{
      method:"POST",
      body: JSON.stringify({
        "type": fruitType,
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
