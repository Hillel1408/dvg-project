import axios from "axios";
import { API_URL } from "@/app/http";

class AuthService {
    async auth(arg: { username: string; password: string }) {
        return axios.post(`${API_URL}/api/auth/token/login/`, arg);
    }
}

export default new AuthService();
