"use strict";

const labelGen    = document.getElementById("labelGender");
const selGen      = document.getElementById("gender");
const labelBDate  = document.getElementById("labelBDate");
const bDate       = document.getElementById("bDate");
const labelLExp   = document.getElementById("labelLExp");
const lExp        = document.getElementById("lifeExpectancy");
const bCalc       = document.getElementById("calcBTN");
const bRs         = document.getElementById("resetBTN");
const infoHTML    = document.getElementById("info");
const calcHTML    = document.getElementById("calcTime");

let typewriter;     // Typewriter
let x;              // Timer

class ClassLanguage {
    set setLanguage(val){
        this.value = val;
    }

    get getLanguage(){
        return this.value;
    }

  showLanguage() {
    if (navigator.language.indexOf("en") > -1) {
        this.value = "en";
        labelGen.innerHTML    = 'Gender:';
        labelBDate.innerHTML  = 'Birthday:';
        labelLExp.innerHTML   = 'Life Expectancy:';
        bCalc.innerHTML       = 'Calc';
        bRs.innerHTML         = 'Reset';
    } else if (navigator.language.indexOf("de") > -1) {
        this.value = "de";
        labelGen.innerHTML    = 'Geschlecht:';
        labelBDate.innerHTML  = 'Geburtstag:';
        labelLExp.innerHTML   = 'Lebenserwartung:';
        bCalc.innerHTML       = 'Los';
        bRs.innerHTML         = 'Zurücksetzen';
    } else {
        this.value = navigator.language;
        labelGen.innerHTML    = 'Gender:';
        labelBDate.innerHTML  = 'Birthday:';
        labelLExp.innerHTML   = 'Life Expectancy:';
        bCalc.innerHTML       = 'Calc';
        bRs.innerHTML         = 'Reset';
    }
    console.log("Detected Language: ", this.value)
    return this.value;
  }
}
let classLanguage = new ClassLanguage();
classLanguage.showLanguage();

class ClassCookie{
    set setCookie(val){
        this.cookie = val;
    }

    set setCookieGender(val){
        this.gender = val;
    }

    set setCookieBirthDate(val){
        this.bDate;
    }

    set getCookieLifeSpan(val){
        this.lSpan;
    }

    get getCookie(){
        return this.cookie;
    }

    get getCookieGender(){
        return this.gender;
    }

    get getCookieBirthDate(){
        return this.bDate;
    }

    get getCookieLifeSpan(){
        return this.lSpan;
    }

    initCookie() {
        let cName   = "_live_expectancy";
        let cString;
        let c       = "";
        let cValue  = null;
        let cCode   = null;

        function getC(cName) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${cName}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
        cString = getC(cName);
        try{
            if (!classCookie.getCookie && (cString != null)){
                let start = cString.indexOf("=") + 1;
                let end   = cString.indexOf(";");
                if (end == -1){
                    end = cString.length;
                }
                c = cString.substring(start, end);
                cValue      = "s" + c + "e";
                let startG  = cValue.indexOf("s") + 1;
                let endG    = cValue.indexOf("-");
                let startBD = cValue.indexOf("-") + 1;
                let endBD   = cValue.indexOf(":");
                let startLS = cValue.indexOf(":") + 1;
                let endLS   = cValue.indexOf("e")
                this.gender = cValue.substring(startG, endG);
                this.bDate  = cValue.substring(startBD, endBD);
                this.lSpan  = cValue.substring(startLS, endLS);

                selGen.value    = this.gender;
                bDate.value     = new Date(parseInt(this.bDate)).toISOString().split('T')[0];
                lExp.value      = this.lSpan;
                this.cookie     = true;
                return true;
            } else {
                bDate.value     = new Date().toISOString().split('T')[0];
            }
        } catch(err) {
                console.error("Cookie Error: ", err)
        }
    }

    setCookie(gender, birthDate, lifespan, days){
        let cName   = "_live_expectancy";
        let cValue    = gender + "-" + birthDate + ":" + lifespan;
        let exDays    = days + 1;
        function setCookie(cName, cValue, exDays) {
            const d = new Date();
            d.setTime(d.getTime() + (exDays*24*60*60*1000));
            let expires = "expires="+ d.toUTCString();
            document.cookie = cName + "=" + cValue + ";" + expires + ";path=/;" + "secure";
        }
        setCookie (cName, cValue, exDays);
    }

    resetCookie(){
        let cName   = "_live_expectancy";
        document.cookie = cName +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}
let classCookie = new ClassCookie();
if (!classCookie.getCookie){
    classCookie.initCookie();
}

class ClassGender{
    set setGender(val){
        this.gender = val;
    }

    get getGender(){
        return this.gender;
    }

    chgGender(){
        let value    = selGen.options[selGen.selectedIndex].value;
        if (value == "1") { // Lifetime woman in germany
            lExp.value = "83";
            this.gender = value;
        }
        if (value == "2"){ // Lifetime men in germany
            lExp.value = "79";
            this.gender = value;
        }
        return this.gender;
    }
}
let classGender = new ClassGender();
classGender.chgGender();
selGen.onchange = classGender.chgGender;

class ClassTypewriter{
    set setTypewriter(val){
        this.typewriter = val;
    }

    get getTypewriter(){
        return this.typewriter;
    }

    run(days, birthDate, lifespan, calcLife, now, distance, run){
        let eDays = Math.floor(calcLife / (1000 * 60 * 60 * 24));
        let hEDays = Math.floor((50 / 100) * eDays);

        this.typewriter = true;
        let type = document.getElementById("info");
        typewriter = new Typewriter(type, {
            loop: true,
            delay: 75,
            deleteSpeed: 35
        });

        if (!run){
            typewriter
            .changeCursor(' ')
            .start();
            this.typewriter = false;
        }

        // HALF LIFETIME NOT REACHED
        if ((hEDays <= days) && (run)){
         /*if (navigator.language == "de"){*/
                    let pause       = 2500;
                    let shortPause  = 100;
                     typewriter
                        .pauseFor(1000)
                        .typeString('<strong>' + days.toString() + '<strong>')
                        .typeString('<strong> Tage <strong> ...')
                        .changeDelay(35)
                        .changeDeleteSpeed(15)
                        .pauseFor(pause)
                        .deleteChars(3)
                        .pauseFor(shortPause)
                        .typeString('die du noch durchschnittlich hast.')
                        .pauseFor(pause)
                        .deleteChars(34)
                        .pauseFor(shortPause)
                        .typeString('sind nicht zu wenig Tage, die du hast.')
                        .pauseFor(pause)
                        .deleteChars(12)
                        .pauseFor(shortPause)
                        .typeString('sondern es ist zu viel Zeit, die wir nicht nutzen.')
                        .pauseFor(pause)
                        .deleteChars(35)
                        .pauseFor(shortPause)
                        .typeString('noch viel Zeit.')
                        .pauseFor(pause)
                        .typeString('<br>Was machst du mit <strong>deiner Zeit?<strong>')
                        .pauseFor(10000)
                        .typeString('<br><br><strong>' + days.toString() +'<strong> Tage <strong>für ein Miteinander.')
                        .pauseFor(pause)
                        .deleteChars(20)
                        .pauseFor(shortPause)
                        .typeString('an denen du träumen kannst.')
                        .pauseFor(pause)
                        .deleteChars(15)
                        .pauseFor(shortPause)
                        .typeString('die Welt mit retten kannst.')
                        .pauseFor(pause)
                        .deleteChars(39)
                        .pauseFor(shortPause)
                        .changeDelay(75)
                        .typeString('zum glücklich sein.')
                        .changeDelay(35)
                        .pauseFor(pause)
                        .typeString('<br><br>Viele schauen ständig zurück in ihre Vergangenheit, mit Dankbarkeit.')
                        .pauseFor(pause)
                        .deleteChars(16)
                        .pause(shortPause)
                        .typeString('aber mehr mit Reue.')
                        .pauseFor(pause)
                        .typeString(' Eine andere Gruppe schaut in die Zukunft und ist beschäftig mit Vorfreude.')
                        .pauseFor(pause)
                        .deleteChars(1)
                        .pauseFor(shortPause)
                        .typeString(', Viele mit Ängsten.')
                        .pauseFor(pause)
                        .typeString(' Am glücklisten sind die Leute, die sich im Kopf da aufhalten, wo sie gerade auch mit dem Körper sind.')
                        .pauseFor(pause)
                        .deleteChars(36)
                        .pauseFor(shortPause)
                        .typeString('die Gegenwart ist.')
                        .pauseFor(pause)
                        .typeString(' Zusammengefasst alle haben den gleichen Himmel über sich, aber nicht den gleichen Zeithorizont.')
                        .pauseFor(pause)
                        .typeString('<br><br>In welcher Zeitzone bewegst du dich?')
                        .pauseFor(pause)
                        .typeString('<br><br>Basierend auf einer statistischen Wahrscheinlichkeit läuft hier deine noch verbleibende Zeit.')
                        .pauseFor(shortPause)
                        .changeDelay(75)
                        .typeString('<br><br>Deine Lebensspanne hat noch ' + days.toString() + ' Tage.')
                        .pauseFor(pause)
                        .typeString('<br>Dein letztes Datum kann nach der Statistik im Jahr ' + new Date(birthDate + calcLife).getFullYear() + ' sein.')
                        .pauseFor(30000)
                        .deleteAll(1)
                        .start()
                 /*}*/
        }

        // HALF LIFETIME REACHED
        else if ((hEDays >= days) && (distance > 0) && (run)){
            /*if (true){*/
                let pause       = 2500;
                let shortPause  = 100;
                    typewriter
                        .pauseFor(1000)
                        .typeString('<strong>'+ Math.floor((now - birthDate) / (1000 * 60 * 60 * 24)) + '<strong> Tage hast du schon erlebt.')
                        .pauseFor(pause)
                        .typeString('<br> Weitere <strong>' + days.toString() + '<strong>')
                        .typeString('<strong> Tage <strong> ')
                        .changeDelay(35)
                        .changeDeleteSpeed(15)
                        .pauseFor(shortPause)
                        .typeString('die du noch durchschnittlich hast.')
                        .pauseFor(pause)
                        .deleteChars(34)
                        .pauseFor(shortPause)
                        .typeString('sind nicht zu wenig Tage, die du hast.')
                        .pauseFor(pause)
                        .deleteChars(12)
                        .pauseFor(shortPause)
                        .typeString('sondern es ist zu viel Zeit, die wir nicht nutzen.')
                        .pauseFor(pause)
                        .typeString('<br><br>Was machst du mit <strong>deiner restlichen Zeit?<strong>')
                        .pauseFor(10000)
                        .typeString('<br><br><strong>' + days.toString() +'<strong> Tage <strong>für ein Miteinander.')
                        .pauseFor(pause)
                        .deleteChars(20)
                        .pauseFor(shortPause)
                        .typeString('an denen du träumen kannst.')
                        .pauseFor(pause)
                        .deleteChars(15)
                        .pauseFor(shortPause)
                        .typeString('die Welt mit retten kannst.')
                        .pauseFor(pause)
                        .deleteChars(39)
                        .pauseFor(shortPause)
                        .changeDelay(75)
                        .typeString('zum glücklich sein.')
                        .changeDelay(35)
                        .pauseFor(pause)
                        .typeString('<br><br>Viele schauen ständig zurück in ihre Vergangenheit, mit Dankbarkeit.')
                        .pauseFor(pause)
                        .deleteChars(16)
                        .pause(shortPause)
                        .typeString('aber mehr mit Reue.')
                        .pauseFor(pause)
                        .typeString(' Eine andere Gruppe schaut in die Zukunft und ist beschäftig mit Vorfreude.')
                        .pauseFor(pause)
                        .deleteChars(1)
                        .pauseFor(shortPause)
                        .typeString(', die Meisten mit Ängsten.')
                        .pauseFor(pause)
                        .typeString(' Am glücklisten sind die Leute, die sich im Kopf da aufhalten, wo sie gerade auch mit dem Körper sind.')
                        .pauseFor(pause)
                        .deleteChars(36)
                        .pauseFor(shortPause)
                        .typeString('die Gegenwart ist.')
                        .pauseFor(pause)
                        .typeString(' Zusammengefasst alle haben den gleichen Himmel über sich, aber nicht den gleichen Zeithorizont.')
                        .pauseFor(pause)
                        .typeString('<br><br>In welcher Zeitzone bewegst du dich?')
                        .pauseFor(pause)
                        .typeString('<br><br>Basierend auf einer statistischen Wahrscheinlichkeit läuft hier deine noch verbleibende Zeit.')
                        .pauseFor(shortPause)
                        .changeDelay(75)
                        .pauseFor(pause)
                        .typeString('<br>Dein letztes Datum kann nach der Statistik im Jahr ' + new Date(birthDate + calcLife).getFullYear() + ' sein.')
                        .pauseFor(30000)
                        .deleteAll(1)
                        .start()
            /*}*/
        }

        // OVER LIFETIME REACHED
        else if ((distance < 0) && (run)){
            /*if (true){*/
                let pause       = 2500;
                let shortPause  = 100;
                typewriter
                .pauseFor(1000)
                .typeString('<strong>'+ Math.floor((now - birthDate) / (1000 * 60 * 60 * 24)) + '<strong> Tage hast du schon erlebt.')
                .pauseFor(pause)
                .typeString('<br> Mit <strong>' + days.toString().replace('-', '') + '<strong> Tagen ')
                .typeString('mehr als der Durchschnitt. ')
                .pauseFor(pause)
                .typeString('Somit läuft deine restliche Lebenszeit nicht runter, sondern sie läuft hoch.')
                .changeDelay(35)
                .changeDeleteSpeed(15)
                .pauseFor(pause)
                .typeString('<br><br>Was machst du mit <strong>deiner Zeit?<strong>')
                .pauseFor(10000)
                .typeString('<br><br>Zeit für ein Miteinander.')
                .pauseFor(pause)
                .deleteChars(20)
                .pauseFor(shortPause)
                .typeString('an denen du träumen kannst.')
                .pauseFor(pause)
                .deleteChars(15)
                .pauseFor(shortPause)
                .typeString('die Welt mit retten kannst.')
                .pauseFor(pause)
                .deleteChars(39)
                .pauseFor(shortPause)
                .changeDelay(75)
                .typeString('zum glücklich sein.')
                .changeDelay(35)
                .pauseFor(pause)
                .typeString('<br><br>Viele schauen ständig zurück in ihre Vergangenheit, mit Dankbarkeit.')
                .pauseFor(pause)
                .deleteChars(16)
                .pause(shortPause)
                .typeString('aber mehr mit Reue.')
                .pauseFor(pause)
                .typeString(' Eine andere Gruppe schaut in die Zukunft und ist beschäftig mit Vorfreude.')
                .pauseFor(pause)
                .deleteChars(1)
                .pauseFor(shortPause)
                .typeString(', die Meisten mit Ängsten.')
                .pauseFor(pause)
                .typeString(' Am glücklisten sind die Leute, die sich im Kopf da aufhalten, wo sie gerade auch mit dem Körper sind.')
                .pauseFor(pause)
                .deleteChars(36)
                .pauseFor(shortPause)
                .typeString('die Gegenwart ist.')
                .pauseFor(pause)
                .typeString(' Zusammengefasst alle haben den gleichen Himmel über sich, aber nicht den gleichen Zeithorizont.')
                .pauseFor(pause)
                .typeString('<br><br>In welcher Zeitzone bewegst du dich?')
                .pauseFor(pause)
                .typeString('<br><br>Basierend auf einer statistischen Wahrscheinlichkeit läuft hier deine verbleibende Zeit.')
                .pauseFor(shortPause)
                .changeDelay(75)
                .pauseFor(pause)
                .typeString('<br>Dein letztes Datum war nach der Statistik im Jahr ' + new Date(birthDate + calcLife).getFullYear() + '.')
                .pauseFor(30000)
                .deleteAll(1)
                .start()
            /*}*/
        }
    }

    /*stopType(){
        if (this.typewriter){
            this.typewriter = false;
            typewriter
            .stop()
        }
    }*/
}
let classTypewriter = new ClassTypewriter();

class ClassCalc{

    set setCalc(val){
        this.calc = val;
    }

    get getCalc(){
        return this.calc;
    }

    startCalc(){
        // Set the date we're start counting down to 0 and calc the lifespan to Unix-Time
        let birthDate = new Date(bDate.value).getTime();
        let lifespan = parseFloat(lExp.value);
        function calcLife() {
            let zero  = 1970;
            let time = zero + lifespan;
            let cnt = new Date(time.toString()).getTime();
            return cnt;
        }

        // Update the count down every 1 second
        x = setInterval(function() {
            let now = new Date().getTime();
            let distance = (birthDate + calcLife()) - now;

            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result
            if (classCalc.getCalc == true){
                classStyle.runFadeIn();
            }
            if (classLanguage.getLanguage == "de"){
                calcHTML.innerHTML = days.toString().replace('-', '') + " Tage " + hours.toString().replace('-', '') + " Stunden "
                + minutes.toString().replace('-', '') + " Minuten " + seconds.toString().replace('-', '') + " Sekunden ";
            } else if (classLanguage.getLanguage != "de"){
                calcHTML.innerHTML = days.toString().replace('-', '') + " Days " + hours.toString().replace('-', '') + " Hours "
                + minutes.toString().replace('-', '') + " Minutes " + seconds.toString().replace('-', '') + " Seconds ";
            }
            classCookie.setCookie(gender.value, birthDate, lifespan, days);

            // Typewriter
            if (!classTypewriter.getTypewriter){
                classTypewriter.run(days, birthDate, lifespan, calcLife(), now, distance, true);
            }
        }, 1000);
    }
}
let classCalc = new ClassCalc();

class ClassBTNCalc{
    set setBTN(val){
            this.btn = val;
        }

        get getBTN(){
            return this.btn;
        }

    run(){
        if (bDate.value != ""){
            clearInterval(x);
            classTypewriter.run(0, 0, 0, 0, 0, false);
            classCalc.setCalc = true;
            classCalc.startCalc();
            this.bnt = true;
        } else {
            console.log("Error no Date typed", false);
            this.btn = false;
        }
        return true;
    }
}
let classBTNCalc = new ClassBTNCalc();
bCalc.addEventListener('click', ()=>{
    classBTNCalc.run();
})

class ClassStyle{
    set setFadeIn(val){
        this.fadeIn = val;
    }

    set setFadeOut(val){
        this.fadeOut = val;
    }

    get getFadeIn(){
        return this.fadeIn;
    }

    get getFadeOut(){
        return this.fadeOut;
    }

    runFadeIn(){
        //calcHTML.style.animationDelay = "1s";
        calcHTML.style.animation    = "fadeIn ease-in 0.2s";
        calcHTML.style.opacity      = "100";
        infoHTML.style.animation    = "fadeIn ease-in 1s";
        infoHTML.style.opacity      = "100";
        return true;
    }

    runFadeOut(){
        //calcHTML.style.animationDelay = "1s";
        calcHTML.style.animation    = "fadeOut ease 0.2s";
        calcHTML.style.opacity      = "0";
        infoHTML.style.animation    = "fadeIn ease 0.2s";
        infoHTML.style.opacity      = "0";
        return true;
    }
}
let classStyle = new ClassStyle();

class ClassBTNReset{
    set setBTN(val){
            this.btn = val;
        }

        get getBTN(){
            return this.btn;
        }

    reset(){
        classStyle.runFadeOut();
        classCalc.setCalc = false;
        clearInterval(x);
        classCookie.resetCookie();
        document.forms[0].reset();
        bDate.value     = new Date().toISOString().split('T')[0];
        classGender.chgGender();
        classTypewriter.run(0, 0, 0, 0, 0, false);
        return true;
    }
}
let classBTNReset = new ClassBTNReset();
bRs.addEventListener('click', ()=>{
    classBTNReset.reset();
})
