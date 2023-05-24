import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssignUnassignAdapter } from './modules/shared/assign-unassign/assign-unassign.component';
import { identity} from 'lodash';

interface CampaignDefinitionDragable {
  assigned: boolean;
  displayName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  form: FormGroup;
  campAdapter: AssignUnassignAdapter<CampaignDefinitionDragable, CampaignDefinitionDragable>;
  chosenCampaign = new FormControl([
    {displayName: 'n2', assigned: false},
    {displayName: 'n3', assigned: false},
    {displayName: 'n4', assigned: false},
    {displayName: 'n5', assigned: false},
  ]);

  constructor(){
    this.form = new FormGroup({
      name: new FormControl('',[Validators.required])
    })

    this.campAdapter = {
      // mapping all assigned to true in unassigned to correctly filter values both when something was changed and all assigned should be considered
      // and when nothing changes and form control value is still the initial one
      fromValue: values => [values.filter(v => v.assigned), values.filter(v => !v.assigned).map(v => ({...v, assigned: true}))],
      toValue: identity,
    };
  }
}
