/*
 * Hello to anyone checking out the source code! If you want to see my comments about the .js files, go to aLunch.js. This file is identical to that one execpt a few numbers are 
 * changed to reflect changes made to the schedule at Edgewater. Because of this, I didn't bother to write comments in this file, so go there if you'd like to see my thoughts!
 */
function updateClock() {
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
    const dayOfWeek = now.getDay();
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById("month").textContent = months[now.getMonth()];
    document.getElementById("year").textContent = now.getFullYear();
    
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        document.getElementById("currentPeriod").textContent = "School is out for the weekend!";
        document.getElementById("timeUntilEnd").textContent = "";
    } 
    else {
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        const totalSeconds = hour * 3600 + minute * 60 + second;
    
        const isWednesday = dayOfWeek === 3;
        const period = isWednesday ? calculatePeriodWednesday(totalSeconds) : calculatePeriod(totalSeconds);
            
        if (isWednesday) {
            document.getElementById("p1").textContent = `7:20 - 8:04`
            document.getElementById("p2").textContent = `8:10 - 8:50`
            document.getElementById("p3").textContent = `8:56 - 9:36`
            document.getElementById("p4").textContent = `9:42 - 10:22`
            document.getElementById("p5").textContent = `10:28 - 11:08`
            document.getElementById("pLunch").textContent = `11:08 - 11:38`
            document.getElementById("p6").textContent = `11:44 - 12:24`
            document.getElementById("p7").textContent = `12:30 - 1:10`
        }
                    
        document.getElementById("currentPeriod").textContent = `Current period: ${period.name}`; 
                
        const remainingSeconds = period.end - totalSeconds;
    
        const remainingMinutes = Math.floor(remainingSeconds / 60);
        const remainingSecs = remainingSeconds % 60;
        
        const isTenTen = remainingMinutes < 10 || totalSeconds < period.start + 960
        
        if (isTenTen && period.name != "First Period" && period.name != "Lunch" && period.name != "After School") {
            document.getElementById("timeUntilEnd").classList.add("inTenTen");
        }
        else if (isTenTen && period.name == "First Period") {
            document.getElementById("timeUntilEnd").classList.add("inTenTen");
            if (totalSeconds > period.start + 600) {
                document.getElementById("timeUntilEnd").classList.remove("inTenTen");
            }
        }
        else {
            document.getElementById("timeUntilEnd").classList.remove("inTenTen");
        }
    
        if (totalSeconds >= 51600 && !isWednesday) {
            document.getElementById("timeUntilEnd").textContent = `School's out!`;
            document.getElementById("title").textContent = `EHSchedule`;
        }
        else if (totalSeconds >= 47400 && isWednesday) {
            document.getElementById("timeUntilEnd").textContent = `School's out!`;
            document.getElementById("title").textContent = `EHSchedule`;
        }
        else {
            document.getElementById("timeUntilEnd").textContent = `Time until end of period: ${remainingMinutes} minutes and ${remainingSecs} seconds`;
            document.getElementById("title").textContent = `${remainingMinutes} mins left`;
        }
            
        setTimeout(function() {
            if (remainingSeconds === 1) {
                confetti({
                    particleCount: 250,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: [ "#ff0000", "cccccc" ],
                });
                    
                confetti({
                    particleCount: 250,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: [ "#ff0000", "cccccc" ],
                });
            }
        }, 1000);
    }
    setTimeout(updateClock, 1000);
}

function calculatePeriod(totalSeconds) {
    const periods = [
        { name: "Before School", start: 0,     end: 26400 },
        { name: "Period 1",      start: 26400, end: 29640 },
        { name: "Period 2",      start: 29640, end: 33000 },
        { name: "Period 3",      start: 33000, end: 36360 },
        { name: "Period 4",      start: 36360, end: 39720 },
        { name: "Period 5",      start: 39720, end: 43080 },
        { name: "Lunch",         start: 43080, end: 44880 },
        { name: "Period 6",      start: 44880, end: 48240 },
        { name: "Period 7",      start: 48240, end: 51600 },
        { name: "After School",  start: 51600, end: 86400 },
    ];

    for (const period of periods) {
        if (totalSeconds >= period.start && totalSeconds < period.end) {
            return period;
        }
    }
    return { name: "Error" };
}

function calculatePeriodWednesday(totalSeconds) {
    const periods = [
        { name: "Before School", start: 0,     end: 26400 },
        { name: "Period 1",      start: 26400, end: 29040 },
        { name: "Period 2",      start: 29040, end: 31800 },
        { name: "Period 3",      start: 31800, end: 34560 },
        { name: "Period 4",      start: 34560, end: 37320 },
        { name: "Period 5",      start: 37320, end: 40080 },
        { name: "Lunch",         start: 40080, end: 41880 },
        { name: "Period 6",      start: 41880, end: 44640 },
        { name: "Period 7",      start: 44640, end: 47400 },
        { name: "After School",  start: 47400, end: 86400 },
    ];

    for (const period of periods) {
        if (totalSeconds >= period.start && totalSeconds < period.end) {
            return period;
        }
    }
    return { name: "Error" };
    
}
    
updateClock();