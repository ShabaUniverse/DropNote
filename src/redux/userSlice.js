import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        isLogged: localStorage.getItem("isLogged") === "true" || false,
    },
    reducers: {
        setIsLogged(state, action){
            state.isLogged = action.payload;
            localStorage.setItem("isLogged", action.payload)
        }
    }
})

export const {setIsLogged} = userSlice.actions;
export default userSlice.reducer;
