const $boton = document.getElementById('boton');

boton.addEventListener('click', async (e) => {
  e.preventDefault();

  const pattern = document.querySelector("[required]").pattern;
  let regEx = new RegExp(pattern);

  let name = document.getElementById('name').value;

  if (regEx.test(name)) {
    const data = await store(name);
    if (data.status === 200) {
      // alert(`${data.msg}: ${data.name}`)
      window.location.href = '/users/list';
    } else {
      alert(data.error[0].msg)
    }
  }
})

const store = async (name) => {
  try {
    const request = await fetch('http://localhost:3000/users/store',{
      method:"POST",
      body: JSON.stringify({
        "name": name,
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
