import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Audit } from '@/_models';
import { AuditService, AuthenticationService } from '@/_services';


@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit
{
    audits = [];
    id :any;
    order: any;
  
  
        
    constructor(
        private authenticationService: AuthenticationService,
        private auditService: AuditService
    )
    {
    }

    ngOnInit()
    {
        this.loadAllAudits();
    }

    private loadAllAudits()
    {
        this.auditService.getAll()
            .pipe(first())
            .subscribe(audits => this.audits = audits);
    }
    Search(){
        if (this.id == "") {
            this.ngOnInit();
        } else {
            this.audits = this.audits.filter(res =>{
                return res.id.match(this.id);
            })
        }
    }
    key:string = 'id';
    reverse : boolean = false;
    sort (key) {
        this.key = key;
        this.reverse = !this.reverse;
    }
    sortuser() {
       if(this.order){
           let newarr = this.audits.sort((a: any, b: any) => a.audit.user - b.audit.user)
        this.audits  = newarr
       } else {
           let newarr = this.audits.sort((a: any, b: any) => b.audit.user - a.audit.user)
           this.audits = newarr
       }
       
    }
    sortid() {
        if (this.order) {
            let newarr = this.audits.sort((a: any, b: any) => a.audit._id - b.audit._id)
            this.audits = newarr
        } else {
            let newarr = this.audits.sort((a: any, b: any) => b.audit._id - a.audit._id)
            this.audits = newarr
        }
        this.order = !this.order
    }
  formatDate(date:Date){
       const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      return`$(date)-$(month)-$(year)`
  }
}