
const schedule = {
    openingTime : "08:00",
    lunchTime : "12:00",
    endLunchTime : "13:00",
    closingTime : "17:00"
}
const mecha1 = {
    id: 1,
    specialities: ["speciality 1", "speciality 2"],
    unavailableDates: ["2025-03-30", "2025-03-31"]
}

const mecha2 = {
    id: 2,
    specialities: ["speciality 3", "speciality 4"],
    unavailableDates: ["2025-03-30", "2025-03-31"]
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
            this.startDate = startDate;
            this.endDate = endDate;
        }   
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

function transformUnavailabilityDatesToDateTime(unavailabilityArray) {
    const dateTimeArray = [];
    for (const date of unavailabilityArray) {
        dateTimeArray.push(new Date(date));
    }
    return dateTimeArray;
}

const mechaFind = getMechaBySpeciality("speciality 1");
console.log(mechaFind);

const unavailabilityArray = buildUnavailabilityArray(mecha1);
console.log(unavailabilityArray);