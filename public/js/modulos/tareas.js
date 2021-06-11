import axios from "axios";
import Swal from "sweetalert2";
import { actualizarAvance } from "../funciones/avance";

const tareas = document.querySelector(".listado-pendientes");

if (tareas) {
  tareas.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-check-circle")) {
      const icono = e.target;
      const idTarea = icono.parentElement.parentElement.dataset.tarea;

      //   location.origin = sirve para mostrar la url actual,local o deploy
      const url = `${location.origin}/tareas/${idTarea}`;

      axios.patch(url, { idTarea })
      .then(function (respuesta) {
        console.log(respuesta);

        if(respuesta.status === 200 ){
          icono.classList.toggle('completo')

          actualizarAvance()
        }
      });
    }
    if (e.target.classList.contains("fa-trash")) {
      // capturar todo la seccionHtml que queremos desaparecer con el verbo http
      const tareaHTML = e.target.parentElement.parentElement,
        idTarea = tareaHTML.dataset.tarea;

      Swal.fire({
        title: "Deseas borrar esta tarea?",
        text: "No podras recuperarla si lo borras",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dd242f",
        cancelButtonColor: "#48b697",
        confirmButtonText: "Si, Borrar",
        cancelButtonText: "No, Cancelar.",
      }).then((result) => {
        if (result.isConfirmed) {
          const url = `${location.origin}/tareas/${idTarea}`;

          axios.delete(url, { params: { idTarea } })
          .then(function (respuesta) {
            if(respuesta.status === 200){

              console.log(respuesta)
              // eliminar el nodo
              tareaHTML.parentElement.removeChild(tareaHTML)

              // mostrar una alerta
              Swal.fire(
                'Ups! parece que algo se borro.',
                respuesta.data,
                'success'
              )

              actualizarAvance()
            }
            
            
            
          });
        }
      });
    }
  });
}

export default tareas;
