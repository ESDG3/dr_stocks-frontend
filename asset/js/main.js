//URL paths


function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str));
};

function UnicodeDecodeB64(str) {
    return decodeURIComponent(atob(str));
};


async function doAjax(url, method){
    return $.ajax({
        url: url,
        type: method || 'GET',
        dataType: 'json',
    });
}

async function login(){
    var loginURL = 'http://localhost:8000/api/v1/login';
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;
    var send_email =  "email" + "=" + email;
    var send_password = "password" + "=" + b64EncodeUnicode(password);
    var params = "?" + send_email + "&" + send_password;
    const website = loginURL + params;
    try {
        const result = await doAjax(website, 'GET');
        console.log(result)
        if (result.code === 200) {
            console.log(result["data"]);
            var apikey = result["data"]["apikey"];
            var accid = b64EncodeUnicode(result["data"]["accid"]);
            sessionStorage.setItem("apikey", apikey);
            sessionStorage.setItem("accid", accid);
            alert("Login Successful");
            window.location.replace("dashboard.html");
        }

    } catch (error) {
        console.log('error')
        console.log("pause2");
        alert("Error: " + error);
    }
}