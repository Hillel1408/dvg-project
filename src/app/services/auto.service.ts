import $api from "@/app/http";

class AutoService {
    async getAll(page: number) {
        return $api.get(`/car/?page=${page}`);
    }
    async getByGarageId(garageId: number) {
        return $api.get(`/car/?garage_id=${garageId}`);
    }
    async changeGarage(arg: { garage: number | null }) {
        return $api.put(`/car/`, arg);
    }
}

export default new AutoService();
