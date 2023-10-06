import React, { FC } from "react"
import { memo } from "react"

type CategoriesProps = {
  value: number
  onClickCategory: (i: number) => void
}

const Categories: FC<CategoriesProps> = memo(({ value, onClickCategory }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ]

  return (
    <div className="categories">
      <ul>
        {categories.map((categorie, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={value === index ? "active" : ""}
            >
              {categorie}
            </li>
          )
        })}
      </ul>
    </div>
  )
})

export default Categories
