const listaNotas = document.getElementById("listaNotas");
let notas = JSON.parse(localStorage.getItem("notas")) || [];

function mostrarNotas() {
    listaNotas.innerHTML = "";
    notas.forEach((nota, i) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.innerHTML = `<strong>${nota.texto}</strong><br><small>${nota.fecha}</small>`;

        // 🔥 Botón para eliminar nota
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.style.marginLeft = "10px";
        btnEliminar.addEventListener("click", () => {
            notas.splice(i, 1);
            localStorage.setItem("notas", JSON.stringify(notas));
            mostrarNotas();
        });

        li.appendChild(span);
        li.appendChild(btnEliminar);
        listaNotas.appendChild(li);
    });
}

document.getElementById("guardar").addEventListener("click", () => {
    const texto = document.getElementById("nota").value.trim();
    if (texto !== "") {
        const fecha = new Date().toLocaleString(); // 🕒 Aquí se genera la fecha
        notas.push({ texto, fecha }); // 🧠 Guardamos texto + fecha como objeto
        localStorage.setItem("notas", JSON.stringify(notas));
        mostrarNotas();
        document.getElementById("nota").value = "";
    }
});

document.getElementById("borrar").addEventListener("click", () => {
    localStorage.removeItem("notas");
    notas = [];
    mostrarNotas();
});

mostrarNotas();