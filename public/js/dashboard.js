var params = jQuery.deparam(window.location.search); //Gets data from url

debugger;

if (typeof params.name === 'undefined') {
    if (sessionStorage.getItem("name") == null) {
        window.location.href = "/";
    }
    if (sessionStorage.getItem("sid") == 'na') {
        window.location.href = '/create';
    }
} else {
    //set session
    sessionStorage.setItem("name", params.name);
    sessionStorage.setItem("sid", params.sid);
    if (params.sid == 'na') {
        window.location.href = '/create';
    }
}

document.getElementById("name").value = sessionStorage.getItem("name") + ' - ' + sessionStorage.getItem("sid");