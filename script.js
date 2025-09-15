// Función de registro de usuario
function registerUser() {
    let name = document.getElementById("registerName").value;
    let email = document.getElementById("registerEmail").value;
    let password = document.getElementById("registerPassword").value;

    if (name && email && password) {
        let user = { name, email, password, games: [] };
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Usuario registrado exitosamente.");
        window.location.href = "login.html"; // Redirigir al login
    } else {
        alert("Por favor complete todos los campos.");
    }
}

// Función de inicio de sesión
function loginUser() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "game-list.html"; // Redirigir a la lista de juegos
    } else {
        alert("Credenciales incorrectas.");
    }
}

// Función para crear un juego
// Función para crear un juego
function createGame() {
    let gameTitle = document.getElementById("gameTitle").value;
    let gameQuestions = document.getElementById("gameQuestions").value;
    let gameAnswers = document.getElementById("gameAnswers").value;

    // Obtener el usuario logueado desde localStorage
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (gameTitle && gameQuestions && gameAnswers) {
        let game = {
            title: gameTitle,
            questions: gameQuestions.split(","), // Convertir las preguntas en un array
            answers: gameAnswers.split(","), // Convertir las respuestas en un array
            creator: loggedInUser.email
        };

        // Verificar si el usuario tiene juegos almacenados y agregar el nuevo juego
        loggedInUser.games = loggedInUser.games || [];
        loggedInUser.games.push(game);

        // Guardar el usuario actualizado en localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        alert("Juego creado exitosamente.");
        window.location.href = "game-list.html"; // Redirigir a la lista de juegos
    } else {
        alert("Por favor complete todos los campos.");
    }
}


// Función para mostrar los juegos
function displayGames() {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let gameListContainer = document.getElementById("gameList");

    if (loggedInUser && loggedInUser.games.length === 0) {
        gameListContainer.innerHTML = "<p>No has creado juegos aún.</p>";
    } else {
        loggedInUser.games.forEach(game => {
            let gameItem = document.createElement("div");
            gameItem.classList.add("game-item");
            gameItem.innerHTML = `
                <h3>${game.title}</h3>
                <p>Preguntas: ${game.questions.join(", ")}</p>
                <button onclick="editGame('${game.title}')">Editar</button>
                <button onclick="deleteGame('${game.title}')">Eliminar</button>
            `;
            gameListContainer.appendChild(gameItem);
        });
    }
}

// Función para editar un juego (solo el creador puede hacerlo)
function editGame(gameTitle) {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let game = loggedInUser.games.find(g => g.title === gameTitle);

    if (game && game.creator === loggedInUser.email) {
        // Aquí puedes agregar la lógica para permitir la edición
        console.log("Editar juego:", game);
    } else {
        alert("Solo el creador del juego puede editarlo.");
    }
}

// Función para eliminar un juego
function deleteGame(gameTitle) {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    loggedInUser.games = loggedInUser.games.filter(game => game.title !== gameTitle);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    alert("Juego eliminado exitosamente.");
    window.location.reload();
}

// Ejecutar la función de mostrar juegos
if (document.getElementById("gameList")) {
    displayGames();
}
