
import * as clases from './classviaje.js'

document.addEventListener('DOMContentLoaded', function() {

    
    
   
    
    
    const guardados=JSON.parse(localStorage.getItem("listaviajes"));
    const valore= window.location.search;
    //console.log(valore);    
    //console.log(viajes[2])
    const divdest=document.getElementById("datos");
    fetch('viajes.json')
    .then((data)=>data.json())
    .then((viajes)=>{
        localStorage.setItem("listaviajes",JSON.stringify(viajes))
        for(const lugar of viajes){
            let muestra = document.createElement("div"); 
            muestra.className="formdest"
            muestra.innerHTML=`<button id="${lugar.id}" type="submit"  > <br><div class="row gx-0 mb-5 mb-lg-0 justify-content-center">
            <div class="col-lg-6"><img class="img-fluid" src="${lugar.imagen}" alt="..." /></div>
            <div class="col-lg-6">
                <div class="bg-black text-center h-100 project">
                    <div class="d-flex h-100">
                        <div class="project-text w-100 my-auto text-center text-lg-left">

                        <h4 class="text-white">id: ${lugar.id}</h4>
                            <h4 class="text-white"> ${lugar.region}</h4>
                            <p class="mb-0 text-white-50">${lugar.precio} $</p>
                            <hr class="d-none d-lg-block mb-0 ms-0" /></div></div></div></div></div><br></button>`
            
            divdest.appendChild(muestra);
            const botondest=document.getElementById(`${lugar.id}`);
            botondest.addEventListener("click",()=>{
                destinos(lugar.id)
            });
        
    }})
    
    // const guardados=JSON.parse(localStorage.getItem("listaviajes"));
    for(const objeto of guardados){
        new clases.Viaje(objeto);
    }; 
       
    let costo=0
    let img
    let reg
    
    
    const logout=document.getElementById("logout");
    logout.addEventListener("click",(e)=>{
        e.preventDefault();
        sessionStorage.clear();
        window.location.href="index.html";
    })

    const botonsito=document.getElementById("botonbusca"); 
    const formulario=document.getElementById("formularioguard");    
    const busqueda=JSON.parse(localStorage.getItem("users"));
    const sesion=JSON.parse(sessionStorage.getItem("usuariossesion"));
    let noencontrado =document.getElementById("error1")
    
    if(sesion == null){
        logout.style.display="none";
        botonsito.addEventListener("click",validacion)
        function validacion(e){
            e.preventDefault();
            const localuser={usuario :document.getElementById("formularioguard")[0].value, pasword: document.getElementById("formularioguard")[1].value}
            
            sessionStorage.setItem("usuariossesion",JSON.stringify(localuser));
            const encontrado=busqueda.find((el)=> el.usuario == localuser.usuario)
            const pasencontrado=busqueda.find((el)=> el.pasword == localuser.pasword)
            if( encontrado && pasencontrado){
                location.reload()
                formulario.innerHTML=`<h1>Bienvenido  ${localuser.usuario}</h1>`
                return 
            } else {
                noencontrado.innerHTML="Usuario o contraseña incorrectos";
            }
        }
    }else{
        formulario.innerHTML=`<h1>Bienvenido  ${sesion.usuario}</h1>`
    }
    
    
    function destinos( lugar){ 
        if(sesion != null){
            let pais = lugar;            
            guardados.forEach((obj)=>{
                if(obj.id == pais){
                    costo = obj.precio
                    img = obj.imagen
                    reg = obj.region     
                    Swal.fire({
                        title: `viaje a ${reg}`,
                        text: `$ ${costo}`,    
                        imageUrl: `${img}`,
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ver metodos de pago'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            let datosviaje={costo:costo,img:img,reg:reg}
                            sessionStorage.setItem('datosviaje',JSON.stringify(datosviaje));
                            location.reload()
                        }else{
                            location.reload()
                        }   
                    })
                }             
            });  
            
        
        }else{
            let mensaje= document.getElementById("error")
            mensaje.innerHTML="<h4>debe registrarse para continuar</h4>";
        }
    }




    //ver monto total
   
    const mensaje=document.getElementById("mensajecosto")
    const metodopago=document.getElementById("metodform");
    const metodid=document.getElementById("metodid");
    const destino=document.getElementById("datos2")   
    
    let loadviajes=JSON.parse(sessionStorage.getItem("datosviaje"));
    
    
    

    if(loadviajes!= null){
       
        
        formdest.innerHTML=`<button ><a href="#metodform"> metodos</a></button><br><h2></h2>
        <h2>${loadviajes.reg}</h2><h2>${loadviajes.costo}</h2>
        <img src="${loadviajes.img} "alt="${loadviajes.reg}"height="300 px" width="1000 px id ="imagenviajes">`
        
        
    
        let costos= loadviajes.costo
        destino.innerHTML=`<h2>${loadviajes.reg}</h2><h2>${loadviajes.costo}</h2>
        <img src="${loadviajes.img} "alt="${loadviajes.reg}"height="250 px" width="300 px id ="imagenviajes">`
        metodopago.addEventListener("submit",metodoDePago);
        
        function metodoDePago(event){
            event.preventDefault();
            let metodo= metodid.value
            if(metodo== "TARJETA" || metodo== "EFECTIVO"){
                let aumento=costos*0.15
                if (metodo== "TARJETA") {
                    costos+= aumento
                    mensaje.innerHTML=`<h4>eligio el pago con tarjeta, monto total a pagar es de  ${costos}</h4><a href="metod.html">reservar</a>`
                    metodopago.reset();
                }else{
                    costos-= aumento
                    mensaje.innerHTML=`<h4>eligio el pago en efectivo , monto total a pagar es de  ${costos}</h4><a href="metod.html">reservar</a>`
                    metodopago.reset();
                }
            }else{
                mensaje.innerHTML="<h4>ingrese datos correctos<h4>";
            }
        }    
    }else{
        mensaje.innerHTML= "<h4> debe elejir un destino primero</h4>";
    }    

}, false);   















// 4 - El select que agregaste, que permite seleccionar un destino, ahora lo estás generando de manera manual en el HTML.
//  Vos al tener los datos de todos los viajes disponibles en el JS, podrías crear cada opción del select de forma programática,
//   con un for, para hacer más flexible la creación del mismo.




// 5 - Ahora, luego de que se seleccione un destino, y se debe elegir el método de pago, la página recarga y se debe bajar 
// hasta el fondo para elegir este método. Si un usuario es nuevo y no sabe que hacer, puede quedar bastante confundido de
//  como continuar, por lo que podrías mover al usuario con JS hasta esa sección al recargar la página, 
//  así queda claro que tiene que hacer. Esto se puede hacer con la función "scrollIntoView" de JavaScript,
//  te dejo un link con más 
//  info https://stackoverflow.com/questions/13266746/scroll-jump-to-id-without-jquery?answertab=trending#tab-top.



// 6 - El botón de cerrar sesión que aparece en el navbar, 
// solo debería estar ahí cuando el usuario ya inicio sesión. 
// Si el usuario no tiene cuenta no debería aparecer, ya que no puede cerrar una sesión que no existe.




















