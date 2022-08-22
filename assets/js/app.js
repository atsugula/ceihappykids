$(document).ready(function incluirHTML() {
  /* Agregar y quitar clase active del menu */
  var pathname, pagina, index, elementoAcutal;
  pathname = window.location.pathname;
  pagina = pathname.split('/');
  if(pagina[1] != ""){
    index = $('#index').removeClass('active');
    elementoAcutal = $('#'+pagina[1]).addClass('active');
  }
  var elementos, i, elemento, archivo, solicitud;
  /* Recorrer una colección de todos los elementos HTML: */
  elementos = document.getElementsByTagName("*");
  for (i = 0; i < elementos.length; i++) {
    elemento = elementos[i];
    /*buscar elementos con un determinado atributo:*/
    archivo = elemento.getAttribute("atsu-incluir-html");
    if (archivo) {
      /* Realizar una petición HTTP utilizando el valor del atributo como nombre del archivo: */
      solicitud = new XMLHttpRequest();
      solicitud.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elemento.innerHTML = this.responseText;}
          if (this.status == 404) {elemento.innerHTML = "Archivo no encontrado.";}
          /* Elimina el atributo, y llama a esta función una vez más: */
          elemento.removeAttribute("atsu-incluir-html");
          incluirHTML();
        }
      }
      solicitud.open("GET", archivo, true);
      solicitud.send();
      /* Salir de la función: */
      return;
    }
  }
})