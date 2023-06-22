import { Component } from '@angular/core';
import { CurrencyState } from './currency/store/currency.state';
import { Store } from '@ngrx/store';
import * as currencyActions from './currency/store/currency.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'exchange';

  constructor(private store: Store<CurrencyState>) { 
    this.store.dispatch(currencyActions.REQUEST_LOAD_CURRENCIES());
  }



}
