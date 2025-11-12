     let segundos = 0;
    let intervalo;

    function actualizarCronometro() {
      const hrs = String(Math.floor(segundos / 3600)).padStart(2, "0");
      const mins = String(Math.floor((segundos % 3600) / 60)).padStart(2, "0");
      const secs = String(segundos % 60).padStart(2, "0");

      const cronometro = document.getElementById("cronometro");
      cronometro.textContent = `${hrs}:${mins}:${secs}`;

      // 🎯 Activar animación solo a los 10 segundos
      if (segundos === 10) {
        cronometro.classList.add("animar");
        setTimeout(() => {
          cronometro.classList.remove("animar");
        }, 500);
      }
    }

    document.getElementById("iniciar").addEventListener("click", () => {
      if (!intervalo) {
        intervalo = setInterval(() => {
          segundos++;
          actualizarCronometro();
        }, 1000);
      }
    });

    document.getElementById("pausar").addEventListener("click", () => {
      clearInterval(intervalo);
      intervalo = null;
    });

    document.getElementById("reiniciar").addEventListener("click", () => {
      segundos = 0;
      clearInterval(intervalo);
      actualizarCronometro();
      intervalo = null;
    });
