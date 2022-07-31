const $boton = document.getElementById('boton');

boton.addEventListener('click', async (e) => {
  e.preventDefault();
  
  const pattern = document.querySelector("[required]").pattern;
  let regEx = new RegExp(pattern);

  let fruitType = document.getElementById('fruitType').value;
  let id = document.getElementById('id').value;

  if (regEx.test(fruitType)) {
    const data = await update(id, fruitType);
    if (data.status = 201) {
      // alert(`${data.msg}: ${data.oldType} to ${data.newType}`)
      window.location.href = '/fruits/list';
    } else {
      alert(data.error[0].msg)
    }
  }
})

const update = async (id, fruitType) => {
  try {
    const request = await fetch('http://localhost:3000/fruits/' + id,{
      method:"PATCH",
      body: JSON.stringify({
        'type': fruitType,
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