export class Movie {
    id: number;
    name: string;
    url: string;

    constructor(id = 0, name = "movie", url = "") {
        this.id = id;
        this.name = name;
        this.url = url;
    }
}
