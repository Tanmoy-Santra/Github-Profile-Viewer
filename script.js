function fetchProfile() {
    document.getElementById('showprofile').innerHTML =`
    <div class="profile-card">   
<img class="profile-pic" id="profile-pic" src="" alt="Profile Picture">
<h2 id="name">Loading...</h2>
<p>Bio: <span id="bio">Loading...</span></p>
<p>Location: <span id="location">Loading...</span></p>
<p>Followers: <span id="followers">Loading...</span></p>
<p>Following: <span id="following">Loading...</span></p>
<p>Public Repos: <span id="public_repos">Loading...</span></p>
<p>Github: <span><a href="#" id="github">Loading...</a></span></p>
<p>Website: <span><a href='#' id="website">Loading...</a></span></p>
</div>            `
    const username = document.getElementById('username').value;
    const requestUrl = `https://api.github.com/users/${username}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', requestUrl);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            const data = JSON.parse(this.responseText);
            document.getElementById('profile-pic').src = data.avatar_url || '#';
            document.getElementById('name').innerText = data.name || 'No data found';
            document.getElementById('bio').innerText = data.bio || 'No data found';
            document.getElementById('location').innerText = data.location || 'No data found';
            document.getElementById('followers').innerText = data.followers || 'No data found';
            document.getElementById('following').innerText = data.following || 'No data found';
            document.getElementById('public_repos').innerText = data.public_repos || 'No data found';
            document.getElementById('website').href = data.blog || '#';
            document.getElementById('website').innerText = data.blog ? data.blog : 'No data found';
            document.getElementById('github').href = data.html_url || '#';
            document.getElementById('github').innerText = data.html_url ? data.html_url : 'No data found';
        }
    }
    xhr.send();
}
