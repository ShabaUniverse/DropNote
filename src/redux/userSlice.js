import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        isLogged: localStorage.getItem("isLogged") === "true" || false,
        currentUID: localStorage.getItem("currentUID") === "true" || false,
    },
    reducers: {
        setIsLogged(state, action){
            state.isLogged = action.payload;
            localStorage.setItem("isLogged", action.payload)
        },
        setCurrentUID(state, action){
            state.currentUID = action.payload;
            localStorage.setItem("currentUID", action.payload)
        }
    }
})

export const {setIsLogged, setCurrentUID} = userSlice.actions;
export default userSlice.reducer;
