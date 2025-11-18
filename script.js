const usernameInput = document.getElementById("username");
const suggestionBox = document.getElementById("suggestions");
const showprofile = document.getElementById("showprofile");


function debounce(fn, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, arguments), delay);
    };
}


function fetchProfile() {
    const username = usernameInput.value.trim();
    if (username === "") return;

    showprofile.innerHTML = `<div class='loader'></div>`;

    fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(data => {
        showprofile.innerHTML = `
        <div class="profile-card">
            <img class="profile-pic" src="${data.avatar_url}" alt="">
            <h2>${data.name || "No name"}</h2>
            <p>Bio: <span>${data.bio || "N/A"}</span></p>
            <p>Location: <span>${data.location || "N/A"}</span></p>
            <p>Followers: <span>${data.followers}</span></p>
            <p>Following: <span>${data.following}</span></p>
            <p>Public Repos: <span>${data.public_repos}</span></p>
            <p>GitHub: <a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
            <p>Website: <a href="${data.blog}" target="_blank">${data.blog}</a></p>
        </div>
        `;
    });
}


usernameInput.addEventListener("keyup", debounce(async () => {

    
    if (usernameInput.value.trim() === "") {
        location.reload();
        return;
    }

    const query = usernameInput.value.trim();
    const url = `https://api.github.com/search/users?q=${query}`;

    const res = await fetch(url);
    const data = await res.json();

    suggestionBox.innerHTML = "";
    suggestionBox.style.display = "block";

    data.items.slice(0, 5).forEach(user => {
        let div = document.createElement("div");
        div.className = "suggestion-item";

        div.innerHTML = `
            <img src="${user.avatar_url}">
            <span>${user.login}</span>
        `;

      
        div.onclick = () => {
            usernameInput.value = user.login;
            suggestionBox.style.display = "none";
            fetchProfile();
        };

        suggestionBox.appendChild(div);
    });

  
    fetchProfile();

}, 400));
