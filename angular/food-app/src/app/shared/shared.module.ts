import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule],
  declarations: [DropdownDirective],
  exports: [FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
