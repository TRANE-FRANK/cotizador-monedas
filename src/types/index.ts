import {
  CurrencySchema,
  CryptoCurrencyResponseSchema,
  PairShema,
  CryptoPriceSchema,
} from "../schema/crypto-schema"
import { z } from "zod"

export type Currency = z.infer<typeof CurrencySchema>
export type Cryptocurrency = z.infer<typeof CryptoCurrencyResponseSchema>
export type Pair = z.infer<typeof PairShema>
export type CryptoPrice = z.infer<typeof CryptoPriceSchema>

