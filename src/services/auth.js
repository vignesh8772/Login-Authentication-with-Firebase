import { getuserdata} from "./Storage"

export default function isAuthentication() {
    return getuserdata()!=null ? true : false
}
