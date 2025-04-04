const schedule =  {
    openingTime : "08:00",
    // lunchTime : "12:00",
    // endLunchTime : "13:00",
    closingTime : "17:00"
}
class ScheduleService{

    static expectThatDateIsInDailyOpeningHours(date) {
        const [openHour, openMinute] = schedule.openingTime.split(':').map(Number);
        const [closeHour, closeMinute] = schedule.closingTime.split(':').map(Number);
        
        const openingTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), openHour, openMinute, 0, 0);
        const closingTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), closeHour, closeMinute, 0, 0);
        
        if(now < openingTime || now > closingTime) {
            throw new CustomError("Date must be in daily opening hours", 400);
        }
    }

}