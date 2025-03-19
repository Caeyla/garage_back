class Prestation {
    constructor(id, name,description,price,duration) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.duration = duration;
    }

    // builder 
    static get Builder() {
        class Builder {
            constructor() {
                this.id = null;
                this.name = "";
                this.price = 0;
                this.duration = 0;
            }

            setId(id) { this.id = id; return this; }
            setName(name) { this.name = name; return this; }
            setPrice(price) { this.price = price; return this; }
            setDuration(duration) { this.duration = duration; return this; }

            build() {
                return new Prestation(
                    this.id,
                    this.name,
                    this.price,
                    this.duration
                );
            }
        }
        return Builder;
    }
}

module.exports = Prestation;