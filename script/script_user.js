const title = document.getElementById("userName");
const email = document.getElementById("userEmail");
const createdAt = document.getElementById("userCreation");

const fetchUser = async () => {
  const token = localStorage.getItem("token");

  console.log(token);
  if (!token) {
    window.location.href = "/login.html";
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:3000/getMyProfile`, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await response.json();

    if (response.status === 401 || response.status === 403) {
      window.location.href = "/login.html";
      return;
    }

    

    title.innerHTML = user.user.name;
    email.innerHTML = user.user.email;
    createdAt.innerHTML = user.user.createdAt;

  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération du profil:", error);

  }
};

fetchUser();