import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyFormComponent } from './components/currency-form/currency-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PopularCurrencyComponent } from './components/popular-currency/popular-currency.component';
import { CurrencyHistoryComponent } from './components/currency-history/currency-history.component';
import { NgChartsModule } from 'ng2-charts';
import { Store, StoreModule } from '@ngrx/store';
import { currencyReducer } from './store/currency.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CurrenciesEffects } from './store/currency.effects';
import { ExchangeLabelComponent } from './components/exchange-label/exchange-label.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CurrencyFormComponent,
    PopularCurrencyComponent,
    CurrencyHistoryComponent,
    ExchangeLabelComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    RouterModule,
    EffectsModule.forFeature([CurrenciesEffects]),
    StoreModule.forFeature('currency', currencyReducer)
  ],
  exports: [
    CurrencyFormComponent,
    PopularCurrencyComponent,
    CurrencyHistoryComponent,
  ]
})
export class CurrencyModule { }
