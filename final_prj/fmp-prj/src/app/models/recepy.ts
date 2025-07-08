export class Recepy {
    public id: string = "";
    public name: string = "";
    public mealType: MealType = MealType.LUNCH;
    public imageId?: string;
}

enum MealType { LUNCH, DINNER }