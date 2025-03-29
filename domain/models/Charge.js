class Charge{
    constructor(id,name){
        this.id = id;
        this.name = name;
    }

    static get Builder() {
        class Builder {
            constructor() {
                this.id = null;
                this.name = "";
            }
            setId(id) { this.id = id; return this; }
            setName(name) { this.name = name; return this; }
            build() {
                return new Charge(
                    this.id,
                    this.name
                );
            }
        }
        return Builder;
    }
}