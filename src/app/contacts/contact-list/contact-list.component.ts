import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
    private gridApi;
    private contactsSub: Subscription;
    enableGrouping: boolean = false;
    rowData: Contact[] = [];
    columnDefs = [];
    gridOptions = {
        defaultColDef: {
            flex: 1,
            minWidth: 100,
            sortable: true,
            resizable: true,
            filter: false
        },
        autoGroupColumnDef: {
            minWidth: 200
        },
        groupMultiAutoColumn: true,
        animateRows: true
    };

    constructor(public contactsService: ContactsService) { }

    ngOnInit() {
        this.contactsService.getContacts();
        this.contactsSub = this.contactsService.getContactsUpdateListener()
            .subscribe((contacts: Contact[]) => {
                this.rowData = contacts;
            });
        this.setColumnDefs();
    }

    ngOnDestroy() {
        this.contactsSub.unsubscribe();
    }

    onGridReady(params) {
        this.gridApi = params.api
    }

    onSearchContacts(search) {
        this.gridApi.setQuickFilter(search.target.value);
        this.gridApi.filter(false);
    }

    toggleGrouping() {
        this.enableGrouping = !this.enableGrouping;
        this.setColumnDefs();
    }

    setColumnDefs() {
        if (this.enableGrouping) {
            this.columnDefs = [
                { field: "firstName" },
                { field: "lastName" },
                { field: "occupation", rowGroup: true, hide: true },
                { field: "phoneNumber" },
                { field: "streetAddress" },
                { field: "city" },
                { field: "state", rowGroup: true, hide: true },
                { field: "zipCode" },
            ];
        } else {
            this.columnDefs = [
                { field: "firstName" },
                { field: "lastName" },
                { field: "occupation" },
                { field: "phoneNumber" },
                { field: "streetAddress" },
                { field: "city" },
                { field: "state" },
                { field: "zipCode" },
            ];
        }
    }
}
