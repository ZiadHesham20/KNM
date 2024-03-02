import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const header = `Bearer ${localStorage.getItem('auth_token')}`;

export const getReviews = createAsyncThunk('reviews/get',async ()=>{
    let {data} = await axios.get('api/reviews',{ headers: { Authorization: header } })
    return data.data
})
export const deleteReviews = createAsyncThunk('review/delete',async (selectToDel)=>{
    await axios.delete(`api/reviews/${selectToDel}`,{ headers: { Authorization: header } })
})

const reviewSlice = createSlice({
    name: "reviewSlice",
    initialState: {
        reviews: null,
        totalReviews: null,
        loading: null,
        error: null
    },
    reducers: {
       
    },
    extraReducers: builder => builder
        .addCase(getReviews.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(getReviews.fulfilled, (state, { payload }) => {
            state.reviews = payload
            state.totalReviews = payload.length
            state.loading = null
            state.error = null
        })
        .addCase(getReviews.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        .addCase(deleteReviews.fulfilled, (state,action) => {
            state.reviews = state.reviews.filter((elem)=>elem.id != action.meta.arg)
            state.loading = null
            state.error = null
        })
       
})


export default reviewSlice.reducer