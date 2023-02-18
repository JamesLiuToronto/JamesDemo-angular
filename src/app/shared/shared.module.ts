import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { PopupWindowComponent } from './components/popup-window/popup-window.component';

@NgModule({
  declarations: [ ClickOutsideDirective, PopupWindowComponent],
  imports: [CommonModule],
  exports: [ClickOutsideDirective, PopupWindowComponent, ],
})
export class SharedModule {}
