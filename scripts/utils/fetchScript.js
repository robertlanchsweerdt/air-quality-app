import { AIR_API_CALL } from "./apiCalls.js";

export const info = () => {

    fetch(AIR_API_CALL.states)
    .then((res) => {
        console.log(res)
        return res.json()
    })
    .then((data) => console.log(data))

}

