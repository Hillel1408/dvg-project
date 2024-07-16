import type { IAuto } from "@/app/types/global";

export interface AutoProps {
    item: IAuto;
    activeGarage: number;
    deleteAuto: () => void;
    addAuto: () => void;
}
