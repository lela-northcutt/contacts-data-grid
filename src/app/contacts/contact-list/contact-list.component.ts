import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';

import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit, OnDestroy {
    @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;

    // title = 'data-grid';
    columnDefs = [
        { headerName: "First Name", field: "firstName", sortable: true, filter: true },
        { headerName: "Last Name", field: "lastName", sortable: true, filter: true },
        { headerName: "Job Title", field: "jobTitle", sortable: true, filter: true },
        { headerName: "Phone Number", field: "phoneNumber", sortable: true, filter: true },
        { headerName: "Street Address", field: "streetAddress", sortable: true, filter: true },
        { headerName: "City", field: "city", sortable: true, filter: true },
        { headerName: "State", field: "state", sortable: true, filter: true },
        { headerName: "Zip Code", field: "zipCode", sortable: true, filter: true },
    ];

    rowData: Contact[] = [];
    private contactsSub: Subscription;

    // autoGroupColumnDef = {
    //     headerName: 'Job Title',
    //     field: 'jobTitle',
    //     cellRenderer: 'agGroupCellRenderer',
    //     cellRendererParams: {
    //         checkbox: true
    //     }
    // }

    // rowData = [
    //     { firstName: 'Lela', lastName: 'Northcutt', jobTitle: 'softeware dev', phoneNumber: '(404) 358-8062', streetAddress: 'rankin oaks', city: 'charlotte', state: 'NC', zipCode: '28213' },
    //     { firstName: 'Marshall', lastName: 'Northcutt', jobTitle: 'author', phoneNumber: '(704) 123-1234', streetAddress: 'rankin oaks', city: 'charlotte', state: 'NC', zipCode: '28213' },
    //     { firstName: 'Ella', lastName: 'Boroday', jobTitle: 'mom', phoneNumber: '(404) 345-2345', streetAddress: 'stream cut dr', city: 'lyman', state: 'SC', zipCode: '12345' },
    //     { firstName: 'Stephan', lastName: 'Boroday', jobTitle: 'builder', phoneNumber: '(404) 567-1234', streetAddress: 'stream cut dr', city: 'lyman', state: 'SC', zipCode: '12345' },
    //     { firstName: 'Dennis', lastName: 'Krasnyanskiy', jobTitle: 'builder', phoneNumber: '(404) 678-3456', streetAddress: 'somewhere', city: 'everywhere', state: 'NC', zipCode: '28213' },

    // ];

    constructor(public contactsService: ContactsService) { }

    ngOnInit() {
        this.rowData = this.contactsService.getContacts();
        this.contactsSub = this.contactsService.getContactsUpdateListener()
            .subscribe((contacts: Contact[]) => {
                this.rowData = contacts;
            });
    }

    ngOnDestroy() {
        this.contactsSub.unsubscribe();
    }

    getSelectedRows() {
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        const selectedDataStringPresentation = selectedData
            .map(node => node.firstName + " " + node.lastName)
            .join(", ");
        alert(`Selected Nodes: ${selectedDataStringPresentation}`);
    }
}
