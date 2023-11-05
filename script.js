const search = async () => {
    let country = cname.value

    if(country === ''){
        fail.innerHTML = `<p>Please Enter a Valid Input !</p>`;
    }

    if (country) {
        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=b752520e8b80cf6f698e46f0882b8df9`);
        result.json().then((wthrdata) => {
            console.log(wthrdata);

            let place = wthrdata.name;
            console.log(place);


            //temperature
            let temp = wthrdata.main.temp
            let cel = eval(temp - 273.15)
            let cels = cel.toFixed(1);
            console.log(`${cels}`);

            //min temp
            let min = wthrdata.main.temp_min
            let minc = eval(min - 273.15)
            let mintemp = minc.toFixed(1);
            console.log(mintemp);

            //max temp
            let max = wthrdata.main.temp_max
            let maxc = eval(max - 273.15)
            let maxtemp = maxc.toFixed(1);
            console.log(maxtemp);


            //weather
            let wthr = wthrdata.weather.map(newd => newd['main'])
            let feeling = wthr[0];

            //description
            let wthrs = wthrdata.weather.map(newd => newd['description'])
            let feelings = wthrs[0];

            //wind
            let wind = wthrdata.wind.speed;

            if(feeling == "Rain"){
                background.classList.add('rain');
            }
            else if(feeling == "Clouds"){
                background.classList.add('cloud')
            }
            else if(feeling == 'Clear'){
                background.classList.add('clear')
            }
            else if(feeling == 'Haze'){
                background.classList.add('haze')
            }
            else if(feeling == 'Mist'){
                background.classList.add('haze')
            }
            else if(feeling == 'Fog'){
                background.classList.add('haze')
            }
            else if(feeling == 'Smoke'){
                background.classList.add('haze')
            }

            //feels like

            let feel = wthrdata.main.feels_like;
            let f = eval(feel - 273.15);
            let feels = f.toFixed(1);
            console.log(feels);

            //country

            let cntry = wthrdata.sys.country
            console.log(cntry);

            //humidity

            let hum = wthrdata.main.humidity;
            console.log(`${hum}%`);

            display.innerHTML = `
            <div class="pname">
                ${place} <button class="btn ms-5"> <a href="index.html"><i class="fa-solid fa-rotate-right"></i></a></button>
            </div>
            <div id="feel" class="feels">
            ${feelings}
             <img src ="images/${feeling}.png">
            </div>
            <div class="temperature">
                <div class="main-temp"><i class="fa-solid fa-temperature-full"></i>${cels}°C</div>
                <div class="min-max-temp">
                    ${maxtemp}°C Max<hr class="hr">
                    ${mintemp}°C Min
                </div>
                </div>
                <div class="container-humidity">
                    <div class="arrange">
                        <div class="h-icon"><i class="fa-solid fa-water"></i></div>
                        <div class="h-details">
                            ${hum} %
                            <p>Humidity</p>
                        </div>
                    </div>
                    
                    <div class="arrange">
                        <div class="h-icon"><i class="fa-solid fa-wind"></i></i></div>
                        <div class="h-details">
                            ${wind}kmph
                            <p>WindSpeed</p>
                        </div>
                    </div>

                </div>
           `



        })
     
        .catch  (()=> {
             fail.innerHTML = `<p>City Not Found !</p>`;
        })
    }
}

function downKey(event){
    if(event.key === 'Enter'){
        search();
    }
}