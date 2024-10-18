import { ChangeEvent, useState } from "react"
import { currencies } from "../data"
import { useCryptoStore } from "../store"
import { Pair } from "../types"
import ErrorMessage from "./ErrorMessage"

export default function CriptoSearchForm() {
  const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies)
  const fetchData = useCryptoStore((state) => state.fetchData)

  
  const [pair, setPair] = useState<Pair>({
    currency: "",
    criptocurrency: "",
  })

  const [error, setError] = useState("")

  const handleChage = (e: ChangeEvent<HTMLSelectElement>) => {
    setPair({
      ...pair,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Object.values(pair).includes("")) {
      setError("Todos los campos son obligatorios")
      return
    }
    setError("")
    fetchData(pair)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="field">
        <label htmlFor="currency">Moneda:</label>
        <select
          name="currency"
          id="currency"
          onChange={handleChage}
          value={pair.currency}
        >
          <option value="">-- Seleccione Moneda --</option>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="criptocurrency">Criptomoneda:</label>
        <select
          name="criptocurrency"
          id="criptocurrency"
          value={pair.criptocurrency}
          onChange={handleChage}
        >
          <option value="">-- Seleccione Criptomoneda --</option>
          {cryptocurrencies.map((crypto) => (
            <option key={crypto.CoinInfo.FullName} value={crypto.CoinInfo.Name}>
              {crypto.CoinInfo.Name}
            </option>
          ))}
        </select>
      </div>
      <input type="submit" value="Cotizar" />
    </form>
  )
}
