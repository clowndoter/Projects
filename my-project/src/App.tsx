import React, { useEffect, useState } from "react"
import "./App.css"
import axios from "axios"
import Exchange from "./components/Exchange"

interface CurrencyRate {
  txt: string
  cc: string
  rate: number
}

function App() {
  const [rates, setRates] = useState<CurrencyRate[]>([
    { txt: "Українська гривня", cc: "UAH", rate: 1 },
  ])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
        )
        setRates([...response.data, ...rates])
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="App bg-dark bg-gradient text-dark">
      <div className="container-lg">
        <Exchange rates={rates} />
      </div>
    </div>
  )
}

export default App
