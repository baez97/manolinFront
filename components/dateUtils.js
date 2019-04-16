
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
    ];

    weekdays = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo"
    ]

    dateObj = new Date();

    daysPerMonth = [
        31, 28, 31, 30, 
        31, 30, 31, 31, 
        30, 31, 30, 31
    ];

    today = {
        day   : this.dateObj.getDate(),
        month : this.dateObj.getMonth(),
        year  : this.dateObj.getFullYear()
    };
    
    indexOfToday = this.getIndexOfToday();

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
            if ( cumulated <= index )
                cumulated+= this.daysPerMonth[i];
            else
                return i-1;
        }
    }
    
    getDateString(turn) {
        const { day, month, weekday } = turn;
        const weekdayString = this.weekdays[weekday -1];
        const monthString   = this.months[month -1];

        return `${weekdayString} ${day} de ${monthString}`;
    }

    getTurnString(character) {
        switch(character) {
            case 'M':
                return "por la mañana";
            case 'T':
                return "por la tarde";
            case 'N':
                return "por la noche";
            case 'L':
                return "(LIBRE)";
            case '-':
                return "(SALIDA DE NOCHE)";
        }
    }
}

export default DateUtils;