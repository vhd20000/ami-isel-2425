export class Recepy {
    public id: string = "";
    public name: string = "";
    public mealType: MealType = MealType.LUNCH;
    public imageId?: string;
    public image?: string;
}

enum MealType { LUNCH, DINNER }