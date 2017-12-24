import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DataTableResource } from 'angular-4-data-table-bootstrap-4';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Angular 4 CRUD Example Using Bootstrap Datatable';
  userForm: FormGroup;
  @ViewChild('modalClose') modalClose:ElementRef;
  //Static data, you can change as per your need
  persons: any[] = [
	    {"id": "1", "name": "Aaron 2Moore", "jobTitle": "Regional Configuration Producer"},
	    { "id": "2","name": "Yvonne Conroy Mrs.", "jobTitle": "Global Mobility Orchestrator" },
	    { "id": "3","name": "Laron Padberg", "jobTitle": "Senior Directives Supervisor" },
	    { "id": "4","name": "Dr. Maryam Spinka", "jobTitle": "Dynamic Mobility Associate"},
	    { "id": "5","name": "Kiley Baumbach", "jobTitle": "Principal Metrics Orchestrator"},
	    { "id": "6","name": "Hollis MacGyver", "jobTitle": "Direct Markets Assistant"},
	    { "id": "7","name": "Axel McLaughlin", "jobTitle": "Forward Mobility Architect" },
	    { "id": "8","name": "Ricardo Botsford", "jobTitle": "Direct Quality Consultant"},
	    { "id": "10","name": "Corbin Funk Mrs.", "jobTitle": "Human Configuration Manager"},
	    { "id": "11","name": "Rosalind Paucek", "jobTitle": "Future Creative Supervisor"},
	    { "id": "12","name": "Henderson Moore", "jobTitle": "Internal Accountability Director"},
	    { "id": "13","name": "Kelli Schoen", "jobTitle": "National Accountability Architect" },
	    { "id": "14","name": "Kenna Fritsch", "jobTitle": "Legacy Response Administrator"},
	    { "id": "15","name": "Judge Marquardt", "jobTitle": "Human Program Specialist"},
	    { "id": "16","name": "Kurtis Hane", "jobTitle": "International Optimization Director" },
	    { "id": "17","name": "Nicolette Lind", "jobTitle": "Legacy Marketing Facilitator"},
	    { "id": "18","name": "Idella Green", "jobTitle": "Dynamic Division Orchestrator" },
	    { "id": "19","name": "Mackenzie Bartell", "jobTitle": "National Directives Associate" },
	    { "id": "20","name": "Mose Kohler", "jobTitle": "Lead Implementation Executive"},
	    { "id": "21","name": "Cielo Kuphal", "jobTitle": "Dynamic Division Analyst" },
	    { "id": "22","name": "Haleigh Stokes", "jobTitle": "Global Intranet Executive" },
	    { "id": "23","name": "Tyrese Walter", "jobTitle": "Senior Web Liason" },
	    { "id": "24","name": "Barney Shields", "jobTitle": "District Web Administrator"},
	    { "id": "25","name": "Favian Abbott Miss", "jobTitle": "Lead Implementation Facilitator" },
	    { "id": "26","name": "Carissa Kunze", "jobTitle": "Regional Division Technician"}
	];
	itemResource = new DataTableResource(this.persons);
	items = [];
	itemCount = 0;
	params = {offset: 0, limit: 10}; //Static can be changed as per your need
	formFlag = 'add';

    constructor(){
      this.itemResource.count().then(count => this.itemCount = count);
      this.reloadItems(this.params);
    }  

    reloadItems(params) {
      this.itemResource.query(params).then(items => this.items = items);
    }

    // special properties:
    rowClick(rowEvent) {
        console.log('Clicked: ' + rowEvent.row.item.name);
    }

    rowDoubleClick(rowEvent) {
        alert('Double clicked: ' + rowEvent.row.item.name);
    }

	rowTooltip(item) { return item.jobTitle; }

	//Init method
	ngOnInit(){
		this.userForm = new FormGroup({
		  'id': new FormControl(null),
		  'name': new FormControl(null, Validators.required),
		  'jobTitle': new FormControl(null, Validators.required)
		});
	}

	initUser(){
		//User form reset
		this.userForm.reset();
		this.formFlag = 'add';
	}
	//Save user's data
	saveUser(){
		if(this.formFlag == 'add')
		{
			this.userForm.value.id= this.persons.length + 1;
			this.persons.unshift(this.userForm.value);
		}
		else
		{
			var index = this.persons.findIndex(x => x.id== this.userForm.value.id);
			if (index !== -1) {
			  this.persons[index] = this.userForm.value;
			}
		}
		this.reloadTableManually();
		//Close modal
		this.modalClose.nativeElement.click();
		//User form reset
		this.userForm.reset();
	}
	//Get data while edit
	getData(item)
	{
		this.userForm.patchValue(item);
		this.formFlag = 'edit';
	}
	//Delete user's data
	delData(item){
		this.persons.splice(this.persons.indexOf(item), 1);
		this.reloadTableManually();
	}
	//Reload table manually after add/edit
	reloadTableManually(){
		this.reloadItems(this.params);
		this.itemResource.count().then(count => this.itemCount = count);
	}
}
