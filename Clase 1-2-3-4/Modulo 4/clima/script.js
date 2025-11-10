const apiKey = "908ba0783399f0e8a7a8c0e278a504d3"; // 🔑 Regístrate en openweathermap.org

document.getElementById("buscar").addEventListener("click", async () => {
  const ciudad = document.getElementById("ciudad").value.trim();
  if (!ciudad) return alert("Ingrese una ciudad");

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${apiKey}`
    );

    const data = await res.json();

    if (data.cod !== 200) {
      document.getElementById("resultado").innerHTML = "❌ Ciudad no encontrada";
      return;
    }

    document.getElementById("resultado").innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡 Temp: ${data.main.temp}°C</p>
      <p>💨 Viento: ${data.wind.speed} km/h</p>
      <p>☁️ Clima: ${data.weather[0].description}</p>
    `;
  } catch (error) {
    document.getElementById("resultado").innerHTML = "⚠️ Error al conectar con la API";
  }
});
