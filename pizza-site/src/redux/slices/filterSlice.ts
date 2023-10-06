import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum SortPropertyEnum {
  RATING_DESC = "rating",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
  TITLE_ASC = "-title",
}

type Sort = {
  name: string
  sortProperty: SortPropertyEnum
}

interface FilterSliceState {
  categoryId: number
  sort: Sort
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    },
  },
})

export const { setCategoryId, setSort } = filterSlice.actions
export default filterSlice.reducer
