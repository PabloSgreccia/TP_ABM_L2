const $boton = document.getElementById('boton');

boton.addEventListener('click', async (e) => {
  e.preventDefault();

  let id = document.getElementById('id').value;

  const data = await destroy(id);
  if (data.status = 200) {
    // alert(`${data.msg}: ${data.deletedUser.name}`)
    window.location.href = '/users/list';
  } else {
    alert(data.error[0].msg)
  }
})

const destroy = async (id, nombre) => {
  try {
    const request = await fetch('http://localhost:3000/users/' + id,{
      method:"DELETE",
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