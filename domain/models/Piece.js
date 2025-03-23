class Piece {
    constructor(id,name,description){
        this.id = id;
        this.name = name;
        this.description = description;
    }

    static get Builder() {
        class Builder {
            constructor() {
                this.id = null;
                this.name = "";
                this.description = "";
            }
            setId(id) { this.id = id; return this; }
            setName(name) { this.name = name; return this; }
            setDescription(description) { this.description = description; return this; }
            build() {
                return new Piece(
                    this.id,
                    this.name,
                    this.description
                );
            }
        }
        return Builder;
    }
}

module.exports = Piece;