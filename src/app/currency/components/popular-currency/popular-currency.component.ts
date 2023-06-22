import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CurrencyState } from '../../store/currency.state';
import { Store } from '@ngrx/store';
import { baseCurrencySelector, currenciesSelector, exchangeRateSelector } from '../../store/currency.selectors';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-popular-currency',
  templateUrl: './popular-currency.component.html',
  styleUrls: ['./popular-currency.component.scss']
})
export class PopularCurrencyComponent implements OnInit, OnDestroy {
  currienciesSubscriper: Subscription
  exchangeSubscriper: Subscription
  mergedCurrencies = [];
  baseCurrency$:Observable<any>;

  currencies = [];
  exchangeRates: any;
  constructor(private store: Store<CurrencyState>) { }
  ngOnDestroy(): void {
    this.currienciesSubscriper.unsubscribe();
    this.exchangeSubscriper.unsubscribe();
  }

  ngOnInit(): void {
    this.baseCurrency$ = this.store.select(baseCurrencySelector);
    this.currienciesSubscriper = this.store.select(currenciesSelector).subscribe((result) => {
      if (result) {
        this.currencies = result;
      }
    });

    this.exchangeSubscriper = this.store.select(exchangeRateSelector).subscribe((result) => {
      if (result && this.currencies) {
        let mergedCurrencies = [];
        mergedCurrencies = this.currencies.map(element => {
          let obj = { ...element.value, exchangeRate: result[element.currency] };
          return obj;
        });

        mergedCurrencies.forEach((element, index) => {
          if(this.mergedCurrencies.length<9 && element.exchangeRate != 1){
            this.mergedCurrencies.push(element);
          }
        });
        console.log(this.mergedCurrencies);
        
      }
    });

  }

}
