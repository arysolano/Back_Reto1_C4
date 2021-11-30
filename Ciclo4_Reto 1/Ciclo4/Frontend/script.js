/*************************************************************************************************************************************/
/****************************************************** D E S A R R O L L O **********************************************/
/*************************************************************************************************************************************/

const uri = "http://localhost:8080/api/user"

/*************************************************************************************************************************************/
/****************************************************** CREACION DE USUARIO ************************************************************/
/***********************************************************************************************************************************/



let crearUsuario = () => {
       const email = $("#email").val().trim()
    if (email.length > 0) {
        $.ajax({
            url: `${uri}/${email}`,
            //url: uri + "/" + myData.email,
            type: "GET",
            datatype: "JSON",
            success: function (respuesta) {
                $("#comfPassInp").empty();
                $("#passInp").empty();
                $("#campoAlerta").empty();
                let password = $("#password").val().trim()
                let comPassword = $("#confirmPassword").val().trim()
                if (password === comPassword) {
                    if (respuesta == false) {
                        if (verifiEmailVal(email) == true) {
                            let myData = {
                                name: $("#name").val().trim(),
                                email: $("#email").val().trim(),
                                password: $("#password").val().trim()
                            };
                            if (myData.email.length > 0 && myData.password.length >= 6 && myData.name.length > 0) {
                                $.ajax({
                                    url: uri + "/new",
                                    type: "POST",
                                    data: JSON.stringify(myData),
                                    datatype: "JSON",
                                    contentType: "application/JSON; charset=utf-8",
                                    encode: true,
                                    success: function (respuesta) { 
                                        document.getElementById("existencia").innerHTML = `<p style = "color: black">Cuenta creada correctamente`
                                    }
                                });
                            } else if (myData.email.length <= 0 || myData.name.length <= 0 || myData.password.length <= 0) {
                                document.getElementById("campoAlerta").innerHTML = `<p style = "color: red">Todos los campos son obligatorios`
                            }else if (myData.password.length < 6){
                                document.getElementById("comfPassInp").innerHTML = `<p style = "color: red">la contraseña debe tener como mínimo 6 caracteres`
                            }
                        } else {
                            document.getElementById("comfPassInp").innerHTML = `<p style = "color: red"> Ingrese un email válido`
                        }
                    } else {
                        document.getElementById("comfPassInp").innerHTML = `<p style = "color: red">El email ya esta registrado`
                    }
                } else {
                    document.getElementById("comfPassInp").innerHTML = `<p style = "color: red">las contraseñas no coinciden`
                }

            }
        });
    }else{
        document.getElementById("comfPassInp").innerHTML = `<p style = "color: red">Todos los capos son obligatorios`
    }
}

const verifiEmailVal = (valor) => {
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (emailRegex.test(valor)) {
        return true;
    } else {
        return false;
    }
}


/*************************************************************************************************************************************/
/****************************************************** INICIO DE SESION ************************************************************/
/***********************************************************************************************************************************/

const validacionUsuario = () => {
    $("#emailIn").empty();
    $("#passIn").empty();
    let myData = {
        email: $("#email").val().trim(),
        password: $("#password").val().trim()
    };
    if (myData.email.length > 0 && myData.password.length > 0) {
        $.ajax({
            url: uri + "/" + myData.email + "/" + myData.password,
            type: "GET",
            datatype: "JSON",
            success: function (response) {
                let nombre = response.name;
                let validacion = document.getElementById("validacion");
                let textoRespon = `Bienvenido ${nombre}`
                if (nombre == "NO DEFINIDO") {
                    textoRespon = "Email y/o contraseña incorrecto"
                    validacion.innerHTML = `<p style = "color: red;"> ${textoRespon}` 
                }else{
                    validacion.innerHTML = `<p> ${textoRespon}`   
                    setTimeout(()=>{
                        window.location.href = 'menu.html'
                    }, 1000);
                    }
                }

        });
    } else if (myData.email.length <= 0 && myData.password.length > 0) {
        let emailIn = document.getElementById("emailIn");
        let textoRespon = "este espacio es obligatorio"
        emailIn.innerHTML = `<p style = "color: red">${textoRespon}`
    } else if (myData.password.length <= 0 && myData.email.length > 0) {
        let passIn = document.getElementById("passIn");
        let textoRespon = "este espacio es obligatorio"
        passIn.innerHTML = `<p style = "color: red">${textoRespon}`
    } else if (myData.password.length <= 0 && myData.email.length <= 0) {
        let passIn = document.getElementById("passIn");
        let textoRespon = "este espacio es obligatorio"
        passIn.innerHTML = `<p style = "color: red">${textoRespon}`

        let emailIn = document.getElementById("emailIn");
        let textRespon2 = "este espacio es obligatorio"
        emailIn.innerHTML = `<p style = "color: red">${textRespon2}`
    }

}


/*************************************************************************************************************************************/
/****************************************************** MAQUETACION DE LA TABLA *****************************************************/
/***********************************************************************************************************************************/

const menu = () => {
    $.ajax({
        url: `${uri}/all`,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            mostrarTabla(response)
        }                      
    });
}


const mostrarTabla = (items) => {
    let tableUsuario = `<table class='table table-striped ' style = "background: cadetblue; color: white">`
    tableUsuario+="<tr>";
        tableUsuario+=`<th style = " color: white">NAME</th>`;
        tableUsuario+=`<th style = "background: cadetblue; color: white">EMAIL</th>`;
        tableUsuario+=`<th style = "background: cadetblue; color: white" colspan='2'>OPTIONS</th>`
        tableUsuario+="</tr>";
    for(i=0;i<items.length;i++){
        tableUsuario+="<tr>";
        tableUsuario+= `<td> ${items[i].name}</td>`;
        tableUsuario+=`<td> ${items[i].email}</td>`;
        tableUsuario+=`<div id = "button">`
        tableUsuario+=`<td> <button class="btn btn-info" onclick = 'clearItemById(${items[i].id})' style="color: cadetblue; background-color: white;" >Borrar</button>`;
        tableUsuario+=`<td> <button class="btn btn-info" onclick = 'itemByID(${items[i].id})'  style="color: cadetblue; background-color: white;"'>Editar</button>`;
        tableUsuario+=`</div>`
        tableUsuario+="</tr>";
}
tableUsuario += "</table>";
    $("#maquetacionTabla").append(tableUsuario);
    //document.getElementById(#)
}