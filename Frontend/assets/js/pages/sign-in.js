const { createApp } = Vue;
const app = createApp({
	data() {
		return {
			registerActive: false,
			username: '',
			password: '',
			confirmReg: '',
			emptyFields: false,
			reemail: '',
			repassword: '',
			isUserNameValidMsg: '',
			isPasswordValidMsg: '',
			isUserNameValidCls: '',
			isPasswordValidCls: ''
		};
	},
	methods: {
		checklogger() {
			axios
				.get(`${window.location.origin}/auth/login`, {
					withCredentials: true,
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Content-Type': 'application/json'
					},
					method: 'GET'
				})
				.then((response) => {
					console.log(response)
					if (response.data.islogged) {
						this.UserId = response.data.UserId;
						this.UserRole = response.data.UserRole;
						this.UserName = response.data.UserName;
						this.Userlast = response.data.Userlast;
						// window.location.href = '/';
					}
				})
				.catch((error) => {
					console.error(error);
				});
			axios
				.get(`${window.location.origin}/login`, {
					withCredentials: true,
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Content-Type': 'application/json'
					},
					method: 'GET'
				})
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.error(error);
				});
		},
		doLogin() {
			console.log('doLogin');
			var username = this.username;
			var password = this.password;
			var isUserNameValid = isUserNameValidFunc(username);
			if (isUserNameValid === true) {
				this.isUserNameValidMsg = '';
				this.isUserNameValidCls = 'border-color-green';
				var isPasswordValid = isPasswordValidFunc(password);
				if (isPasswordValid === true) {
					this.isPasswordValidMsg = '';
					this.isPasswordValidCls = 'border-color-green';
					username = encrypt(username);
					password = encrypt(password);
					axios
						.post(
							`${window.location.origin}/auth/login`,
							{
								username: username,
								password: password
							},
							{
								withCredentials: true,
								credentials: 'include',
								headers: {
									'Access-Control-Allow-Origin': '*',
									'Content-Type': 'application/json'
								}
							}
						)
						.then((response) => {
							if (response.data.islogged) {
								this.UserId = response.data.UserId;
								this.UserRole = response.data.UserRole;
								this.UserName = response.data.UserName;
								this.Userlast = response.data.Userlast;
								window.location.href = '/';
							} else {
								console.log(response.data.msg);
								notif('error', 'Server', response.data.msg, false);
							}
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					this.isPasswordValidMsg = isPasswordValid;
					this.isPasswordValidCls = 'border-color-red';
				}
			} else {
				this.isUserNameValidMsg = isUserNameValid;
				this.isUserNameValidCls = 'border-color-red';
				this.emptyFields = true;
			}
		},
		show_hide_password() {
			var input = document.getElementById('password-input');
			var eIcon = document.querySelector('.password-control');
			if (input.getAttribute('type') == 'password') {
				eIcon.classList.add('view');
				input.setAttribute('type', 'text');
			} else {
				eIcon.classList.remove('view');
				input.setAttribute('type', 'password');
			}
			return false;
		}
	}
});
var vm = app.mount('.app');
vm.checklogger();

// check input
const isUserNameValidFunc = (username) => {
	let re = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
	var resule;
	if (username != '') {
		if (re.test(username)) {
			if (username.length >= 5) {
				if (username.length <= 20) {
					resule = true;
				} else {
					resule = 'Username is too long';
					notif('warning', 'Loging Info', 'Username is too long', true);
				}
			} else {
				resule = 'username is not too long';
				notif('warning', 'Loging Info', 'username is not too long', true);
			}
		} else {
			resule = 'Username is not valid';
			notif('warning', 'Loging Info', 'Username is not valid', true);
		}
	} else {
		resule = 'username is empty';
		notif('warning', 'Loging Info', 'username is empty', true);
	}
	return resule;
};

// isPasswordValid
const isPasswordValidFunc = (password) => {
	var resule;
	if (password != '') {
		if (password.length >= 8) {
			if (password.length <= 50) {
				resule = true;
			} else {
				resule = 'Password is too long';
				notif('warning', 'Loging Info', 'Password is too long', true);
			}
		} else {
			resule = 'Password is not too long';
			notif('warning', 'Loging Info', 'Password is not too long', true);
		}
	} else {
		resule = 'Password is empty';
		notif('warning', 'Loging Info', 'Password is empty', true);
	}
	return resule;
};
