import { createAction, props } from '@ngrx/store';

export const REQUEST_LOAD_CURRENCIES = createAction('[CURRENCY] Load Currencies');
export const SUCCESS_LOAD_CURRENCIES = createAction('[CURRENCY] Load Currencies Success',props<{currencies}>());
export const FAILURE_LOAD_CURRENCIES = createAction('[CURRENCY] Load Currencies Failure',props<{error: any}>());

export const REQUEST_LOAD_EXCHANGE_RATE = createAction('[CURRENCY] Load Exchange Rate',props<{currency: string}>());
export const SUCCESS_LOAD_EXCHANGE_RATE = createAction('[CURRENCY] Load Exchange Rate Success',props<{exchangeRate: any}>());
export const FAILURE_LOAD_EXCHANGE_RATE = createAction('[CURRENCY] Load Exchange Rate Failure',props<{error: any}>());


export const SET_FROM_CURRENCY = createAction('[CURRENCY] Set From Currency',props<{baseCurrency: any}>());
export const SET_TO_CURRENCY = createAction('[CURRENCY] Set To Currency',props<{targetCurrencty: any}>());

