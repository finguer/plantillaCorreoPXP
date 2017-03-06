/**
 * Created by faviofigueroa on 31/1/17.
 */

/**
 * Created by faviofigueroa on 22/1/17.
 */

(function ($) {
    // initialize all


    config.init();

    var user = config.usPxp;
    var contra = clientRestPxp._user;

    /*

     //'/seguridad/Auten/verificarCredenciales',
     ajax_dyd.data = {usuario: user, contrasena: contra};
     ajax_dyd.type = 'POST';
     ajax_dyd.url = 'pxp/lib/rest/seguridad/Auten/verificarCredenciales';
     ajax_dyd.dataType = 'html';
     ajax_dyd.async = true;
     ajax_dyd.sesionPXP(function (callback) {

     });
     */

    PlantillaCorreoPXP = {

        f: [
            /*{
             field : "Nombre Completo",
             mensaje:"solo uno, el mas usado",
             n: "nombre_funcionario",
             t: "text"
             },*/{
                field: "Nombre",
                mensaje: "solo uno, el mas usado",
                n: "nombre_funcionario",
                t: "text"
            }, {
                field: "Cargo",
                mensaje: "en Español",
                n: "cargo",
                t: "text"
            }, {
                field: "Cargo Ingles",
                mensaje: "",
                n: "cargo_ingles",
                t: "text"
            }, {
                field: "Gerencia",
                mensaje: "",
                n: "gerencia",
                t: "text"
            },/* {
                field: "Regional",
                mensaje: "Oficina",
                n: "oficina",
                t: "text"
            },*/ {
                field: "Direccion",
                mensaje: "solo calle y numero",
                n: "direccion",
                t: "text"
            }, {
                field: "Telefono Interno",
                mensaje: "interno",
                n: "telefono_interno",
                t: "text"
            }, {
                field: "Telefono Corporativo",
                mensaje: "",
                n: "telefonos_corporativos",
                t: "text"
            }, {
                field: "Telefono Personal",
                mensaje: "Opcional",
                n: "celular1",
                t: "text"
            }
        ],



        dib: function () {


            var m = '';
            $.each(PlantillaCorreoPXP.f, function (k, v) {
                console.log(v);
                //m += '<div >'+v.field + ' <span>'+v.mensaje+'</span><input class="input__field input__field--sae" type="' + v.n + '" id="' + v.n + '"  /></div>';
                m += '<span class="input input--sae">'
                    + '<input onblur="PlantillaCorreoPXP.onInputBlur(this)" onfocus="PlantillaCorreoPXP.onInputFocus(this)" class="input__field input__field--sae" type="text"  id="' + v.n + '" />'
                    + '<label class="input__label input__label--sae" for="' + v.n + '" >'
                    + '<i class="fa fa-fw fa-pencil icon icon--sae"></i>'
                    + '<span class="input__label-content input__label-content--sae">' + v.field + '</span>'
                    + '</label>'
                    + '</span>';

            });


            //m += '<div  id="plantilla" style="width: 100%; margin-right: auto;margin-left: auto;"></div>';
            // m += '<div >Previsualización</div>';
            // m += '<div style="cursor: pointer; text-align: right;" id="descargar" ><b>Descargar Imagen</b></div>';
            $("section").append(m);


        },

        onInputFocus: function (ev) {
            console.log('llegaacaaaaaa');
            $($(ev).parent()[0]).addClass('input--filled');

            //classie.add(ev.target.parentNode, 'input--filled');
        },

        onInputBlur: function (ev) {
            $($(ev).parent()[0]).removeClass('input--filled');

        },

        //peticiones
        obtenerFuncionario: function (parametros, callback) {


            ajax_dyd.data = parametros;
            ajax_dyd.type = 'POST';
            ajax_dyd.url = 'pxp/lib/rest/organigrama/Funcionario/getDatosFuncionario';
            ajax_dyd.dataType = 'json';
            ajax_dyd.async = true;
            ajax_dyd.peticion_ajax(function (resp) {

                if (typeof callback === "function") callback(resp);
            });


        },

        triggerDownload: function (imgURI) {
            var evt = new MouseEvent('click', {
                view: window,
                bubbles: false,
                cancelable: true
            });

            var a = document.createElement('a');
            a.setAttribute('download', 'mi_imagen.png');
            a.setAttribute('href', imgURI);
            a.setAttribute('target', '_blank');

            a.dispatchEvent(evt);
        },

        actualizarPlantillaSvg:function () {

            $("#svg_nombre_funcionario").html($("#nombre_funcionario").val());
            $("#svg_cargo").html($("#cargo").val());
            $("#svg_cargo_ingles").html($("#cargo_ingles").val());
            $("#svg_direccion").html($("#direccion").val());
            //telefono_interno//telefonos_corporativos//celular1
            var telefonos = '';
            if($("#telefono_interno").val() != ''){

                telefonos+=' Int. '+$("#telefono_interno").val();
            }

            if($("#telefonos_corporativos").val() != ''){

                telefonos+=' Corporativo. '+$("#telefonos_corporativos").val();
            }


            if($("#celular1").val() != ''){

                telefonos+=' Cel. '+$("#celular1").val();
            }

            $("#svg_telefonos").html(telefonos);
            //existe cargo en ingles
            if ($("#cargo_ingles").val() != '') {
                $("#svg_direccion").attr('transform', 'matrix(1 0 0 1 219.6667 88.1434)');
                $("#svg_telefonos").attr('transform', 'matrix(1 0 0 1 219.6667 108.1038)');
                $("#svg_oficina").attr('transform', 'matrix(1 0 0 1 219.6667 128.0642)');
            } else {
                //direccion debe subir transform="matrix(1 0 0 1 219.6667 70.1434)"
                $("#svg_direccion").attr('transform', 'matrix(1 0 0 1 219.6667 70.1434)');
                $("#svg_telefonos").attr('transform', 'matrix(1 0 0 1 219.6667 90.1434)');
                $("#svg_oficina").attr('transform', 'matrix(1 0 0 1 219.6667 110.0642)');

                //telefonos transform="matrix(1 0 0 1 219.6667 108.1038)"
            }

        },
        insertarLogGeneracionFirmaCorreo:function () {

            var nombre_funcionario = $("#nombre_funcionario").val();
            var cargo = $("#cargo").val();
            var cargo_ingles = $("#cargo_ingles").val();
            var direccion = $("#direccion").val();


            var telefono_interno = $("#telefono_interno").val();
            var telefono_corporativo = $("#telefonos_corporativos").val();
            var telefono_personal = $("#celular1").val();

            ajax_dyd.data = {

                id_funcionario : 14, //este id igual cambiar
                nombre :nombre_funcionario,
                cargo : cargo,
                cargo_ingles :cargo_ingles ,
                direccion : direccion,
                telefono_interno :telefono_interno ,
                telefono_corporativo :telefono_corporativo ,
                telefono_personal : telefono_personal
            };
            ajax_dyd.type = 'POST';
            ajax_dyd.url = 'pxp/lib/rest/organigrama/LogGeneracionFirmaCorreo/insertarLogGeneracionFirmaCorreo';
            ajax_dyd.dataType = 'json';
            ajax_dyd.async = true;
            ajax_dyd.peticion_ajax(function (resp) {

                console.log(resp)
                if (typeof callback === "function") callback(resp);
            });
            
        }

    };
    PlantillaCorreoPXP.dib();

    $("#plantilla").load("plantilla_boa_correo.svg", function (response) {


        PlantillaCorreoPXP.obtenerFuncionario({
            sort: "id_funcionario",
            limit: 1,
            start: 0,
            id_funcionario: 14 //gary solo debes cambiar esto que es el id del funcionario
        }, function (resp) {

            $.each(resp.datos, function (k, v) {

                $("#svg_oficina").html(v.oficina+' - '+v.lugar);

                $("#usuario_").html(v.nombre_funcionario)
                $.each(PlantillaCorreoPXP.f, function (i, h) {
                    $("#" + h.n).val(v[h.n]);
                    $("#svg_" + h.n).html(v[h.n]);


                });


            });
        });

    });


    $("#visualizar").click(function () {

        var tamanio;
        if ($(".footer_").hasClass('active')) {
            //esta activo
            tamanio = "1px";
            $(".footer_").removeClass('active');
        } else {

            PlantillaCorreoPXP.actualizarPlantillaSvg();

            tamanio = "250px";
            $(".footer_").addClass('active');

        }
        $(".footer_").animate({

            height: tamanio
        }, {
            step: function (now, fx) {

            }
        });

    });
    $(".descargar").click(function () {

        PlantillaCorreoPXP.actualizarPlantillaSvg();
        PlantillaCorreoPXP.insertarLogGeneracionFirmaCorreo();

        var svg = document.querySelector('svg');

        console.log('svg', svg)

        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');

        var data = (new XMLSerializer()).serializeToString(svg);
        var DOMURL = window.URL || window.webkitURL || window;

        var img = new Image();
        var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
        var url = DOMURL.createObjectURL(svgBlob);

        console.log(canvas)

        console.log(img.width + ',' + img.height)

        img.onload = function () {

            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 711, 162);

            // ctx.drawImage(img, 0, 0);
            DOMURL.revokeObjectURL(url);

            var imgURI = canvas
                .toDataURL('image/png')
                .replace('image/png', 'image/octet-stream');

            PlantillaCorreoPXP.triggerDownload(imgURI);
        };

        img.src = url;

    });
    $(".container").click(function () {

        //esta activo
        tamanio = "1px";
        $(".footer_").removeClass('active');

        $(".footer_").animate({

            height: tamanio
        }, {
            step: function (now, fx) {

            }
        });
    });


})
(jQuery);
