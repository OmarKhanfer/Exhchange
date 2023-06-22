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
}
