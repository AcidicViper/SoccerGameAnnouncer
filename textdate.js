const theMonths = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December"];

const theDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class TextDate {
    constructor(date) {
        this.month = "";
        this.day = "";
        this.dayDate = "";

        theMonths.forEach(m => {
            if (date.includes(m)) this.month = m + " ";
        });

        theDays.forEach(d => {
            if (date.includes(d)) this.day = d + " ";
        });

        for (let i = 0; i <= 31; i++) if (date.includes(i.toString())) this.dayDate = i.toString();
    }

    getMonth() { return this.month; }

    getDay() { return this.day; }

    getDayDate() { return this.dayDate; }

}

module.exports = TextDate;

