import $api from "@/app/http";

class GarageService {
    async getAll(page: number) {
        return $api.get(`/garage/?page=${page}`);
    }
}

export default new GarageService();
