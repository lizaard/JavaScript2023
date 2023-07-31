import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './dropdown.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  declarations: [DropdownDirective],
  exports: [FormsModule, ReactiveFormsModule, HttpClientModule],
})
export class SharedModule {}
