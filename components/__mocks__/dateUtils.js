const fixedDate = new Date('2019-02-26T09:39:59');

Date = class extends Date {
    constructor() {
        super();
        return fixedDate;
    }
};

class DateUtils {
    months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ]

    dateObj = new Date()

    daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    today = {
        day   : this.dateObj.getDate(),
        month : this.dateObj.getMonth(),
        year  : this.dateObj.getFullYear()
    };

    getIndexOfToday() {
        var index = 0;

        for ( let i = 0; i < this.today.month; i++ )
            index += this.daysPerMonth[i];

        index += this.today.day -1

        return index;
    }
    
    getMonthOfDayIndex(index) {
        var cumulated = 0;
        for ( var i = 0; i < 12; i++ ) {
            if ( cumulated < index )
                cumulated+= this.daysPerMonth[i];
            else
                return i-1;
        }
    }

    indexOfToday = this.getIndexOfToday();
}

export default DateUtils;