import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[cdkDetailRow]'
})
export class TableDetailRowDirective {
  private row: any;
  private tRef!: TemplateRef<any>;
  private opened!: boolean;

  @HostBinding('class.expanded')
  get expended(): boolean {
    return this.opened;
  }

  @Input() openAction;

  @Input()
  set cdkDetailRow(value: any) {
    if (value !== this.row) {
      this.row = value;
    }
  }

  @Input('cdkDetailRowTpl')
  set template(value: TemplateRef<any>) {
    if (value !== this.tRef) {
      this.tRef = value;
    }
  }
  @Output() toggleChange = new EventEmitter<TableDetailRowDirective>();

  constructor(public vcRef: ViewContainerRef) {}

  @HostListener('click', ['$event.target.className'])
  onClick(action): void {
    if (this.openAction === action) {
      this.toggle();
    }
  }

  toggle(): void {
    if (this.opened) {
      this.vcRef.clear();
    } else {
      this.render();
    }
    this.opened = this.vcRef.length > 0;
    this.toggleChange.emit(this);
  }

  private render(): void {
    this.vcRef.clear();
    if (this.tRef && this.row) {
      this.vcRef.createEmbeddedView(this.tRef, { $implicit: this.row });
    }
  }
}
