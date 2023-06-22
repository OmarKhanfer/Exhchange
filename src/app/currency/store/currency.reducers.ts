import { Action, createReducer, on } from "@ngrx/store";
import { CurrencyState, currencyInitialState } from "./currency.state";
import * as currenciesActions from "./currency.actions";

const currencyReducers = createReducer(
  currencyInitialState,
  on(currenciesActions.REQUEST_LOAD_CURRENCIES, state => ({ ...state, loading: true })),
  on(currenciesActions.SUCCESS_LOAD_CURRENCIES, (state, resp) => ({ ...state, currencies: resp.currencies, loading: false })),
  on(currenciesActions.FAILURE_LOAD_CURRENCIES, (state, { error }) => ({ ...state, error: error, loading: false })),
  
  on(currenciesActions.REQUEST_LOAD_EXCHANGE_RATE, state => ({ ...state, loading: true })),
  on(currenciesActions.SUCCESS_LOAD_EXCHANGE_RATE, (state, resp) => ({ ...state, exchangeRate: resp.exchangeRate, loading: false })),
  on(currenciesActions.FAILURE_LOAD_EXCHANGE_RATE, (state, { error }) => ({ ...state, error: error, loading: false })),

  on(currenciesActions.SET_FROM_CURRENCY, (state, { baseCurrency }) => ({ ...state, baseCurrency: baseCurrency })),
  on(currenciesActions.SET_TO_CURRENCY, (state, { targetCurrencty }) => ({ ...state, targetCurrency: targetCurrencty })),
);

export function currencyReducer(state: CurrencyState | undefined, action: Action) {
  return currencyReducers(state, action);
}