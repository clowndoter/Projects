import React, { createContext, useEffect, useState } from "react"
import "./scss/app.scss"
import Header from "./components/Header"
import Home from "./pages/Home"
import NotFound from "./components/NotFoundBlock"
import { Route, Routes } from "react-router-dom"
import Cart from "./pages/Cart"
import AboutPizza from "./components/AboutPizza"

export const SearchContext = createContext<{
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}>({ searchValue: "", setSearchValue: () => {} })

function App() {
  const [searchValue, setSearchValue] = useState("")

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home searchValue={searchValue} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pizza/:id" element={<AboutPizza />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  )
}

export default App
