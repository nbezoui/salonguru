import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import * as CheckoutActions from 'src/app/store/actions/checkout.actions';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  totalAmount$: Observable<any>;
  checkoutError$: Observable<any>;
  items$: Observable<any>;

  constructor(private store: Store<AppState>, private readonly router: Router) {
    this.totalAmount$ = this.store.select(state => state?.checkout?.totalAmount);
    this.items$ = this.store.select(state => state?.checkout?.items);
    this.checkoutError$ = this.store.select(state => state?.checkout?.checkoutError);
  }

  back(){
    this.router.navigate([""]);

  }
}
