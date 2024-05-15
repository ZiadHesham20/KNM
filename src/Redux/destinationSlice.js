import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const header = `Bearer ${localStorage.getItem('auth_token')}`;

export const getDestinations = createAsyncThunk('destinations/get',async ()=>{
const {data} = await axios.get('api/destinations')
console.log(data);
return data.data
})
export const getPaginatorDestinations = createAsyncThunk('destinationsPaginator/get',async (id)=>{
    let { data } = await axios.get(`api/destinations?page=${id}`)
    return data
})
export const deleteDestination = createAsyncThunk('destination/delete',async (selectToDel)=>{
    await axios.delete(`api/destinations/${selectToDel}`,{ headers: { Authorization: header } })
})

const destinationSlice = createSlice({
    name: "destinationSlice",
    initialState: {
        destinations: null,
        selectedDestination: null,
        selectedDestinationCost: null,
        paginatorInfo: null,
        pervAndNext: null,
        loading: null,
        error: null
    },
    reducers: {
    },
    extraReducers: builder => builder
        .addCase(getDestinations.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(getDestinations.fulfilled, (state, { payload }) => {
            state.destinations = payload
            state.selectedDestination = localStorage.getItem('selectedDestinations') != null? payload.filter(elem=>elem.from == JSON.parse(localStorage.getItem('selectedDestinations')).from && elem.to == JSON.parse(localStorage.getItem('selectedDestinations')).to):null
            state.selectedDestinationCost = localStorage.getItem('selectedDestinations') != null ?payload.filter(elem=>elem.from == JSON.parse(localStorage.getItem('selectedDestinations')).from && elem.to == JSON.parse(localStorage.getItem('selectedDestinations')).to)[0]!= undefined?payload.filter(elem=>elem.from == JSON.parse(localStorage.getItem('selectedDestinations')).from && elem.to == JSON.parse(localStorage.getItem('selectedDestinations')).to)[0].cost:null:null
            state.loading = null
            state.error = null
        })
        .addCase(getDestinations.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        .addCase(getPaginatorDestinations.fulfilled, (state, { payload }) => {
            state.destinations = payload.data
            state.paginatorInfo = payload.meta
            state.pervAndNext = payload.links
            state.loading = null
            state.error = null
        })
        .addCase(deleteDestination.fulfilled, (state, action) => {
            state.destinations = state.destinations.filter((elem)=>elem.id != action.meta.arg)
            state.loading = null
            state.error = null
        })
        
})

export default destinationSlice.reducer