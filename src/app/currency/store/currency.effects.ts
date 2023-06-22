import { Actions, Effect, createEffect, ofType } from "@ngrx/effects";
import { CurrencyService } from "../services/currency.service";
import { FAILURE_LOAD_CURRENCIES, FAILURE_LOAD_EXCHANGE_RATE, REQUEST_LOAD_CURRENCIES, REQUEST_LOAD_EXCHANGE_RATE, SET_FROM_CURRENCY, SUCCESS_LOAD_CURRENCIES, SUCCESS_LOAD_EXCHANGE_RATE } from "./currency.actions";
import { EMPTY, catchError, map, of, switchMap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CurrenciesEffects {
  constructor(private actions$: Actions, private currencyService: CurrencyService) { }

  loadCurrencies$ = createEffect(() => this.actions$.pipe(
    ofType(REQUEST_LOAD_CURRENCIES),
    switchMap(() => this.currencyService.getCurrenciesList()
      .pipe(
        map((resp: any) => {
          const obj = Object.keys(resp.data).map((key) => { return { currency: key, value: resp.data[key] } });
          return SUCCESS_LOAD_CURRENCIES({ currencies: obj });
        }),
        catchError(error => of(FAILURE_LOAD_CURRENCIES(error)))
      )
    )
  ));

  setExchangeRate$ = createEffect(() => this.actions$.pipe(
    ofType(SET_FROM_CURRENCY),
    switchMap((req) => this.currencyService.getExchangeRate(req.baseCurrency.currency).pipe(
      map((resp: any) => {
        return SUCCESS_LOAD_EXCHANGE_RATE({ exchangeRate: resp.data });
      }
      ),
      catchError(error => of(FAILURE_LOAD_EXCHANGE_RATE(error)))
    ))
  ));
}

