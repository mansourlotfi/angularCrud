import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
	title = 'angularCrud';
	constructor(private http: HttpClient) {}

	persons = [];

	fetchdata = function() {
		this.http.get('http://localhost:5555/persons').subscribe((res: Response) => {
			console.warn('fired', res);
			this.persons = res;
		});
	};

	//add
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
			console.warn('post fired', res);
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

	ngOnInit() {
		this.fetchdata();
		console.warn(this.persons, 'asd');
	}
}
