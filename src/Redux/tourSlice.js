import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const header = `Bearer ${localStorage.getItem('auth_token')}`;

export const getTours = createAsyncThunk("tours/get", async()=>{
    const {data} = await axios.get("api/travels")
    return data.data
})
export const getToursInPaginator = createAsyncThunk("toursPage/get", async(id)=>{
    const {data} = await axios.get(`api/travels?page=${id}`)
    return data
})
export const getToursByCategory = createAsyncThunk("toursByCat/get", async(cat)=>{
    const {data} = await axios.get(`api/travels/by-category/${cat}`)
    return data.data
})
export const deleteTour = createAsyncThunk("tour/delete", async(selectToDel)=>{
    await axios.delete(`api/travels/${selectToDel}`,{ headers: { Authorization: header } })
    
})

function getRandomElements(arr, numElements) {
    const copyArr = arr.slice();
  
    if (numElements > copyArr.length) {
     
      return null;
    }
  
    const randomElements = [];
    for (let i = 0; i < numElements; i++) {
      const randomIndex = Math.floor(Math.random() * copyArr.length);
      randomElements.push(copyArr.splice(randomIndex, 1)[0]);
    }
  
    return randomElements;
  }

const tourSlice = createSlice({
    name: "tourSlice",
    initialState: {
        allTours: null,
        popularTours: null,
        randomTours: null,
        paginatorInfo: null,
        pervAndNext: null,
        loading: null,
        error: null
    },
    reducers: {
        
    },
    extraReducers: builder => {
        builder.addCase(getTours.pending,state=>{
            state.loading = true
        })
        builder.addCase(getTours.fulfilled,(state,action)=>{
            state.popularTours = action.payload.sort((a,b)=> b.booked - a.booked).slice(0,6)
            state.allTours = action.payload
            state.randomTours = getRandomElements(action.payload,2)
            state.loading = null
            state.error = null
        })
        builder.addCase(getTours.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(getToursByCategory.pending,(state,action)=>{
            state.loading = true
            state.error = null
        })
        builder.addCase(getToursByCategory.fulfilled,(state,action)=>{
            state.allTours = action.payload
            state.loading = null
            state.error = null
        })
        builder.addCase(getToursInPaginator.fulfilled,(state,{payload})=>{
            state.allTours = payload.data
            state.paginatorInfo = payload.meta
            state.pervAndNext = payload.links
            state.loading = null
            state.error = null
        })
        builder.addCase(deleteTour.fulfilled,(state,action)=>{
            state.allTours = state.allTours.filter((elem)=>elem.id != action.meta.arg)
            state.loading = null
            state.error = null
        })
        
    }
    
       
})


export default tourSlice.reducer