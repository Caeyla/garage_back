
const schedule = {
    openingTime : "08:00",
    lunchTime : "12:00",
    endLunchTime : "13:00",
    closingTime : "17:00"
}
const mecha1 = {
    id: 1,
    specialities: ["speciality 1", "speciality 2"],
    unavailableDates: ["2025-04-5", "2025-03-31"]
}

const mecha2 = {
    id: 2,
    specialities: ["speciality 1", "speciality 4"],
    unavailableDates: ["2025-04-30", "2025-04-31"]
}

const appointments = [
    {
        id: 1,
        customerId: 1,
        mechanicId: 1,
        startDate: new Date("2025-04-01T08:30:00"),
        endDate: new Date("2025-04-01T09:30:00"),
    },
    {
        id: 2,
        customerId: 1,
        mechanicId: 2,
        startDate: new Date("2025-04-05T08:30:00"),
        endDate: new Date("2025-04-05T09:30:00"),

    }
];

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
        if (
            this.startDate.getTime() <= anotherDateTimeInterval.endDate.getTime() && anotherDateTimeInterval.startDate.getTime() <= this.endDate.getTime()
            ){
            const startDate = Math.max(this.startDate, anotherDateTimeInterval.startDate);
            const endDate = Math.min(this.endDate, anotherDateTimeInterval.endDate);
            return new DateTimeInterval(startDate, endDate);
        }
        return null;
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

function getMechaBySpeciality(speciality) {
    return [mecha1, mecha2].filter(mecha => mecha.specialities.includes(speciality));
}

function buildUnavailabilityArray(mecha) {
    const unavailabilityArray = [];
    for (const date of mecha.unavailableDates) {
        unavailabilityArray.push(new DateTimeInterval(date));
    }
    const mechaAppointments = appointments
    .filter(appointment => appointment.mechanicId === mecha.id)
    .map(appointment => new DateTimeInterval(appointment.startDate, appointment.endDate));

    unavailabilityArray.push(...mechaAppointments);
    return unavailabilityArray;
}

const mechaFinds = getMechaBySpeciality("speciality 1");
console.log("*********************Mecha find*************************")
console.log(mechaFinds[0]);
console.log("*********************Unavailability array*************************")
const unavailabilityArray = buildUnavailabilityArray(mecha1);
console.log(unavailabilityArray);

/*****************interval */
console.log("*********************Interval*************************")
//datediff
const date1 = new DateTimeInterval("2025-04-05T07:30:00","2025-04-05T08:30:00");
const date2 = new DateTimeInterval("2025-04-05T08:30:00","2025-04-05T12:30:00");
console.log("interval 1 : ",date1);
console.log("interval 2 : ",date2);
console.log("intersection ",date1.getUnionInterval(date2));