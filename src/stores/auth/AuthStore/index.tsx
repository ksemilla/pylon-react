import { observable, action, makeObservable } from 'mobx'

type UserValues = {
	access?: string;
	id?: number;
	email?: string;
	name?: string;
	first_name?: string;
	last_name?: string;
}

export class AuthStore {
	@observable isLogged: boolean = false
	@observable user: UserValues = {}

	constructor() {
		makeObservable(
			this,
			{
				isLogged: observable
			}
		)
	}

	@action
	login = (data: UserValues) => {
		this.user = data
		this.isLogged = true
		// localStorage.setItem('access', data.access)
	}

	@action
	logout = () => {
		this.isLogged = false
		this.user = {}
	}
}