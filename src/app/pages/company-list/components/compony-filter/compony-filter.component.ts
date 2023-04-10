import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Company } from 'src/app/services/company/company.entity';
import { SelectItem } from 'src/app/utils/SelectHelper';

export type FormValues = {
  business_name: string;
  industry: Company['industry'] | null;
  type: Company['type'] | null;
};

@Component({
  selector: 'app-compony-filter',
  templateUrl: './compony-filter.component.html',
  styleUrls: ['./compony-filter.component.scss'],
})
export class ComponyFilterComponent {
  @Input() change?: (values: FormValues) => void;
  @Input() types: SelectItem<Company['industry']>[] = [];
  @Input() industries: SelectItem<Company['industry']>[] = [];

  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
      business_name: [''],
      industry: [null],
      type: [null],
    });

    this.myForm.valueChanges.subscribe(this.submit);
  }

  submit = this._submit.bind(this);
  private _submit(values: FormValues) {
    this.change && this.change(values);
  }
}
