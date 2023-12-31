import React, { FC, useContext } from "react"

import cl from "./Search.module.scss"
import { SearchContext } from "../../App"

const Search: FC = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext)

  return (
    <div className={cl.root}>
      <svg
        className={cl.icon}
        enableBackground="new 0 0 50 50"
        height="50px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 50 50"
        width="50px"
      >
        <rect fill="none" height="50" width="50" />
        <circle
          cx="21"
          cy="20"
          fill="none"
          r="16"
          stroke="#000000"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          stroke="#000000"
          strokeMiterlimit="10"
          strokeWidth="4"
          x1="32.229"
          x2="45.5"
          y1="32.229"
          y2="45.5"
        />
      </svg>
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={cl.input}
        placeholder="Поиск пиццы"
      />
    </div>
  )
}

export default Search
