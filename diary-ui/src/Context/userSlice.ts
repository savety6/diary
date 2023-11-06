import { createSlice } from "@reduxjs/toolkit";

export type User = {
    name: string;
}

export type UserListState = {
    users: User[];
    loading: boolean;
    error: boolean;
}

const initialState: UserListState = {
    users: [],
    loading: false,
    error: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
    }
});

export default userSlice.reducer;