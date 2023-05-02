import { getStudent } from "../API/Endpoints/userEndpoints";

const defaultUserEmail = 'anirudh.umarji@utdallas.edu';

export default function checkAuthToken(token: String|null|undefined) {
    if (!token || token === null || token === undefined || token.length <= 0) {
        return false;
    }

    if (getStudent(defaultUserEmail).then.length <= 0) {
        return false;
    }

    return true;
}