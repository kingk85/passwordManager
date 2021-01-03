export class PasswordManagerCategoriesEntry {
    id:number;
    description:string;
    category:string;
    password:string;
    username:string;
    other:string;
    note:string;
    user_id:number;

    constructor()
    {
        this.id = 0;
        this.description = '';
        this.category = '';
        this.password = '';
        this.username = '';
        this.other = '';
        this.note = '';
        this.user_id = 0;
    }
}

export class PasswordManagerCategories {
    id:number;
    name:string;
    entries:Array<PasswordManagerCategoriesEntry>;
}