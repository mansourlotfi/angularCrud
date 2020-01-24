import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
//import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
	title = 'angularCrud';
	constructor(private http: HttpClient) {}

	//get
	persons = [];

	fetchdata = function() {
		this.http.get('http://localhost:5555/persons').subscribe((res: Response) => {
			console.warn('fired', res);
			this.persons = res;
		});
	};

	//post
	personObj: object = {};
	confirmationString: string = 'new person added';
	isAdded: boolean = false;

	addNewPerson = function(person) {
		this.personObj = {
			fName: person.fName,
			lName: person.lName,
			phoneNumber: person.phoneNumber,
			adderss: person.adderss
		};
		this.http.post('http://localhost:5555/persons', this.personObj).subscribe((res: Response) => {
			this.isAdded = true;
			for (let i = 1; i < this.persons.length; i++) {
				this.persons.push({
					key: i,
					fName: res[i].fName,
					lName: res[i].lName,
					phoneNumber: res[i].phoneNumber,
					adderss: res[i].adderss
				});
			}
		});
	};

	//delete
	id: number;
	private header = new HttpHeaders({ 'Content-Type': 'application/json' });

	deletePerson = function(id) {
		if (confirm('Are you sure?')) {
			const url = `${'http://localhost:5555/persons'}/${id}`;
			return this.http.delete(url, { header: this.header }).toPromise().then(() => {
				this.fetchdata();
			});
		} else {
		}
	};

	//update
	data: object = {};
	edithPerson = function(id) {
		this.fetchdata();
		for (var i = 1; i < this.persons.length; i++) {
			if (parseInt(this.persons[i].id) === this.id) {
				this.data = this.persons[i];
				console.warn(this.data, 'this is dataaaaaaaa');
				break;
			}
		}

		console.warn(this.data, 'this is dataaaaaaaa');
		console.warn(id);
		console.warn(this.persons, 'onedith');
	};

	ngOnInit() {
		this.fetchdata();
		console.warn(this.persons, 'oninit');
	}
}
