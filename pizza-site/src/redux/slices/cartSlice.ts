import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type CartItem = {
  id: string
  title: string
  price: number
  imageUrl: string
  count: number
  size: number
  type: string
}

interface CartSliceState {
  items: CartItem[]
  totalPrice: number
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      )
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      )

      const findIndex = state.items.findIndex(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      )

      if (action.payload.count === 1) {
        state.items.splice(findIndex, 1)
      } else {
        findItem && findItem.count--
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      const findIndex = state.items.findIndex(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      )

      state.items.splice(findIndex, 1)

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
  },
})

export const { addItem, removeItem, minusItem, clearItems, setCart } =
  cartSlice.actions
export default cartSlice.reducer
