import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SET_FROM_CURRENCY, SET_TO_CURRENCY } from 'src/app/currency/store/currency.actions';
import { currenciesSelector } from 'src/app/currency/store/currency.selectors';
import { CurrencyState } from 'src/app/currency/store/currency.state';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
  baseCurrencyCode: string;
  targetCurrencyCode: string;
  allCurrencies: any[];
  constructor(private route: ActivatedRoute, private store: Store<CurrencyState>) {
    this.store.select(currenciesSelector).subscribe(currencies => {
      this.allCurrencies = currencies;

      this.route.params.subscribe(params => {
        if (this.allCurrencies.length === 0) return;
        this.baseCurrencyCode = this.getCurrencyDetails(params['base']);
        this.targetCurrencyCode = this.getCurrencyDetails(params['target']);
        this.store.dispatch(SET_FROM_CURRENCY({ baseCurrency: this.baseCurrencyCode }));
        this.store.dispatch(SET_TO_CURRENCY({ targetCurrencty: this.targetCurrencyCode }));
      });
    });


  }

  ngOnInit(): void {

  }

  getCurrencyDetails(currencyCode: string) {
    return this.allCurrencies.find(item => item.currency === currencyCode);
  }
}
