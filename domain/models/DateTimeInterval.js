const schedule = {
    openingTime : "08:00",
    lunchTime : "12:00",
    endLunchTime : "13:00",
    closingTime : "17:00"
}

class DateTimeInterval{
    //does not support overreading so i use some bypass mechanism
    constructor(startDate, endDate = null){
        if(!endDate){
            // specificaly for unavailability of mechanic 
            this.startDate = new Date(startDate+" "+schedule.openingTime);
            this.endDate = new Date(startDate+" "+schedule.closingTime);
        }else{
            // specificaly for appointments
            this.startDate = new Date(startDate);
            this.endDate = new Date(endDate);
        }  
    }

    getIntersectionInterval(anotherDateTimeInterval) {
        if(!this.isSameDay(anotherDateTimeInterval)) return null;
        if (
            this.startDate.getTime() <= anotherDateTimeInterval.endDate.getTime() 
            && anotherDateTimeInterval.startDate.getTime() <= this.endDate.getTime()
            ){
            const startDate = Math.max(this.startDate, anotherDateTimeInterval.startDate);
            const endDate = Math.min(this.endDate, anotherDateTimeInterval.endDate);
            return new DateTimeInterval(startDate, endDate);
        }
        return null;
    }

    isSameDay(anotherDateTimeInterval) {
        return this.startDate.getDate() === anotherDateTimeInterval.startDate.getDate() 
        && this.startDate.getMonth() === anotherDateTimeInterval.startDate.getMonth()
        && this.startDate.getFullYear() === anotherDateTimeInterval.startDate.getFullYear();
    }
    
    getUnionInterval(anotherDateTimeInterval) {
        if(this.startDate.getTime() <= anotherDateTimeInterval.endDate.getTime() || anotherDateTimeInterval.startDate.getTime() <= this.endDate.getTime()){
            const startDate = Math.min(this.startDate, anotherDateTimeInterval.startDate);
            const endDate = Math.max(this.endDate, anotherDateTimeInterval.endDate);
            return new DateTimeInterval(startDate, endDate);
        }
        return null;
    }
}

module.exports = DateTimeInterval;