import React, { FC, useEffect, useState } from "react"

interface ExchangeProps {
  rates: Array<{ txt: string; cc: string; rate: number }>
}

const Exchange: FC<ExchangeProps> = ({ rates }) => {
  const [leftMoney, setLeftMoney] = useState<number>(0)
  const [rightMoney, setRightMoney] = useState<number>(0)
  const [leftRate, setLeftRate] = useState<number>(0)
  const [rightRate, setRightRate] = useState<number>(0)
  const [rightcc, setRightCC] = useState<string>("")
  const [leftcc, setLeftCC] = useState<string>("")

  useEffect(() => {
    setLeftRate(rates[61]?.rate || 0)
    setLeftCC(rates[61]?.cc || "")
    setRightRate(rates[24]?.rate || 0)
    setRightCC(rates[24]?.cc || "")
  }, [rates])

  const leftCalcCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMoney = parseFloat(e.target.value)
    setLeftMoney(newMoney)
    setRightMoney(parseFloat(((newMoney * leftRate) / rightRate).toFixed(2)))
  }

  const rightCalcCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMoney = parseFloat(e.target.value)
    setRightMoney(newMoney)
    setLeftMoney(parseFloat(((newMoney * rightRate) / leftRate).toFixed(2)))
  }

  const lefthandleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const parts = e.target.value.split("/")
    const newRate = parseFloat(parts[0])
    const newCC = parts[1]
    setLeftCC(newCC)
    setLeftRate(newRate)
    setRightMoney(parseFloat(((leftMoney * newRate) / rightRate).toFixed(2)))
  }

  const righthandleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const parts = e.target.value.split("/")
    const newRate = parseFloat(parts[0])
    const newCC = parts[1]
    setRightCC(newCC)
    setRightRate(newRate)
    setRightMoney(parseFloat(((leftMoney * leftRate) / newRate).toFixed(2)))
  }

  return (
    <div className="exchange bg-light bg-gradient row">
      <div className="leftPart col">
        <div className="top">
          <div
            className="currency btn btn-dark"
            onClick={() => {
              setLeftCC(rates[61]?.cc)
              setLeftRate(rates[61]?.rate)
              setRightMoney(
                parseFloat(
                  ((leftMoney * rates[61]?.rate) / rightRate).toFixed(2)
                )
              )
            }}
          >
            UAH
          </div>
          <div
            className="currency btn btn-dark"
            onClick={() => {
              setLeftCC(rates[24]?.cc)
              setLeftRate(rates[24]?.rate)
              setRightMoney(
                parseFloat(
                  ((leftMoney * rates[24]?.rate) / rightRate).toFixed(2)
                )
              )
            }}
          >
            USD
          </div>
          <div
            className="currency btn btn-dark"
            onClick={() => {
              setLeftCC(rates[17]?.cc)
              setLeftRate(rates[17]?.rate)
              setRightMoney(
                parseFloat(
                  ((leftMoney * rates[17]?.rate) / rightRate).toFixed(2)
                )
              )
            }}
          >
            RUB
          </div>
          {rates ? (
            <select
              className="form-select form-select-md mb-3"
              value={`${leftRate}/${leftcc}`}
              onChange={(e) => lefthandleOptionChange(e)}
            >
              {rates.map((el, index) => (
                <option key={index} value={`${el.rate}/${el.cc}`}>
                  {el.txt} ({el.cc}) : {el.rate}
                </option>
              ))}
            </select>
          ) : (
            <div>Loading rates...</div>
          )}
        </div>
        <div className="bottom input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            {leftcc}
          </span>
          <input
            className="form-control"
            type="number"
            value={leftMoney}
            onChange={(e) => leftCalcCurrency(e)}
          ></input>
        </div>
      </div>
      <div className="rightPart col">
        <div className="top">
          <div
            className="currency btn btn-dark"
            onClick={() => {
              setRightCC(rates[61]?.cc)
              setRightRate(rates[61]?.rate)
              setRightMoney(
                parseFloat(
                  ((leftMoney * leftRate) / rates[61]?.rate).toFixed(2)
                )
              )
            }}
          >
            UAH
          </div>
          <div
            className="currency btn btn-dark"
            onClick={() => {
              setRightCC(rates[24]?.cc)
              setRightRate(rates[24]?.rate)
              setRightMoney(
                parseFloat(
                  ((leftMoney * leftRate) / rates[24]?.rate).toFixed(2)
                )
              )
            }}
          >
            USD
          </div>
          <div
            className="currency btn btn-dark"
            onClick={() => {
              setRightCC(rates[17]?.cc)
              setRightRate(rates[17]?.rate)
              setRightMoney(
                parseFloat(
                  ((leftMoney * leftRate) / rates[17]?.rate).toFixed(2)
                )
              )
            }}
          >
            RUB
          </div>
          {rates ? (
            <select
              className="form-select form-select-md mb-3"
              value={`${rightRate}/${rightcc}`}
              onChange={(e) => righthandleOptionChange(e)}
            >
              {rates.map((el, index) => (
                <option key={index} value={`${el.rate}/${el.cc}`}>
                  {el.txt} ({el.cc}) : {el.rate}
                </option>
              ))}
            </select>
          ) : (
            <div>Loading rates...</div>
          )}
        </div>
        <div className="bottom input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            {rightcc}
          </span>
          <input
            className="form-control"
            type="number"
            value={rightMoney}
            onChange={(e) => rightCalcCurrency(e)}
          ></input>
        </div>
      </div>
    </div>
  )
}

export default Exchange
