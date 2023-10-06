import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: Record<string, string>) => {
    const { categoryFilter, order, sortFilter } = params
    const { data } = await axios.get<PizzaItem[]>(
      `https://6435379583a30bc9ad5aeaf1.mockapi.io/items?${categoryFilter}&${sortFilter}${order}`
    )
    return data as PizzaItem[]
  }
)

type PizzaItem = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
}

interface PizzaSliceState {
  items: PizzaItem[]
  status: "loading" | "success" | "error"
}

const initialState: PizzaSliceState = {
  items: [],
  status: "loading",
}

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = []
      state.status = "loading"
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = "success"
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = []
      state.status = "error"
    })
  },
})

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer
