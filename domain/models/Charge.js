class Charge{
    constructor(id,name,amount){
        this.id = id;
        this.name = name;
        this.amount = amount;
    }

    static get Builder() {
        class Builder {
            constructor() {
                this.id = null;
                this.name = "";
                this.amount = null;
            }
            setId(id) { this.id = id; return this; }
            setName(name) { this.name = name; return this; }
            setAmount(amount) { this.amount = amount; return this; }
            build() {
                return new Charge(
                    this.id,
                    this.name,
                    this.amount
                );
            }
        }
        return Builder;
    }
}