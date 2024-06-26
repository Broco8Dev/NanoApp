serverUrl = getFromLocalStorage("ip");
var lightMode = true;

var importedImage = null;

var menuOpen = false;

if(serverUrl == null) {
    appendMessage("System Warning", "https://img.icons8.com/fluency-systems-regular/48/a52a2a/box-important--v1.png", "There is no nVision Hub IP Added. Check our tutorials to learn how to set up the hub locally or across networks.");
} else {
    const lastChar = serverUrl.charAt(serverUrl.length - 1);

    if(lastChar == '/' && !serverUrl.includes("query")) {
        serverUrl += "query";
    } else if(!serverUrl.includes("/query")) {
        serverUrl += "/query";
    }

    if(!serverUrl.includes("http://") && !serverUrl.includes("https://")) {
        serverUrl = "http://" + serverUrl;
    }
}

resetConvo = false;
generatingResponse = false;
settingsOpened = false;

importedpfp = "";
pfp = getFromLocalStorage("pfp")
if(pfp == null) {
    pfp = "data:image/jpeg;base64, /9j/4AAQSkZJRgABAQEAkACQAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCABQAFADASIAAhEBAxEB/8QAHAABAQEAAwADAAAAAAAAAAAAAAgGAwUHAQIE/8QAQBAAAQMDAgEGCQcNAAAAAAAAAQACAwQFBgcRIRMXIjFBcRIyUVZhYoGV0ggVGFeRltMUIyVCc3WCkpOiscHh/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAIDBAEFBv/EACARAAMAAQQDAQEAAAAAAAAAAAABAhEDEhNRBCExMkH/2gAMAwEAAhEDEQA/AKbREXzR9GEREAETqRABERABERABERABZ7N81teDWc3O4AyyyOMdNTsOzpn7b7egDrJ7O8gLQqaNbr7Ld88qqLlCae1NbSRN34B2wdIfa47fwhLTwimlG+sM4rzrTn92ndJBdxbYiejDRxtaGjyFxBce/dfWz6z6g2qobLNeTcYgelDWxteHDyeEAHDvBWHRS3M2cc4xgrLBc6ted2k19C0wVEJDKqlc7d0Lj1bHtaew9/aFpFMWjN9lsue0MHKEQXQmimb2HwuLD7HAfaVTqrLyjHqxsr0ERExMIiIADrCkTOHvkzO/Pk8Y3Ko3/qFV2ps1rxOsseW1N7bA42+7v5dkoHRbMR04yew77keUHvSX8L+O0qweeIiKRrO1xR748psz49/CbcKYjb9q1WE7xnd5Uy6N4lWZDl1Jc+Qd832mVtTPKR0S9vFkYPaS7Y7dgB9CplVj4ZPIabSCIicgEREAFxVVJS10D6StpYqmCUbPilYHsePSDwK/FkGQWnF7VNeL1VCCmh4b7bue49TWj9Zx7B/pT5mWtGU5JJJTWqd9otx3aIoHbTPHryDj7G7DvSukikadX8PWLtphpLHIZLjbaGgcT4or3U4/lLxt9i+LXphpJLIH2+30Ne4HxTcHT/2h/FTQ8mV5klJe93Euf0ie8nijDybxJH0HjiHN4Ee0JNy6NHFWP0WfSUVJbqdlFQUcNLBENmQwxhjW9wC5lM+Hay5XjMkdPcKh93tzeBgqHbyMb6kh4g+g7juVCY3kloyu1RXiy1PKwSdFwI2fG8dbHjscP+jcJ1SZnvTqPp2iIiYmEA3O3+VgfpA6C/XbgP3lovxF0GefKK0YpcNu77PrHhNTWvpnQwR0+Q0j5PCeQ3cASbnYEn2JtldCqpbxk871WzmTNMjkFNK75rt7nQ0bN+DtuDpT5S4jh5G7elYpZznJ05HAZ9jmw6v0rB8Sc5WnXn9jnvWD4lBxb/jPQV6crCaNGiznOVp15/Y571g+JOcrTrz+xz3rB8S5x30zvLHaNGtfphnEuE5JFPNI42ysc2Guj34eDvwkHrNJ37twvLecrTrz+xz3rB8Sc5OnJ4HPsc2/esHxLqi17wzj1NOlhtF88CN2kEHiCDuCPKEXjunPyiNGJsItDbzrDhVNWwQfk8sdRkFIx/5slrSQ6QHi0NK0n0gdBfrtwH7y0X4ivsro891KeMn/2Q=="
}

username = getFromLocalStorage("username")
if(username == null) {
    username = "You";
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
    console.log(`Saved '${value}' to local storage under the key '${key}'`);
}

function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    console.log(`Retrieved '${value}' from local storage for the key '${key}'`);
    return value;
}

function changeIFrameSource(newSource) {
    var myIFrame = document.getElementById("myIFrame");
    myIFrame.src = newSource;
}

function openSettings() {
    const settingsContainer = document.getElementById("settings");
    bg = "";
        settingsContainer.innerHTML = `
        <div class="settings" style="background-color:white;">
            <img class="button" onclick="toggleSettings();" width="30" height="30" src="https://img.icons8.com/ios/120/c6cacf/delete-sign--v1.png" alt="delete-sign--v1"/>
    
            <h3 style="margin-bottom: 0px;">Customization</h3>
            <input type="text" id="usernamefield" class="settings-fields" placeholder="Change Username ( Current = ${username} ) ...">
            <button onclick="importPFP();" id="choose-image" class="settings-buttons">Change Profile Picture ...</button>
            <button onclick="swapColor(); openSettings();" id="choose-image" class="settings-buttons">Toggle Theme</button>
    
            <h3 style="margin-bottom: 0px;">Advanced</h3>
            <input type="file" id="file-input" accept="image/*">
            <input type="text" id="ipfield" class="settings-fields" placeholder="Change Hub IP ( Current = ${serverUrl} ) ...">
    
            <h3 style="margin-bottom: 0px;">Apply</h3>
            <button style="margin-top: 15px;" onclick="applySettings();" class="settings-buttons">Apply All</button>
        </div>`;

    const settingsDiv = settingsContainer.querySelector('.settings');

    settingsDiv.style.opacity = 0;
    settingsDiv.style.transition = 'opacity 0.5s';

    setTimeout(() => {
        settingsDiv.style.opacity = 1;
    }, 0);

    document.getElementById("chatpage").classList.remove("non-blurred");
    document.getElementById("chatpage").classList.add("blurred");
    document.getElementById("chatpage").classList.add("inactive");
}

function importFile() {
    var input = document.createElement('input');
    input.type = 'file';

    input.addEventListener('change', function() {
        var file = this.files[0];

        if (file.type.match(/^image\//)) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var base64Image = e.target.result;
                console.log("Base64 encoded image:", base64Image);
                var elem = document.getElementById("imported-holder");
                
                importedImage = base64Image.toString();
                console.log(importedImage);

                if(elem == null) {
                    document.getElementById("imported-pending").innerHTML = '<div class="imported-holder" id="imported-holder"></div>';
                    document.getElementById("imported-holder").innerHTML = '<img onclick="clearImportedFiles();" class="imported-del" width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/48/trash--v1.png" alt="trash--v1"/>'
                }

                document.getElementById("imported-holder").innerHTML +=
                `<img class="chatbar-image" src="${base64Image}"></img>`;

                console.log("HELLO");
                    var chatBox = document.getElementById('chat');
                    var contentHeight = 630;
                    chatBox.style.height = contentHeight + 'px';


                setTimeout(() => {
                    document.getElementById("imported-holder").classList.add('animate');
                }, 100);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please select an image file.");
        }
    });


    input.click();
}

async function clearImportedFiles() {
    importedImage = null;
    var elem = document.getElementById("imported-holder");
    elem.classList.remove('animate');

    await delay(200);

    document.getElementById("imported-pending").innerHTML = '';
    var chatBox = document.getElementById('chat');
    chatBox.style.height = 'calc(100vh - 200px)';
   
}

const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), millis)
  });

function importPFP() {
    document.getElementById('choose-image').addEventListener('click', function () {
        document.getElementById('file-input').click();
    });

    document.getElementById('file-input').addEventListener('change', function () {
        var fileInput = document.getElementById('file-input');
        var file = fileInput.files[0];

        if (!file) {
            alert('Please select an image file');
            return;
        }

        var reader = new FileReader();

        reader.onload = function (event) {
            var img = new Image();
            img.onload = function () {
                var canvas = document.createElement('canvas');
                canvas.width = 80;
                canvas.height = 80;

                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, 80, 80);

                var base64String = canvas.toDataURL('image/png');
                if(base64String != "" ) {
                importedPFP = base64String;
                }

                document.getElementById('display-image').src = importedPFP;
            };

            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    });
}


function closeSettings() {
    const settingsContainer = document.getElementById("settings");
    const settingsDiv = settingsContainer.querySelector('.settings');
    
    if (settingsDiv) {
        settingsDiv.style.opacity = 0;
        settingsDiv.style.transition = 'opacity 0.2s';

        settingsDiv.addEventListener('transitionend', function(event) {
            if (event.propertyName === 'opacity') {
                settingsContainer.innerHTML = '';
                const chatpage = document.getElementById("chatpage");
                chatpage.classList.remove("blurred");
                chatpage.classList.add("non-blurred");
                document.getElementById("chatpage").classList.remove("inactive");
            }
        });
    }
}


function applySettings() {
    changeUsername();
    changeIP();

    if(importedPFP != "") {
        pfp = importedPFP;
        saveToLocalStorage("pfp", pfp);
    }
}


function toggleSettings() {
    settingsOpened = !settingsOpened;
    if(settingsOpened) {
        openSettings();
    } else {
        closeSettings();
    }
}

function handleKeyDown(event) {
    if (event.key === 'Enter' && !generatingResponse) {
        confirmMessage();
    }
}

function confirmMessage() {
    resetConvo = false;
    const textField = document.getElementById('input1');
    const textValue = textField.value;
    textField.value = '';
    appendMessage(username, pfp, textValue);
    callAI(textValue);
    generatingResponse = true;
}

function changeUsername() {
        const inputField = document.getElementById("usernamefield");
        const textField = inputField;
        const textValue = textField.value;

        if(textValue != "") {
            username = textValue;
            textField.value = '';
            document.getElementById('usernamefield').placeholder = "Change Username ( Current = " + username + " ) ...";
            saveToLocalStorage("username", username);
        }
}

function changeIP() {
    const inputField = document.getElementById("ipfield");
    const textField = inputField;
    const textValue = textField.value;

    if(textValue != "") {
        serverUrl = textValue;
        textField.value = '';
        document.getElementById('ipfield').placeholder = "Change Hub IP ( Current = " + serverUrl + " ) ...";
        saveToLocalStorage("ip", serverUrl);
        window.location.reload();
    }
}

function resetConversation() {
    
    resetConvo = true;
    
    var chatElement = document.getElementById("chat");
    var currentHTML = chatElement.innerHTML;

    var newHTML = `<div class="message">
                        <img class="system-msg-image" src="https://img.icons8.com/fluency-systems-regular/70/info--v1.png" alt="info--v1"/>
                        <div class="message-text">
                            <h3>System</h3>
                            <h4>This is the start of your conversation with Nano.</h4>
                        </div>
                    </div>`;

    chatElement.style.opacity = 0;
    chatElement.style.transition = "opacity 0.3s";

    setTimeout(function() {
        chatElement.innerHTML = newHTML;
        
        chatElement.style.opacity = 1;
        chatElement.style.transition = "opacity 0.3s";
    }, 100);

    callAI("CLEAR_MEMORY");
}


function appendMessage(username, pfp, content) {
    const chat = document.getElementById("chat");

    const messageDiv = document.createElement("div");
    messageDiv.className = "message";

    if(importedImage == null) {
        messageDiv.innerHTML = `
            <img src="${pfp}" alt="${username}'s profile picture">
            <div class="message-text">
                <h3>${username}</h3>
                <h4>${content}</h4>
            </div>
        `;
    } else {
        console.log("Image has been sent.");
        messageDiv.innerHTML = `
            <img src="${pfp}" alt="${username}'s profile picture">
            <div class="message-text">
                <h3>${username}</h3>
                <h4>${content}</h4>
                <img class="sent-image" src="${importedImage}"></img>
            </div>
        `;
    }

    chat.appendChild(messageDiv);


    messageDiv.style.opacity = 0;
    messageDiv.style.transition = "opacity 0.3s";

    setTimeout(() => {
        messageDiv.style.opacity = 1;
    }, 10);
}


function callAI(query) {

    if(importedImage != null) {
        query += (" " + importedImage);
    }
    const queryData = {
        query: query
    };

    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(queryData)
    })
    .then(response => {
        if (!response.ok) {
            if(resetConvo == false) {
                appendMessage("System", "https://img.icons8.com/fluency-systems-regular/70/a52a2a/box-important--v1.png", "Failed to reach the server or there is an issue with your server: " + response.status);
                generatingResponse = false;
            }
            
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(responseData => {
        console.log("Response data:", responseData.text);
        appendMessage("Nano", "nanohappy.png", responseData.text);
        generatingResponse = false;
    })
    .catch(error => {
        if(resetConvo == false) {
            appendMessage("System", "https://img.icons8.com/fluency-systems-regular/70/a52a2a/box-important--v1.png", "Failed to reach the server or there is an issue with your server: " + error);
            generatingResponse = false;
        } else {
            resetConvo = false;
            generatingResponse = false;
        }
        console.error("There was an error with the request:", error);
    });

    clearImportedFiles();
}

function openMenu() {
    menuOpen = !menuOpen

    elem = document.getElementById("navbar-buttons");
    if(menuOpen) {
        document.getElementById("navbar").style.width = '200px';
        console.log("menu open");
        elem.innerHTML = `
        <img onclick="toggleSettings();" class="navbar-item" width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/70/settings--v1.png" alt="settings--v1"/>
        <img onclick="resetConversation();" class="navbar-item" width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/70/response.png" alt="settings--v1"/>
        <img onclick="openMenu();" class="navbar-item" width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/70/xbox-menu.png" alt="settings--v1"/>
        `


    } else {
        document.getElementById("navbar").style.width = '80px';
        console.log("menu close");
        elem.innerHTML = `
        <img onclick="openMenu();" class="navbar-item" width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/70/xbox-menu.png" alt="settings--v1"/>
        
        `

    }


}

function swapColor() {
    lightMode = !lightMode;
    console.log("swapcolor");
}

function handle() {
    const currentGlobValue = top.glob;

    if (previousGlobValue !== currentGlobValue) {
        if (currentGlobValue === false) {
            document.getElementById("myIFrame").style.backgroundColor = 'rgb(49, 50, 63)';

            

        } else {
            document.getElementById("myIFrame").style.backgroundColor = 'white';

        }

        previousGlobValue = currentGlobValue;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const textField = document.getElementById('input1');
    textField.addEventListener('keydown', handleKeyDown);
});
