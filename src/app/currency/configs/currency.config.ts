import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiConfig {
  constructor() { }

  public readonly GET_CURRENCIES = () => `https://api.freecurrencyapi.com/v1/currencies?apikey=${environment.currencyKey}`;

  public readonly GET_EXCHANGE_RATE = (base: string) => `https://api.freecurrencyapi.com/v1/latest?apikey=${environment.currencyKey}&base_currency=${base}`;

  public readonly GET_HISTORY = (date_from,date_to,base_currency) => `https://api.freecurrencyapi.com/v1/historical?apikey=${environment.currencyKey}&date_from=${date_from}&date_to=${date_to}&base_currency=${base_currency}`

}