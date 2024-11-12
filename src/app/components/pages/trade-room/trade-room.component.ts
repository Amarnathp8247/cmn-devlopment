import { Component } from '@angular/core';

@Component({
  selector: 'app-trade-room',
  templateUrl: './trade-room.component.html',
  styleUrls: ['./trade-room.component.scss']
})
export class TradeRoomComponent {

  ngAfterViewInit(): void {
    this.loadTradingViewScript();
  }

  loadTradingViewScript(): void {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: 'XAUUSD',
      interval: '3',
      timezone: 'Etc/UTC',
      theme: 'light',
      style: '1',
      locale: 'en',
      allow_symbol_change: false,
      calendar: false,
      support_host: 'https://www.tradingview.com'
    });
    document.querySelector('.tradingview-widget-container__widget')?.appendChild(script);
  }


}
