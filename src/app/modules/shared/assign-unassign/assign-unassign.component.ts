import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface AssignUnassignItem {
  displayName: string;
}

const byDisplayName = (a: AssignUnassignItem, b: AssignUnassignItem) => 
  a.displayName.localeCompare(b.displayName);

export interface AssignUnassignAdapter<V, I extends AssignUnassignItem> {
  fromValue(value: V[]): [I[], I[]];
  toValue(assigned: I[]): V[]
}

@Component({
  selector: 'cmp-assign-unassign',
  templateUrl: './assign-unassign.component.html',
  styleUrls: ['./assign-unassign.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AssignUnassignComponent),
    multi: true
  }]
})
export class AssignUnassignComponent<V, I extends AssignUnassignItem> implements ControlValueAccessor {

  @Input()
  adapter!: AssignUnassignAdapter<V, I>;

  filter = new FormControl('');

  assigned: I[] = [];

  unassigned: I[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _onChange = (_: unknown) => { };

  private _onTouched = () => { };

  writeValue(obj: unknown): void {
    [this.assigned, this.unassigned] = this.adapter.fromValue(obj as V[]);
    this.assigned.sort(byDisplayName);
    this.unassigned.sort(byDisplayName);
  }

  registerOnChange(fn: (_: unknown) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  touched() {
    this._onTouched();
  }

  shown(item: AssignUnassignItem) {
    const tokens = (this.filter.value as string).toLowerCase().split(/\s+/);
    const ldn = item.displayName.toLowerCase();
    return tokens.every(token => ldn.indexOf(token) >= 0);
  }

  drop(event: CdkDragDrop<I[]>): void {
    if (event.previousContainer !== event.container) {
      const index = event.previousContainer.data.indexOf(event.item.data);
      if (index >= 0) {
        const [item] = event.previousContainer.data.splice(index, 1);
        event.container.data.push(item);
        event.container.data.sort(byDisplayName);
        this._onChange(this.adapter.toValue(this.assigned));
      }
    }
  }

}

