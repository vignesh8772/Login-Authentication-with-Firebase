import { getuserdata} from "./Storage"

export function isAuthentication() {
    return getuserdata()!=null ? true : false
}