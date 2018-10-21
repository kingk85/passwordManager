export class LoginDataType {
    id:number;
    username:string;
    password:string;
    userIsLogged: boolean;

    constructor()
    {
        this.id = 0;
        this.username = '';
        this.password = '';
        this.userIsLogged = false;
    }
}

export class UserDataType {
    id = 0;
    username = '';
    password = '';
    email = '';
}