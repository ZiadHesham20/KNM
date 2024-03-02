import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const header = `Bearer ${localStorage.getItem('auth_token')}`;

// wa2F HENA 3nd slice el currency
export const getCurrency = createAsyncThunk('currency/get',async()=>{
    let {data} = await axios.get('api/currencies')
    return data.data
})

export const deleteCurrency = createAsyncThunk('currency/delete',async(selectToDel)=>{
    await axios.delete(`api/currencies/${selectToDel}`,{ headers: { Authorization: header } })
})

const currencySlice= createSlice({
    name: "currencySlice",
    initialState: {
        currencies: null,
        totalCurrencies: null,
        loading: null,
        error: null
    },
    reducers: {
    },
    extraReducers: builder => builder
        .addCase(getCurrency.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(getCurrency.fulfilled, (state, { payload }) => {
            state.currencies = payload // action.payload
            state.totalCurrencies = payload.length
            state.loading = null
            state.error = null
        })
        .addCase(getCurrency.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        .addCase(deleteCurrency.fulfilled, (state, { meta }) => {
            state.currencies = state.currencies.filter((elem)=>elem.id != meta.arg)
            state.loading = null
            state.error = null
        })
})


export default currencySlice.reducer