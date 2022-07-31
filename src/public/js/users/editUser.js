const $boton = document.getElementById('boton');

$boton.addEventListener('click', async (e) => {
  e.preventDefault();

  const pattern = document.querySelector("[required]").pattern;
  let regEx = new RegExp(pattern);

  let name = document.getElementById('name').value;
  let id = document.getElementById('id').value;

  if (regEx.test(name)) {
    const data = await update(id, name);
    console.log(data);
    if (data.status = 201) {
      // alert(`${data.msg}: ${data.oldName} to ${data.newName}`)
      window.location.href = '/users/list';
    } else {
      alert(data.error[0].msg)
    }
  }
})

const update = async (id, name) => {
  try {
    const request = await fetch('http://localhost:3000/users/' + id,{
      method:"PATCH",
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