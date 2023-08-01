import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './dropdown.directive';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  declarations: [DropdownDirective, SpinnerComponent],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SpinnerComponent,
  ],
})
export class SharedModule {}
