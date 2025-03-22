class Vehicle {
    constructor(id, registrationNumber, typeVehicle, brand, model, yearOfManufacture, transmission,kilometers,customerId,picture) {
        this.id = id;
        this.registrationNumber = registrationNumber;
        this.typeVehicle = typeVehicle;
        this.brand = brand;
        this.model = model;
        this.yearOfManufacture = yearOfManufacture;
        this.kilometers = kilometers;
        this.transmission = transmission;
        this.customerId = customerId;
        this.picture = picture;
    }

    setCustomerId(customerId){
        this.customerId = customerId
    }

    static get Builder() {
        class Builder {
            constructor() {
                this.id = null;
                this.registrationNumber = "";
                this.typeVehicle = "";
                this.brand = "";
                this.model = "";
                this.yearOfManufacture = "";
                this.kilometers = null;
                this.transmission = "";
                this.customerId = null;
                this.picture = null;
            }

            setId(id) { this.id = id; return this; }
            setRegistrationNumber(registrationNumber) { this.registrationNumber = registrationNumber; return this; }
            setTypeVehicle(typeVehicle) { this.typeVehicle = typeVehicle; return this; }
            setBrand(brand) { this.brand = brand; return this; }
            setModel(model) { this.model = model; return this; }
            setKilometers(kilometers) { this.kilometers = kilometers; return this; }
            setYearOfManufacture(yearOfManufacture) { this.yearOfManufacture = yearOfManufacture; return this; }
            setTransmission(transmission) { this.transmission = transmission; return this; }
            setCustomerId(customerId) { this.customerId = customerId; return this; }
            setPicture(picture) { this.picture = picture; return this; }

            build() {
                return new Vehicle(
                    this.id,
                    this.registrationNumber,
                    this.typeVehicle,
                    this.brand,
                    this.model,
                    this.yearOfManufacture,
                    this.transmission,
                    this.kilometers,
                    this.customerId,
                    this.picture
                );
            }
        }
        return Builder;
    }

}

module.exports = Vehicle;