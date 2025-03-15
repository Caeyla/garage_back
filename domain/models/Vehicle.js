class Vehicle {
    constructor(id, registrationNumber, typeVehicle, brand, model, yearOfManufacture, transmission) {
        this.id = id;
        this.registrationNumber = registrationNumber;
        this.typeVehicle = typeVehicle;
        this.brand = brand;
        this.model = model;
        this.yearOfManufacture = yearOfManufacture;
        this.transmission = transmission;
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
                this.transmission = "";
            }

            setId(id) { this.id = id; return this; }
            setRegistrationNumber(registrationNumber) { this.registrationNumber = registrationNumber; return this; }
            setTypeVehicle(typeVehicle) { this.typeVehicle = typeVehicle; return this; }
            setBrand(brand) { this.brand = brand; return this; }
            setModel(model) { this.model = model; return this; }
            setYearOfManufacture(yearOfManufacture) { this.yearOfManufacture = yearOfManufacture; return this; }
            setTransmission(transmission) { this.transmission = transmission; return this; }

            build() {
                return new Vehicle(
                    this.id,
                    this.registrationNumber,
                    this.typeVehicle,
                    this.brand,
                    this.model,
                    this.yearOfManufacture,
                    this.transmission
                );
            }
        }
        return Builder;
    }

}