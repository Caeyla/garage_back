const schedule =  {
    openingTime : "08:00",
    // lunchTime : "12:00",
    // endLunchTime : "13:00",
    closingTime : "17:00"
}
const CustomError = require('../../error/CustomError');
class ScheduleService{

    static expectThatDateIsInDailyOpeningHours(date) {
        const [openHour, openMinute] = schedule.openingTime.split(':').map(Number);
        const [closeHour, closeMinute] = schedule.closingTime.split(':').map(Number);
        
        const openingTime = new Date(date.startDate.getFullYear(), date.startDate.getMonth(), date.startDate.getDate(), openHour, openMinute, 0, 0);
        const closingTime = new Date(date.startDate.getFullYear(), date.startDate.getMonth(), date.startDate.getDate(), closeHour, closeMinute, 0, 0);
        
        if(date.startDate < openingTime || date.endDate > closingTime) {
            throw new CustomError(`appointment must be in daily opening hours : ${schedule.openingTime} and ${schedule.closingTime}`, 400);
        }
    }
}

module.exports = ScheduleService;