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