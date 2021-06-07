import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector("#eliminar-proyecto");

if (btnEliminar) {
  btnEliminar.addEventListener("click", () => {
    Swal.fire({
      title: "Deseas borrar este proyecto?",
      text: "No podras recuperarlo si lo borras",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dd242f",
      cancelButtonColor: "#48b697",
      confirmButtonText: "Si, Borrar",
      cancelButtonText: "No, Cancelar.",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Proyecto Eliminado",
          "Su proyecto se ha eliminado",
          "success"
        );

        //   redirect home
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }
    });
  });
}

// red: #dd242f
// amarillo: #f8a228
// gree: #48b697

export default btnEliminar;
