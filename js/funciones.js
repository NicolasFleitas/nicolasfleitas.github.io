
var dbAlumnos = localStorage.getItem("dbAlumnos"); //Obtener datos de localStorage

var operacion = "A"; //"A"=agregar; "E"=editar
dbAlumnos = JSON.parse(dbAlumnos); // Covertir a objeto
if (dbAlumnos === null) {// Si no existe, se crea un array vacio.
dbAlumnos = []; 
}
    
function Mensaje(t){
        switch (t) {
            case 1: //
                $(".mensaje-alerta").append(
                    "<div class='alert alert-success' role='alert'>Se agrego con exito el alumno</div>"
                );
                break;
            case 2: //
                $(".mensaje-alerta").append(
                    "<div class='alert alert-danger' role='alert'>Se elimino el alumno</div>"
                );
                break;
            default:

        }
    }


function AgregarAlumno () {
    // Seleccionamos los datos de los inputs de formulario
    var datos_cliente = JSON.stringify({
        Nombre : $("#nombre").val(),
        Correo : $("#correo").val(),
        Edad : $("#edad").val(),
        Fecha_ingreso : $("#fecha_ingreso").val(),
    });

    dbAlumnos.push(datos_cliente); // Guardar datos en el array definido globalmente
    localStorage.setItem("dbAlumnos", JSON.stringify(dbAlumnos));

    ListarAlumnos();
    limpiarFormulario()

    return Mensaje(1);
}



function ListarAlumnos (){
    $("#dbAlumnos-list").html(
            "<thead>" +
                "<tr>" +
                    "<th> ID </th>" +
                    "<th> Nombre </th>" +
                    "<th> Correo </th>" +
                    "<th> Edad </th>" +
                    "<th> fecha_ingreso </th>" +
                    "<th> </th>" +
                    "<th>  </th>" +
                "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
    );

    for (var i in dbAlumnos) {
        var d = JSON.parse(dbAlumnos[i]);
        $("#dbAlumnos-list").append(
                        "<tr>" +
                            "<td>" + i + "</td>" +
                            "<td>" + d.Nombre + "</td>" +
                            "<td>" + d.Correo + "</td>" +
                            "<td>" + d.Edad + "</td>" +
                            "<td>" + d.Fecha_ingreso + "</td>" +
                            "<td> <a id='"+ i +"' class='btnEditar' href='#'> <span class=''>Edit</span>  </a> </td>" +
                            "<td> <a id='" + i + "' class='btnEliminar' href='#'> <span class=''>Borrar</span> </a> </td>" +
                        "</tr>"
                           );
    }

}


if (dbAlumnos.length !== 0) {
    ListarAlumnos();
} else {
    $("#dbAlumnos-list").append("<h2>No tienes alumnos </h2>");
}

function contarAlumnos(){
    var alumnos = dbAlumnos;
    nAlumnos = alumnos.length;

    $("#numeroAlumnos").append(
        "<a>Tienes actualmente" + "<br>" + "<span class='badge'>" + nAlumnos + "</span></a> Alumnos"
    );
    return nAlumnos;
}

function Eliminar(e){
    dbAlumnos.splice(e, 1); // Args (posición en el array, numero de items a eliminar)
    localStorage.setItem("dbAlumnos", JSON.stringify(dbAlumnos));
    return Mensaje(2);
}

function Editar() {
    console.log("Funcion editar"+d)
    dbAlumnos[d] = JSON.stringify({
        Nombre : $("#nombre").val(),
        Correo : $("#correo").val(),
        Edad : $("#edad").val(),
        Fecha_ingreso : $("#fecha_ingreso").val(),
    });
    localStorage.setItem("dbAlumnos", JSON.stringify(dbAlumnos));
    operacion = "A"; //Regresamos el valor original
    ListarAlumnos()
    limpiarFormulario()    
    return true;
}

$(".btnEliminar").on("click", function(){
    alert("¿Desea eliminar el alumno?");
    d = $(this).attr("id"); // "this" contiene el elemento clikeado en el contexto actual
    console.log(d);
    console.log(this);
    Eliminar(d); // Eliminamos el elemento llamando la funcion de eliminar
    ListarAlumnos();
});

$(".btnEditar").on("click", function() {
    alert("¿ Quieres editar ?");
    // Cambiamos el modo ( operacion )
    $(".modo").html("<span class=''>Edit</span> Modo edición");
    operacion = "E";
    d = $(this).attr("id");
    console.log(d);
    console.log(this);
    // Llenanos el formulario con los datos actuales del alumno a editar
    var AlumnoItem = JSON.parse(dbAlumnos[d]);
    $("#nombre").val(AlumnoItem.Nombre);
    $("#correo").val(AlumnoItem.Correo);
    $("#edad").val(AlumnoItem.Edad);
    $("#fecha_ingreso").val(AlumnoItem.Fecha_ingreso);
    $("#nombre").focus();
});


contarAlumnos();
// Esperar el evento de envio del formulario !!
$("#alumnos-form").on("submit", function() {
   // debugger;
    if (operacion == "A")
        return AgregarAlumno();
    else if (operacion == "E") {
        return Editar();
    }
});

function limpiarFormulario() {
    $("#nombre").val("")
    $("#correo").val("")
    $("#edad").val("")
    $("#fecha_ingreso").val("")
}
