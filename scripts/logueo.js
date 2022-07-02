
import * as clases  from "./classusuario.js"

//guardar usuario en localstorage    

const admin={usuario:"admin",pasword:"admin"}
const datausers=JSON.parse(localStorage.getItem("users")) || [];
if(datausers.length==0){
  datausers.push(admin);
}

let boton=document.getElementById("botonsubmit");
const form=document.getElementById("form");

boton.addEventListener("click",(e)=>{
        
  e.preventDefault();      
  const datosUsuario={usuario :document.getElementById("form")[0].value, pasword: document.getElementById("form")[1].value}
  const encontrado=datausers.find((el)=> el.usuario == datosUsuario.usuario)
  if(encontrado == undefined){


    if(((datosUsuario.usuario).length >= 5 && (datosUsuario.usuario).length <=10) && ((datosUsuario.pasword).length >=5)){
        localStorage.setItem('usuariosguardados',JSON.stringify(datosUsuario)) ;
        Swal.fire({
            title: 'su registro fue un exito',
            confirmButtonText: 'continuar a pagina',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
        }).then((result) => {   
            if (result.isConfirmed) {
                window.location.href="index.html";
            }
            
        })
        
        datausers.push(datosUsuario)

        localStorage.setItem('users', JSON.stringify(datausers));
        const usuarios= new clases.User();
        usuarios.agregarusuario({datosUsuario})
        
        form.innerHTML= `<button class="btn btn-primary" > <a href="index.html" style="color:rgb(23, 66, 158)">ingresar</a>
        </button>`
        
    }else{
        Swal.fire({
            title: 'error',
            text: 'los campos deben tener minimo 5 caracteres',
            icon: 'error',
            confirmButtonText: 'continuar',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }
  }else{
    Swal.fire({
      title: 'error',
      text: 'ese nombre de usuario ya existe, pruebe con otro',
      icon: 'error',
      confirmButtonText: 'continuar',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
  })
  }
})  



    





// const busqueda=JSON.parse(localStorage.getItem("users"));
// console.log(busqueda)
// const borrar=document.getElementById("eliminar");
// const usearelim=document.getElementById("username2")
// const encontrado=busqueda.find((el)=> el.usuario == usearelim.value)
// console.log(encontrado)


// borrar.addEventListener("click",(e)=>{
//     e.preventDefault();
//     for(const data of busqueda){
//         if(data.usuario== usearelim){
//             const indice=busqueda.indexOf(data.usuario);
//             busqueda.splice(indice)
//         }   
//     }   
// })