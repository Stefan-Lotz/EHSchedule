function updateClock() { // Goal of this function is to grab the user's local time and day. Easier said than done.
    const now = new Date(); // Grabs the user's current date and time.
    const dayOfWeek = now.getDay(); // Figures out what day of the week it is.
        
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // List of each month that allows me to turn the int gleaned from .getMonth into String text.
    document.getElementById("month").textContent = months[now.getMonth()]; // Sets the month at the footer.
    document.getElementById("year").textContent = now.getFullYear(); // Sets the year at the footer.
    
    if (dayOfWeek === 0 || dayOfWeek === 6) { // Displays a message if it's the weekend.
        // Saturday or Sunday
        document.getElementById("currentPeriod").textContent = "School is out for the weekend!";
        document.getElementById("timeUntilEnd").textContent = "";
    }
    else {
        const hour = now.getUTCHours() - 5; // Gets the UTC hour and subtracts 5 from it. This way, no matter what timezone your computer is in, the website will be in EST timezone. Daylight savings time kinda messes with this functionality because UTC does not adhere to the time change but EST does. So far, I've only used a band-ad fix of changing the hours subtracted from 5 to 4. I'm sure there's a library to deal with this, but that's too much work and I'm graduating soon. 
        const minute = now.getMinutes(); // Gets the current minute
        const second = now.getSeconds(); // Gets the current second
        const totalSeconds = hour * 3600 + minute * 60 + second; // Calculates how many seconds have passed since midnight. This number is used to determine what period school is in. 
    
        const isWednesday = dayOfWeek === 3; // Boolean that lets the calculatePeriod() function know to use the Wednesday schedule.
        const period = isWednesday ? calculatePeriodWednesday(totalSeconds) : calculatePeriod(totalSeconds);
                
        if (isWednesday) { // Displays the Wednesday bell schedule if it's Wednesday.
            document.getElementById("p1").textContent = `7:20 - 8:04`
            document.getElementById("p2").textContent = `8:10 - 8:50`
            document.getElementById("p3").textContent = `8:56 - 9:36`
            document.getElementById("p4").textContent = `9:42 - 10:22`
            document.getElementById("pLunch").textContent = `10:22 - 10:52`
            document.getElementById("p5").textContent = `10:58 - 11:38`
            document.getElementById("p6").textContent = `11:44 - 12:24`
            document.getElementById("p7").textContent = `12:30 - 1:10`
        }
    
        document.getElementById("currentPeriod").textContent = `Current period: ${period.name}`; // Displays what period is currently in session.
            
        const remainingSeconds = period.end - totalSeconds; // Calculates remaining seconds in the period.
    
        const remainingMinutes = Math.floor(remainingSeconds / 60); // Calculates how many minutes are left before the end of the period.
        const remainingSecs = remainingSeconds % 60; // Calculates how many seconds are left before the end of the current minute.
        
        const isTenTen = remainingMinutes < 10 || totalSeconds < period.start + 960  // Determines if the school is in 10/10 - no movement outside of class
        
        if (isTenTen && period.name != "First Period" && period.name != "Lunch" && period.name != "After School") { // Changes the color of the "time until end" text to be red when we're in 10/10
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
        
        if (totalSeconds >= 51600 && !isWednesday) { // Displays a special message once school gets out. 
            document.getElementById("timeUntilEnd").textContent = `School's out!`;
            document.getElementById("title").textContent = `EHSchedule`;
        }
        else if (totalSeconds >= 47400 && isWednesday) {
            document.getElementById("timeUntilEnd").textContent = `School's out!`;
            document.getElementById("title").textContent = `EHSchedule`;
        }
        else { // If school is yet to end, display the amount of time until the current period ends.
            document.getElementById("timeUntilEnd").textContent = `Time until end of period: ${remainingMinutes} minutes and ${remainingSecs} seconds`; // Displays how many minutes and seconds are left before the end of the period.
            document.getElementById("title").textContent = `${remainingMinutes} mins left`; // Changes the title of the tab to display how many minutes are left. This might be my favorite part of the website!
        }
            
        setTimeout(function() {
            if (remainingSeconds === 1) {   // If there are 0 seconds remaining in the period, confetti shoots from the sides of the page!
            // Okay, it doesn't *actually* go at 0 seconds. Since remainingSeconds never truly reaches 0, I had to have the function run at 1 second left, but delay for 1 second.
                confetti({    // Launches some confetti from the left side
                    particleCount: 250,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: [ "#ff0000", "cccccc" ],
                });
                
                confetti({    // Launches some confetti from the right side
                    particleCount: 250,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: [ "#ff0000", "cccccc" ],
                });
            }
        }, 1000); // This is the aforementioned 1 second delay.
    } 
    setTimeout(updateClock, 1000); // Runs the function every second to accurately update the website with the current date/time of the user. 
}
    
function calculatePeriod(totalSeconds) { // Uses the amount of seconds that have passed since midnight to determine what period is active. This is the A Lunch schedule.
    const periods = [ // Array that includes the start and end time of each class. (In seconds since midnight)
        { name: "Before School", start: 0,     end: 26400 },
        { name: "Period 1",      start: 26400, end: 29640 },
        { name: "Period 2",      start: 29640, end: 33000 },
        { name: "Period 3",      start: 33000, end: 36360 },
        { name: "Period 4",      start: 36360, end: 39720 },
        { name: "Lunch",         start: 39720, end: 41520 },
        { name: "Period 5",      start: 41520, end: 44880 },
        { name: "Period 6",      start: 44880, end: 48240 },
        { name: "Period 7",      start: 48240, end: 51600 },
        { name: "After School",  start: 51600, end: 86400 },
    ];

    for (const period of periods) { // For loop that juxtaposes the amount of seconds that have currently passed since midnight with the amount of seconds that have passed since midnight in each period.
        if (totalSeconds >= period.start && totalSeconds < period.end) {
            return period;
        }
    }
    return { name: "Error" }; // If your computer somehow decides it's not currently at a time on the 24-hour clock, the website displays an error.
}

function calculatePeriodWednesday(totalSeconds) { // Same thing, but for the Wednesday schedule
    // These arrays are a pain to fill out. So many numbers...
    const periods = [
        { name: "Before School", start: 0,     end: 26400 },
        { name: "Period 1",      start: 26400, end: 29040 },
        { name: "Period 2",      start: 29040, end: 31800 },
        { name: "Period 3",      start: 31800, end: 34560 },
        { name: "Period 4",      start: 34560, end: 37320 },
        { name: "Lunch",         start: 37320, end: 39120 },
        { name: "Period 5",      start: 39120, end: 41880 },
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
        
    document.getElementById("p1").textContent = `7:20 - 8:00`
    document.getElementById("p2").textContent = `8:06 - 8:46`
    document.getElementById("p3").textContent = `8:52 - 9:32`
    document.getElementById("p4").textContent = `9:38 - 10:22`
    document.getElementById("pLunch").textContent = `10:22 - 10:52`
    document.getElementById("p5").textContent = `10:58 - 11:38`
    document.getElementById("p6").textContent = `11:44 - 12:24`
    document.getElementById("p7").textContent = `12:30 - 1:10`
        
    // Changes the times of the table when it's Wednesday.
}
    
updateClock(); // Initializes the clock.