class Prestation {
    constructor(id, name,description,price,duration,specialities) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.duration = duration;
        this.specialities = specialities;
    }

    // builder 
    static get Builder() {
        class Builder {
            constructor() {
                this.id = null;
                this.name = "";
                this.price = 0;
                this.duration = 0;
                this.specialities = [];
            }

            setId(id) { this.id = id; return this; }
            setName(name) { this.name = name; return this; }
            setPrice(price) { this.price = price; return this; }
            setDuration(duration) { this.duration = duration; return this; }
            setSpecialities(specialities) { this.specialities = specialities; return this; }

            build() {
                return new Prestation(
                    this.id,
                    this.name,
                    this.price,
                    this.duration,
                    this.specialities
                );
            }
        }
        return Builder;
    }
}

module.exports = Prestation;