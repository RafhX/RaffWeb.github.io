async function getData(){
    let res;
    await fetch("https://api.lanyard.rest/v1/users/932158649546182676").then(response => {res = response.json()})
    return res
}

async function start(cache){
    let ret;
    if(cache == "empty"){
        ret = await getData();
    }
    else if(cache != "empty"){
        ret = JSON.parse(cache)
    }
    //const res = await fetch("https://api.lanyard.rest/v1/users/932158649546182676")
    let dscIcon = document.getElementById("big-icon-img")
    dscIcon.style.visibility = "visible"
    dscIcon.src = `https://cdn.discordapp.com/avatars/932158649546182676/${ret["data"]["discord_user"]["avatar"]}.webp?size=512`
    let x = 'offline'
    if (ret["data"]["discord_status"] != "offline"){
        x = `online`
        let sts = document.getElementById("status")
        let bdg = document.getElementById("badges")
        let bdr = document.getElementById("bdr1")
        sts.classList.remove('offlineClr')
        sts.classList.add('onlineClr')
        bdr.classList.remove('offlineBdrClr')
        bdr.classList.add('onlineBdrClr')
        bdg.style.visibility = "visible"
        bdg.classList.remove('offlineIcStatus')
        bdg.classList.add('onlineIcStatus')
        
    }
    document.getElementById("status").innerText = (x)
    return ret
}

if (!sessionStorage.fetched) {
    start("empty").then(value => sessionStorage.fetched = JSON.stringify(value));
}
else if (sessionStorage.fetched){
    start(sessionStorage.fetched);
};