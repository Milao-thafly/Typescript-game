export type OrganName = "Heart" | "Brain" | "Stomach" | "Lungs" | "Gut" | "Biceps"

export interface OrganHitbox {
    name: OrganName;
    x: number;
    y: number;
    width: number;
    height: number;
}