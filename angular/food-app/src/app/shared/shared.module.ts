import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownDirective } from './dropdown.directive';


@NgModule({
  imports: [FormsModule],
  declarations: [
    DropdownDirective
  ],
  exports: [
    
  ],
})
export class SharedModule {}
