let lat=document.querySelector(".lat");
let long=document.querySelector(".long");
let btn=document.querySelector("button");
let l=document.querySelector(".city");
let t=document.querySelector(".temp");
let i=document.querySelectorAll("img");
let d=document.querySelectorAll("svg");
let country=document.querySelector(".country");



btn.addEventListener("click",async()=>{
    let longitude=0;
    let latitude=0;
    let na="null";
    const url3=`https://nominatim.openstreetmap.org/search?q=${lat.value},${long.value}&format=json`;
    try{
        let l=await fetch(url3);
        let la=await l.json();
        longitude=la[0].lon;
        latitude=la[0].lat;
        na=la[0].name;
    }
    catch(e){
        console(e);
    }
    const url =`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
    
    try{
    l.innerText=na;
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
