$(document).ready(function () {
    showLoading();
});

function OcultarLoadingMensaje() {
    $("#progressModal").modal('hide');
}

function CerrarModal() {
    $.modal.close();
};

function ValidarContent() {
    var timout;
    var table = $('#datosPlanillasnounicas').DataTable();
    var data = table.rows().rows({ selected: true }).data().toArray();

    if (data.length > 0) {
        timout = setTimeout(function () {

            OcultarLoadingMensaje();
            hideLoading();
        }, 3000);

    } else {
        $('#supervisor').text('');
        $('#asesor').text('');
        $('#gestor').text('');
        $('#razonsocial').text('');
        $('#nit').text('');
        OcultarLoadingMensaje();
        hideLoading();
        $('#modalMensajes').modal('show');
    }
}

/*datos seleccionado de la tabla*/
function DatosSeleccionados() {
    var count = 0;
    var table = $('#datosPlanillasnounicas').DataTable();
    var datos = table.rows().rows({ selected: true }).data().toArray();
    var user = $('#user').val();
    table.rows().every(function (rowIdx, tableLoop, rowLoop) {
        var data = this.node();
        var checksi = $(data).find("input[id='si" + rowIdx + "']").prop('checked');
        var checkno = $(data).find("input[id='no" + rowIdx + "']").prop('checked');

        if (!checksi && !checkno) {
            count = count + 1
        } else if (checksi || checkno) {
            if ($(data).find('select').val() != "") {
                console.log($(data).find('select').val());
               // console.log(datos[count][1]);
            } 
        }
    });
    if (datos.length > 0) {
        if (count === datos.length) {
            $('#planillasNinguna').modal('show');
        }
    }
   
}

/*Valida la seleccion chebox del archivo valido */
function Uncheck(column, accion) {
    var selectid = document.getElementById("cj" + column);
    var array;
    var idcod;
    if (accion == 'si') {
        if ($('#si' + column).is(':checked')) {
            $('#no' + column).prop('checked', false);
            array = ["Planilla Complementaria", "Planilla Pendiente de pago", "Planilla Pagada"];
            idcod = ["CJPC", "CJPPP", "CJPP"];
            selectid.innerHTML = '<option value="">Seleccione un codigo..</option>'
            OptionSelec(selectid, array, idcod);
          
            selectid.disabled = false;
        } else {
            selectid.disabled = true;
            selectid.innerHTML = '<option value="" style="font-weight:bold">Seleccione archivo valido (si o no).</option>'
        }
    } else if (accion == 'no') {
        if ($('#no' + column).is(':checked')) {
            $('#si' + column).prop('checked', false);
            array = ["Planilla Duplicadas"];
            idcod = ["CJPD"];
            selectid.innerHTML = '<option value="">Seleccione un codigo..</option>'
            OptionSelec(selectid, array, idcod);
            selectid.disabled = false;
        } else {
            selectid.disabled = true;
            selectid.innerHTML = '<option value="" style="font-weight:bold">Seleccione archivo valido (si o no).</option>'
        }
    }
}
/*llena la lista segun lo seleccionado chebox*/
function OptionSelec(select, array,idcodigos) {

    var selectid = select;

    for (i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = idcodigos[i]
        option.innerHTML = array[i];
        selectid.appendChild(option);
    }
}

/*subir comprobante de planillas pagada*/
function Upload(name, column) {
    if ($('#cj' + column).val() == 'CJPP') {
        console.log("Se puede mostrar modal");
    }
}


