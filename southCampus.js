/*
 * Hello to anyone checking out the source code! If you want to see my comments about the .js files, go to aLunch.js. This file is identical to that one except a few numbers are 
 * changed to reflect changes made to the schedule at Edgewater. Because of this, I didn't bother to write comments in this file, so go there if you'd like to see my thoughts!
 */
function updateClock() {
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
    const dayOfWeek = now.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById("month").textContent = months[now.getMonth()];
    document.getElementById("year").textContent = now.getFullYear();
    document.querySelector(".currentDay").textContent = days[dayOfWeek];
    
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
            document.getElementById("p1").textContent = `7:20 - 7:58`
            document.getElementById("p2").textContent = `8:08 - 8:42`
            document.getElementById("p3").textContent = `8:54 - 9:34`
            document.getElementById("p4").textContent = `9:44 - 10:20`
            document.getElementById("p5").textContent = `10:30 - 11:06`
            document.getElementById("pLunch").textContent = `11:06 - 11:38`
            document.getElementById("p6").textContent = `11:46 - 12:22`
            document.getElementById("p7").textContent = `12:32 - 1:08`
        }
                    
        document.getElementById("currentPeriod").textContent = `Current period: ${period.name}`; 
                
        const remainingSeconds = period.end - totalSeconds;
    
        const remainingMinutes = Math.floor(remainingSeconds / 60);
        const remainingSecs = remainingSeconds % 60;
        
        const isTenTen = remainingMinutes < 10 || totalSeconds < period.start + 1200
        
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
        { name: "Before School", start: 0,     end: 26520 },
        { name: "Period 1",      start: 26520, end: 29280 },
        { name: "Period 2",      start: 29280, end: 32640 },
        { name: "Period 3",      start: 32640, end: 34440 },
        { name: "Period 4",      start: 34440, end: 39600 },
        { name: "Period 5",      start: 39600, end: 42960 },
        { name: "Lunch",         start: 42960, end: 44880 },
        { name: "Period 6",      start: 44880, end: 48120 },
        { name: "Period 7",      start: 48120, end: 51480 },
        { name: "After School",  start: 51480, end: 86400 },
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
        { name: "Before School", start: 0,     end: 26520 },
        { name: "Period 1",      start: 26520, end: 28680 },
        { name: "Period 2",      start: 28680, end: 31320 },
        { name: "Period 3",      start: 31320, end: 34440 },
        { name: "Period 4",      start: 34440, end: 37200 },
        { name: "Period 5",      start: 37200, end: 39960 },
        { name: "Lunch",         start: 39960, end: 41880 },
        { name: "Period 6",      start: 41880, end: 44520 },
        { name: "Period 7",      start: 44520, end: 47280 },
        { name: "After School",  start: 47280, end: 86400 },
    ];

    for (const period of periods) {
        if (totalSeconds >= period.start && totalSeconds < period.end) {
            return period;
        }
    }
    return { name: "Error" };
    
}
    
updateClock();
