/// <reference types="vite/client" />
type ImportMetaEnv = {
  readonly VITE_NASDAQ_API_KEY: string
}

type ImportMeta = {
  readonly env: ImportMetaEnv
}
