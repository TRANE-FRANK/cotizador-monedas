import { create } from "zustand"
import { Cryptocurrency, CryptoPrice, Pair } from "./types"
import { devtools } from "zustand/middleware"
import { getCryptos, fetchCurrentCryptoPrice } from "./services/CryptoService"

type CryptoStore = {
  cryptocurrencies: Cryptocurrency[]
  result: CryptoPrice
  loading: boolean
  fetchCryptos: () => Promise<void>
  fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(
  devtools((set) => ({
    cryptocurrencies: [],
    result: {
      IMAGEURL: "",
      PRICE: "",
      HIGHDAY: "",
      LOWDAY: "",
      CHANGEPCT24HOUR: "",
      LASTUPDATE: "",
    },
    fetchCryptos: async () => {
      const cryptocurrencies = await getCryptos()
      set(() => ({
        cryptocurrencies,
      }))
    },

    loading: false,
    fetchData: async (pair) => {
      set(() => ({
        loading: true,
      }))

      const result = await fetchCurrentCryptoPrice(pair)
      set(() => ({
        result,
        loading: false,
      }))
    },
  }))
)
