document.addEventListener("DOMContentLoaded", function() {
    const formulaire = document.getElementById("inscription-form");
    formulaire.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const creation = await fetch("http://127.0.0.1:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                }),
            });

            const result = await creation.json();

            if (creation.status === 201) {
                console.log("Compte créé avec succès");
                
                window.location.href = "C:/Users/leuya/OneDrive/Bureau/CODING/node%20cours/node.js/login.html";
            } else {
                console.error("Erreur lors de la création du compte:", result.message);

            }
        } catch (error) {
            console.error("Erreur", error);

        }
    });
});