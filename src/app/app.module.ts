import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

import { MatListModule } from '@angular/material/list';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

import { ProductService } from './services/product.service';
import { LocalStorageService } from './services/local-storage.service';
import { productReducer } from './store/reducers/product.reducer';
import { CartEffects } from './store/effects/cart.effects';
import { ProductEffects } from './store/effects/product.effects';
import { cartReducer } from './store/reducers/cart.reducer';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CheckoutEffects } from './store/effects/checkout.effect';
import { checkoutReducer } from './store/reducers/checkout.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ products: productReducer, cart: cartReducer, checkout: checkoutReducer }),
    EffectsModule.forRoot([ProductEffects, CartEffects, CheckoutEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true }),
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    RouterModule
  ],
  providers: [ProductService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
