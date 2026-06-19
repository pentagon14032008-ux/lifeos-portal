window.history.pushState(
    null,
    "",
    window.location.href
);

window.addEventListener(
    "popstate",
    () => {

        window.history.pushState(
            null,
            "",
            window.location.href
        );

    }
);

async function checkSession() {

    const { data } =
    await supabaseClient.auth.getSession();

    if (!data.session) {

        window.location.href =
        "index.html";

        return;
    }

    console.log("Portal Access Granted");
}

checkSession();

const texts = [

    "Created by Abdujabbor Otavaliyev",

    "Build your life like a System",

    "Discipline. Consistency. Evolution.",

    "One Portal. Unlimited Growth.",

    "Life OS ecosystem"
];

let index = 0;

const typingText =
document.getElementById("typing-text");

function changeText(){

    typingText.style.opacity = 0;

    setTimeout(() => {

        typingText.textContent =
        texts[index];

        typingText.style.opacity = 1;

        index++;

        if(index >= texts.length){
            index = 0;
        }

    },300);
}

changeText();

setInterval(changeText,3000);

let portalProfileSync = null;

function renderPortalProfile(profile) {

    if (!profile) {
        return;
    }

    const profileName =
        document.getElementById(
            "profileName"
        );

    const profileEmail =
        document.getElementById(
            "profileEmail"
        );

    const profileNameInput =
        document.getElementById(
            "profileNameInput"
        );

    const profileEmailInput =
        document.getElementById(
            "profileEmailInput"
        );

    const profileAvatar =
        document.getElementById(
            "profileAvatar"
        );

    const displayName =
        profile.display_name ||
        profile.email ||
        "LifeOS User";

    const email =
        profile.email ||
        "";

    const avatar =
        displayName
            .charAt(0)
            .toUpperCase();

    if(profileName){
        profileName.textContent =
        displayName;
    }

    if(profileEmail){
        profileEmail.textContent =
        email;
    }

    if(profileNameInput){
        profileNameInput.value =
        displayName;
    }

    if(profileEmailInput){
        profileEmailInput.value =
        email;
    }

    if(profileAvatar){
        profileAvatar.textContent =
        avatar;
    }
}

const initialPortalProfile =
readProfileCache();

if(initialPortalProfile){
    renderPortalProfile(initialPortalProfile);
}

const profileBtn =
document.getElementById("profileBtn");

const profileDropdown =
document.getElementById("profileDropdown");

if(profileBtn){

    profileBtn.addEventListener(
        "click",
        () => {

            profileDropdown.classList.toggle(
                "active"
            );

        }
    );

}

document.addEventListener(
    "click",
    (e) => {

        if(
            !profileBtn.contains(e.target)
            &&
            !profileDropdown.contains(e.target)
        ){

            profileDropdown.classList.remove(
                "active"
            );

        }

    }
);

const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener(
        "click",
        async () => {

            await supabaseClient.auth.signOut();

            sessionStorage.clear();
            localStorage.clear();

            window.location.replace(
                "index.html"
            );

        }
    );

}

const openSL =
document.getElementById("openSL");

if(openSL){

    openSL.addEventListener(
        "click",
        () => {

            window.location.href =
            "https://start-leveling.netlify.app/";

        }
    );

}

const openTB =
document.getElementById("openTB");

if(openTB){

    openTB.addEventListener(
        "click",
        () => {

            window.location.href =
            "https://trading-base.netlify.app/";

        }
    );

}

const myProfileBtn =
document.getElementById("myProfileBtn");

const profilePanel =
document.getElementById("profilePanel");

const profileOverlay =
document.getElementById("profileOverlay");

if(myProfileBtn){

    myProfileBtn.addEventListener(
        "click",
        () => {

            profilePanel.classList.add(
                "active"
            );

            profileOverlay.classList.add(
                "active"
            );

        }
    );

}

if(profileOverlay){

    profileOverlay.addEventListener(
        "click",
        () => {

            profilePanel.classList.remove(
                "active"
            );

            profileOverlay.classList.remove(
                "active"
            );

        }
    );

}

async function loadUserProfile() {

    const { data, error } =
    await supabaseClient.auth.getUser();

    if (error || !data.user) {
        return;
    }

    const user = data.user;
    const userId = user.id;

    portalProfileSync = new ProfileSync(userId);

    window.addEventListener(
        "profileUpdated",
        (event) => {
            renderPortalProfile(event.detail);
        }
    );

    await loadProfile(portalProfileSync);

    window.addEventListener(
        "focus",
        () => {
            if (portalProfileSync) {
                loadProfile(portalProfileSync);
            }
        }
    );

}

loadUserProfile();

const saveProfileBtn =
document.getElementById(
    "saveProfileBtn"
);

if(saveProfileBtn){

    saveProfileBtn.addEventListener(
        "click",
        async () => {

            if(!portalProfileSync){
                return;
            }

            const displayName =
            document.getElementById(
                "profileNameInput"
            ).value.trim();

            const success = await portalProfileSync.updateProfile({
                display_name: displayName
            });

            if(!success){
                alert(
                    "Profile save failed"
                );
                return;
            }

            alert(
                "Profile updated successfully"
            );

        }
    );

}
