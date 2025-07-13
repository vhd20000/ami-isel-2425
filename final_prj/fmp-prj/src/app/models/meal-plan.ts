import { Timestamp } from "firebase/firestore";
import { Recepy } from "./recepy";

export class MealPlan {
    public plan!: MealPlanEntry[];

    constructor(plan: MealPlanEntry[]) {
        this.plan = plan;
    }
}

export class MealPlanEntry {
    public date!: Timestamp;
    public recepies!: Recepy[];
}
