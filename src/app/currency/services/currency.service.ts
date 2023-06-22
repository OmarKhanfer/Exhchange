import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrencyApiConfig } from '../configs/currency.config';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient, public config: CurrencyApiConfig) { }


  getCurrenciesList() {
    return this.http.get(this.config.GET_CURRENCIES());
  }

  getExchangeRate(currency: string) {
    return this.http.get(this.config.GET_EXCHANGE_RATE(currency));
  }

  getHistory(date_from: string, date_to: string, base_currency: string) {
    return this.http.get(this.config.GET_HISTORY(date_from, date_to, base_currency));
  }
  
}
