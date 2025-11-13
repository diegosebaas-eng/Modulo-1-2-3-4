document.getElementById("buscar").addEventListener("click", () => {
    const user = document.getElementById("usuario").value.trim();
    if (!user) return alert("Ingrese un usuario");

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "🔍 Buscando...";

    // Primero obtenemos el perfil del usuario
    fetch(`https://api.github.com/users/${user}`)
        .then(res => {
            if (!res.ok) throw new Error("Usuario no encontrado");
            return res.json();
        })
        .then(userData => {
            // Luego obtenemos los repositorios ordenados por fecha de creación
            return fetch(`https://api.github.com/users/${user}/repos?sort=created&direction=desc`)
                .then(res => res.json())
                .then(reposData => {
                    // Armamos el HTML con perfil + últimos repos
                    let reposHTML = reposData.slice(0, 5).map(repo => `
                        <li>
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                            ⭐ ${repo.stargazers_count} | 🛠️ ${repo.language || "Sin lenguaje"}
                        </li>
                    `).join("");

                    resultado.innerHTML = `
                        <img src="${userData.avatar_url}" alt="Avatar" width="100">
                        <h2>${userData.login}</h2>
                        <p>👥 Seguidores: ${userData.followers}</p>
                        <p>📦 Repos públicos: ${userData.public_repos}</p>
                        <p>📍 Ubicación: ${userData.location || "No disponible"}</p>
                        <a href="${userData.html_url}" target="_blank">Ver perfil</a>
                        <h3>🆕 Últimos repositorios:</h3>
                        <ul>${reposHTML}</ul>
                    `;
                });
        })
        .catch(error => {
            resultado.innerHTML = `❌ ${error.message}`;
        })
        .finally(() => console.log("✅ Búsqueda finalizada"));
});