import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyState } from '../../store/currency.state';
import { Store } from '@ngrx/store';
import * as currencyActions from '../../store/currency.actions';
import { baseCurrencySelector, currenciesSelector, exchangeRateSelector, targetCurrencySelector } from '../../store/currency.selectors';
import { Observable, Subscription, map, switchMap, tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent implements OnInit, OnDestroy {
  subscribtions: Subscription[] = [];
  baseCurrencySubscription: Subscription;
  targetCurrencySubscription: Subscription;
  exchangeRateSubscription: Subscription;

  currneciesList$: Observable<any[]>;

  baseCurrency: any;
  targetCurrency: any;
  ratesCollections: any;
  amount: number = 0;
  exchangeResult = 0;
  exchangeRate = 0;

  constructor(private store: Store<CurrencyState>) { }


  ngOnDestroy(): void {
    this.subscribtions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.currneciesList$ = this.store.select(currenciesSelector).pipe(map(result => result));

    this.baseCurrencySubscription = this.store.select(baseCurrencySelector).subscribe((result) => { if (result) { this.baseCurrency = result; } });
    this.targetCurrencySubscription = this.store.select(targetCurrencySelector).subscribe((result) => { if (result) { this.targetCurrency = result; } });
    this.exchangeRateSubscription = this.store.select(exchangeRateSelector).subscribe((result) => this.ratesCollections = result);

    this.subscribtions.push(this.baseCurrencySubscription);
    this.subscribtions.push(this.targetCurrencySubscription);
  }

  /**
   * 
   * @param currency this function to select the base currency
   */
  selectCurrency(currency: any) {
    this.store.dispatch(currencyActions.SET_FROM_CURRENCY({ baseCurrency: currency }));
  }

  /**
   * 
   * @param currency this function to select the target currency
   */
  selectTo(currency: any) {
    this.store.dispatch(currencyActions.SET_TO_CURRENCY({ targetCurrencty: currency }));
  }

  /**
   * this function to switch the base currency with the target currency
   */
  switchCurrency() {
    const tempBase = { ...this.baseCurrency };
    const tempTarget = { ...this.targetCurrency };
    this.store.dispatch(currencyActions.SET_FROM_CURRENCY({ baseCurrency: tempTarget }));
    this.store.dispatch(currencyActions.SET_TO_CURRENCY({ targetCurrencty: tempBase }));
  }


  convertCurrency() {
    const rate = this.ratesCollections[this.targetCurrency.currency];
    this.exchangeResult = this.amount * rate;
  }

}
