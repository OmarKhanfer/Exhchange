import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyState } from '../../store/currency.state';
import { Store } from '@ngrx/store';
import { baseCurrencySelector, exchangeRateSelector, targetCurrencySelector } from '../../store/currency.selectors';

@Component({
  selector: 'app-exchange-label',
  templateUrl: './exchange-label.component.html',
  styleUrls: ['./exchange-label.component.scss']
})
export class ExchangeLabelComponent implements OnInit, OnDestroy {
  subscribtions: Subscription[] = [];
  baseCurrencySubscruption: Subscription;
  targetCurrencySubscruption: Subscription;
  exchangeRateSubscruption: Subscription;

  baseCurrency: any;
  targetCurrency: any;
  exchangeRateList: any;
  exchangeLabel: string = '';

  constructor(private store: Store<CurrencyState>) { }
  ngOnDestroy(): void {
    this.subscribtions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.baseCurrencySubscruption = this.store.select(baseCurrencySelector).subscribe((result) => {
      this.baseCurrency = result;
    });

    this.targetCurrencySubscruption = this.store.select(targetCurrencySelector).subscribe((result) => {
      this.targetCurrency = result;
      this.printLabel();
    });

    this.exchangeRateSubscruption = this.store.select(exchangeRateSelector).subscribe((result) => {
      if (result) {
        this.exchangeRateList = result;
        this.printLabel();
      }
    });

    this.subscribtions.push(this.baseCurrencySubscruption);
    this.subscribtions.push(this.targetCurrencySubscruption);
    this.subscribtions.push(this.exchangeRateSubscruption);
  }

  printLabel() {
    if (this.exchangeRateList && this.targetCurrency) {
      this.exchangeLabel = `1 ${this.baseCurrency.value.name} = ${this.exchangeRateList[this.targetCurrency.currency]} ${this.targetCurrency.value.name}`
    }
  }

}
