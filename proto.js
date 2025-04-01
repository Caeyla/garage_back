const DateTimeInterval = require("./domain/models/DateTimeInterval");


const mecha1 = {
    id: 1,
    specialities: ["speciality 1", "speciality 2"],
    unavailableDates: ["2025-04-8", "2025-04-6"]
    // "2025-03-31"
}

const mecha2 = {
    id: 2,
    specialities: ["speciality 1", "speciality 4"],
    unavailableDates: ["2025-04-30", "2025-04-6"]
    // "2025-04-31"
}

const mecha3 = {
    id: 3,
    specialities: ["speciality 1", "speciality 4"],
    unavailableDates: ["2025-04-31", "2025-04-7"]
}

const appointments = [
    {
        id: 1,
        customerId: 1,
        mechanicId: 1,
        startDate: new Date("2025-04-01T08:30:00"),
        endDate: new Date("2025-04-01T09:30:00")
    },
    {
        id: 2,
        customerId: 1,
        mechanicId: 2,
        startDate: new Date("2025-04-05T08:15:00"),
        endDate: new Date("2025-04-05T09:30:00")

    },
    {
        id: 3,
        customerId: 1,
        mechanicId: 3,
        startDate: new Date("2025-04-06T08:15:00"),
        endDate: new Date("2025-04-06T09:30:00")
    }
];

function getMechaBySpeciality(speciality) {
    return [mecha1, mecha2,mecha3].filter(mecha => mecha.specialities.includes(speciality));
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
// console.log("*********************Mecha find*************************")
// console.log(mechaFinds[0]);
// console.log("*********************Unavailability array*************************")
// const unavailabilityArray = buildUnavailabilityArray(mecha1);
// console.log(unavailabilityArray);

// /*****************interval */
// console.log("*********************Interval*************************");

// const date1 = new DateTimeInterval("2025-04-05T07:30:00","2025-04-05T08:30:00");
// const date2 = new DateTimeInterval("2025-04-05T07:30:00","2025-04-05T08:30:00");
// console.log("interval 1 : ",date1);
// console.log("interval 2 : ",date2);
// console.log("intersection ",date1.getIntersectionInterval(date2));

console.log("**************************ALGO*******************************");
function getUnavailableDates(speciality) {
    const mechaFinds = getMechaBySpeciality(speciality);
    let unavailabilities = buildUnavailabilityArray(mechaFinds[0]);
    for(let i=1; i<mechaFinds.length; i++){
       unavailabilities = getunavailabilitiesForMecha(unavailabilities,mechaFinds[i]);
    }
    return unavailabilities;
}

function getunavailabilitiesForMecha(unavailabilities,mecha){
    const unavailabilitiesOfMecha = buildUnavailabilityArray(mecha);
    let intersections = getIntersectionIntervals(unavailabilities,unavailabilitiesOfMecha);
    return intersections;
}

function getIntersectionIntervals(unavailabilities,unavailabilitiesOfMecha){
    const intersections = [];
    for(let i=0; i<unavailabilities.length; i++){
        intersections.push(...getIntersectionForOneInterval(unavailabilities[i],unavailabilitiesOfMecha));
    }
    return intersections;
}

function getIntersectionForOneInterval(unavailability,unavailabilitiesOfMecha){
    const oneIntervalIntersections = [];
    for(let j=0; j<unavailabilitiesOfMecha.length; j++){
        const intersection = unavailability.getIntersectionInterval(unavailabilitiesOfMecha[j]);
        if(intersection){
            oneIntervalIntersections.push(intersection);
        }
    }
    return oneIntervalIntersections;
}

console.log("VALINY UNAVAILABILITIES",getUnavailableDates("speciality 1"));