import { Component, OnInit } from '@angular/core';
import *  as currencyActions from '../../currency/store/currency.actions';

import { CurrencyState } from 'src/app/currency/store/currency.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private store: Store<CurrencyState>) { }

  ngOnInit(): void {
    this.store.dispatch(currencyActions.REQUEST_LOAD_CURRENCIES());
  }

}
