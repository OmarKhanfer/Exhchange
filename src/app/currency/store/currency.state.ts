export interface CurrencyState {
  currencies: any;
  baseCurrency: any;
  targetCurrency: any;
  loading: boolean,
  exchangeRate:any,
  history:any,
}

export const currencyInitialState: CurrencyState = {
  currencies: [],
  baseCurrency: null,
  targetCurrency: null,
  loading:false,
  exchangeRate:null,
  history:null,
}