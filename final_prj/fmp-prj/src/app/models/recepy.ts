export class Recepy {
    public id: string = "";
    public name: string = "";
    public prepTimeMins: number = 0;
    public servings: number = 0;
    public calories?: number;
    public categories?: string[];
    public ingredients?: string[];
    public steps?: string[];
    public imageId?: string;
    public image?: string;
    public mealType?: string;
}