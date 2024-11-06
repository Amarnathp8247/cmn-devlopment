import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeListRoutingModule } from './tree-list-routing.module';
import { TreeListComponent } from './tree-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from '@ngx-maintenance/ng2-search-filter';


@NgModule({
  declarations: [
    TreeListComponent
  ],
  imports: [
    CommonModule,
    TreeListRoutingModule,
    MatPaginatorModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class TreeListModule { }
