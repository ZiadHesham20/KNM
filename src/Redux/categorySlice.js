import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const header = `Bearer ${localStorage.getItem('auth_token')}`;

export const getCategories = createAsyncThunk('cat/get',async()=>{
    const { data } = await axios.get(`api/categories`,{ headers: { Authorization: header } })
    
    return data.data
})

export const deleteCategories = createAsyncThunk('cat/delete',async(selectToDel)=>{
    const { data } = await axios.delete(`api/categories/${selectToDel}`,{ headers: { Authorization: header } })
    
    return data.data
})

const categorySlice = createSlice({
    name: "categorySlice",
    initialState: {
        categories: null,
        loading: null,
        error: null,
        totalCategory: null
    },
    reducers: {
        
    },
    extraReducers: builder=>{
        builder.addCase(getCategories.pending,state=>{
            state.loading = true
        })
        builder.addCase(getCategories.fulfilled,(state,action)=>{
            
           state.categories = action.payload
           state.totalCategory = action.payload.length
            state.loading = null
            state.error = null
        })
        builder.addCase(getCategories.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(deleteCategories.fulfilled,(state,action)=>{
            state.categories = state.categories.filter((elem)=>elem.id != action.meta.arg)
            state.loading = null
            state.error = null
        })
    }
       
})


export default categorySlice.reducer