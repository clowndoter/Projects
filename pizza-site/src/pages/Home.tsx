import React, { FC, useCallback, useEffect, useState } from "react"
import Sort from "../components/Sort"
import Categories from "../components/Categories"
import PizzaBlock from "../components/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"
import { useSelector } from "react-redux"
import { setCategoryId } from "../redux/slices/filterSlice"
import { fetchPizzas } from "../redux/slices/pizzasSlice"
import { RootState, useAppDispatch } from "../redux/store"

type HomeProps = {
  searchValue: string
}

const Home: FC<HomeProps> = ({ searchValue }) => {
  const categoryId = useSelector((state: RootState) => state.filter.categoryId)
  const sort = useSelector((state: RootState) => state.filter.sort)
  const { items: pizzas, status } = useSelector(
    (state: RootState) => state.pizza
  )
  const dispatch = useAppDispatch()

  const onClickCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id))
  }, [])

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ))
  const items = pizzas
    .filter((pizza: any) => {
      return pizza.title.toLowerCase().includes(searchValue.toLowerCase())
    })
    .map((pizza: any) => {
      return (
        <PizzaBlock
          key={pizza.id}
          id={pizza.id}
          imageUrl={pizza.imageUrl}
          title={pizza.title}
          price={pizza.price}
          sizes={pizza.sizes}
          types={pizza.types}
        />
      )
    })

  useEffect(() => {
    const categoryFilter = categoryId > 0 ? `category=${categoryId}` : ``
    const order = sort.sortProperty.includes("-") ? "&order=asc" : "&order=desc"
    const sortFilter = "sortBy=" + sort.sortProperty.replace("-", "")

    dispatch(fetchPizzas({ categoryFilter, order, sortFilter }))
    window.scrollTo(0, 0)
  }, [categoryId, sort])
  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id: number) => onClickCategory(id)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "loading" ? skeletons : items}
      </div>
    </>
  )
}

export default Home
