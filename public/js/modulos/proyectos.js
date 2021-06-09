import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector("#eliminar-proyecto");

if (btnEliminar) {
  btnEliminar.addEventListener("click", (e) => {
    const urlProyecto = e.target.dataset.proyectoUrl;

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
        // enviar peticion axios
        const url = `${location.origin}/proyectos/${urlProyecto}`;

        axios
          .delete(url, { params: { urlProyecto } })
          .then(function (respuesta) {
            console.log(respuesta);

            Swal.fire(
              "Proyecto Eliminado",
              "Su proyecto se ha eliminado",
              "success"
            );

            //   redirect home
            setTimeout(() => {
              window.location.href = "/";
            }, 3000);
          })
          .catch(() => {
            Swal.fire({
              type: "error",
              title: "Hubo un error",
              text: "No se pudo eliminar el proyecto",
            });
          });
      }
    });
  });
}

export default btnEliminar;
