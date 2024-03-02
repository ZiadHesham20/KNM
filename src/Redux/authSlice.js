import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const signIn = createAsyncThunk('user/signIn', async ({email,password})=>{
   
    try {
        await axios.get('sanctum/csrf-cookie').then(async res=>{
            await axios.post('api/login',{email:email
        ,password:password}).then(res=>{
                if (res.data.role == 0) {
                  localStorage.setItem('auth_token',res.data.token);
                  localStorage.setItem('user_id',res.data.user_id)
                  localStorage.setItem('role',res.data.role)
            
                } else {
                  localStorage.setItem('auth_token',res.data.token);
                  localStorage.setItem('user_id',res.data.user_id)
                  localStorage.setItem('role',res.data.role)
     
                }
            })
          })
    } catch (error) {
       return error.response.data
    }
})

const authSlice = createSlice({
    name: "authSlice ",
    initialState: {
        userData:{
            name:"",
            address:"",
            email: "",
            password: "",
            confirmPassword:""


        },
        loading: null,
        errors: null
    },
    reducers: {
    },
    extraReducers: builder => builder
        .addCase(signIn.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(signIn.fulfilled, (state, {payload}) => {
            state.loading = false
            state.errors = payload
            
        })
        
       
})


export default authSlice .reducer