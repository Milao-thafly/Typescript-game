export type OrganName = "Heart" | "Brain" | "Stomach" | "Lungs" | "Gut" | "Biceps"

export interface OrganHitbox {
    name: OrganName;
    left: number;
    top: number;
    width: number;
    height: number;
    imgSrc: string;

}