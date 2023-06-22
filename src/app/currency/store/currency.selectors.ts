import { createSelector } from "@ngrx/store";
import { CurrencyState } from "./currency.state";


export const selectCurrency = (state: any) => state.currency;

export const currenciesSelector = createSelector(
  selectCurrency,
  (state: CurrencyState) => state.currencies
);

export const targetCurrencySelector = createSelector(
  selectCurrency,
  (state: CurrencyState) => state.targetCurrency
);

export const baseCurrencySelector = createSelector(
  selectCurrency,
  (state: CurrencyState) => state.baseCurrency
);

export const exchangeRateSelector = createSelector(
  selectCurrency,
  (state: CurrencyState) => state.exchangeRate
);