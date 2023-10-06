import React, { useState } from "react"
import "./app.scss"

function App() {
  const [withSmallLetters, setWithSmallLetters] = useState(true)
  const [withBigLetters, setWithBigLetters] = useState(false)
  const [withSpecialSymbols, setWithSpecialSymbols] = useState(false)
  const [withNumbers, setWithNumbers] = useState(false)
  const [passwordLength, setPasswordLength] = useState(12)
  const [password, setPassword] = useState("")

  const generatePassword = (length: number) => {
    let charset = ""
    if (withSmallLetters) {
      charset += "abcdefghijklmnopqrstuvwxyz"
    }
    if (withNumbers) {
      charset += "1234567890"
    }
    if (withBigLetters) {
      charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    if (withSpecialSymbols) {
      charset += "!#$%&()*+,-./:;<=>?@[\\]^_`{|}~"
    }
    let generatedPassword = ""
    for (let i = 0; i < length; i++) {
      generatedPassword += charset.charAt(
        Math.floor(Math.random() * charset.length)
      )
    }
    setPassword(generatedPassword)
  }

  const passwordLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(Number(e.target.value))
    generatePassword(Number(e.target.value))
  }

  return (
    <div className="window">
      <h1>Генератор паролей</h1>
      <div className="length">
        <label>Длина пароля: {passwordLength}</label>
        <input
          type="range"
          min={4}
          max={30}
          value={passwordLength}
          onChange={(e) => passwordLengthChange(e)}
        />
      </div>
      <div className="select">
        <label>
          <input
            type="checkbox"
            checked={withSmallLetters}
            onChange={() => setWithSmallLetters(!withSmallLetters)}
          />
          <span>маленькие буквы</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={withNumbers}
            onChange={() => setWithNumbers(!withNumbers)}
          />
          <span>цифры</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={withBigLetters}
            onChange={() => setWithBigLetters(!withBigLetters)}
          />
          <span>большие буквы</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={withSpecialSymbols}
            onChange={() => setWithSpecialSymbols(!withSpecialSymbols)}
          />
          <span>специальные символы</span>
        </label>
      </div>
      {withSmallLetters ||
        withBigLetters ||
        withNumbers ||
        withSpecialSymbols || <p className="error">Не выбран не один пункт</p>}
      <button onClick={() => generatePassword(passwordLength)}>
        Сгенерировать пароль
      </button>
      <input
        className="password"
        type="text"
        placeholder="Пароль"
        disabled
        value={password}
      />
    </div>
  )
}

export default App
