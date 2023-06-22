import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import * as moment from 'moment';
import { CurrencyState } from '../../store/currency.state';
import { Store } from '@ngrx/store';
import { baseCurrencySelector, currencyHistorySelector, targetCurrencySelector } from '../../store/currency.selectors';
import { REQUEST_CURRENCY_HISTORY } from '../../store/currency.actions';
@Component({
  selector: 'app-currency-history',
  templateUrl: './currency-history.component.html',
  styleUrls: ['./currency-history.component.scss']
})
export class CurrencyHistoryComponent implements OnInit {
  fromDate = moment().subtract(16, "M").format('YYYY-MM-DD');
  toDate = moment(this.fromDate).add(1, 'y').format('YYYY-MM-DD');
  @Input() baseCurrency: string;
  @Input() targetCurrency: string;

  history: any;
  MonthsLabels = [];
  public lineChartData: ChartConfiguration<'line'>['data'];
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;
  constructor(private store: Store<CurrencyState>) { }

  ngOnInit(): void {
    this.store.select(baseCurrencySelector).subscribe(baseCurrency => {
      if (!baseCurrency) return;
      this.baseCurrency = baseCurrency.currency;
      this.loadHistory();
    });

    this.store.select(targetCurrencySelector).subscribe(targetCurrency => {
      if (!targetCurrency) return;
      this.targetCurrency = targetCurrency.currency;
    });

    this.store.select(currencyHistorySelector).subscribe(history => {
      this.history = history;
      if (history) {
        this.extractMonths(history);
        console.log(this.takeDataLastDayfromMonthFromtheList(history));
        
        this.drawChart(this.MonthsLabels, this.takeDataLastDayfromMonthFromtheList(history));

      }
      // this.lineChartData.datasets[0].data = Object.values(history.rates);
      // this.lineChartData.labels = Object.keys(history.rates);
    });
  }

  loadHistory() {
    this.store.dispatch(REQUEST_CURRENCY_HISTORY({ date_from: this.fromDate, date_to: this.toDate, base_currency: this.baseCurrency }))
  }

  extractMonths(history) {
    const months = Object.keys(history).map(key => {
      return moment(key).format('MMMM');
    });
    this.takeDataLastDayfromMonthFromtheList(history);
    this.MonthsLabels = Array.from(new Set(months));
    // return Array.from(new Set(months));
  }

  extractRates(history) {
    const rates = [];
    Object.keys(history).forEach(key => {
      const tgrcurrency = history[key][this.targetCurrency['currency']];
      // debugger;
      // console.log({ [key]: tgrcurrency });
      rates.push({ [key]: tgrcurrency })
    });

    return rates;
    // const rates = Object.values(history).map(key => {
    //   return key;
    // });
    // console.log(Array.from(new Set(rates)));
    // return Array.from(new Set(rates));
  }

  takeDataLastDayfromMonthFromtheList(history) {
    const months = this.MonthsLabels;
    const data = this.extractRates(history);
    const dataLastDayfromMonth = [];

    months.map(month => {
      const dataLastDay = data.filter(item => {
        let day;
        if (item) {
          day = moment(Object.keys(item)[0]).format('MMMM') === month;
        }
        return day;
      });
      dataLastDayfromMonth.push(dataLastDay[dataLastDay.length - 1]);
    });


    return dataLastDayfromMonth.map(item => {
      return Object.values(item)[0];
    });
  }
  drawChart(months, data) {
    debugger;
    this.lineChartData = {
      labels: months,
      datasets: [
        {
          data: data,
          label: 'Series A',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)'
        }
      ]
    };
  }


}
