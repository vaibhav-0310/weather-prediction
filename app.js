let lat=document.querySelector(".lat");
let long=document.querySelector(".long");
let btn=document.querySelector("button");
let l=document.querySelector(".city");
let t=document.querySelector(".temp");
let i=document.querySelectorAll("img");
let d=document.querySelectorAll("svg");
let country=document.querySelector(".country");

btn.addEventListener("click",async()=>{
    const url =`https://api.open-meteo.com/v1/forecast?latitude=${lat.value}&longitude=${long.value}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
    const url2=`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat.value}&longitude=${long.value}&localityLanguage=en`;
    try{
    let loc = await fetch(url2);
    let loca=await loc.json();
    l.innerText=loca.locality;
    country.innerText=`, ${loca.countryCode}.`;
    let tem=await fetch(url);
    let temp=await tem.json();
    let tt=temp.current.temperature_2m;
    t.innerText=`${temp.current.temperature_2m}'C` ;
    if(tt>=35){
        i[1].style.visibility='hidden';
        i[2].style.visibility='hidden'
        i[0].style.visibility='visible';
        d[0].style.visibility='hidden';
        d[2].style.visibility='hidden'
        d[1].style.visibility='visible';
      }
    else if(tt>=25 && tt<35){
        i[0].style.visibility='hidden';
        i[1].style.visibility='hidden'
        i[2].style.visibility='visible';
        d[2].style.visibility='hidden';
        d[1].style.visibility='hidden'
        d[0].style.visibility='visible';
    }
    else{
        i[2].style.visibility='hidden';
        i[0].style.visibility='hidden';
        i[1].style.visibility='visible';
        d[1].style.visibility='hidden';
        d[0].style.visibility='hidden';
        d[2].style.visibility='visible';
    }
    }
    catch(e){
        console.log(e);
    }
    
});
