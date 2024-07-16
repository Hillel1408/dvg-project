import type { IGarage } from "@/app/types/global";

export interface GarageProps {
    item: IGarage;
    addCar: () => void;
}
