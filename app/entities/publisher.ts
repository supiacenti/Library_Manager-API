interface Publishers {
    name: string;
}

export class Publisher implements Publishers {
    constructor(public name: string) {}

    toString() {
        return this.name;
    }
}

export default Publisher;