export class Accaount {
    public id: string;
    public username: string;
    public firstname: string;
    public lastname: string;
    public role: string;
    public avatar: string;

    public static compare(a: Accaount, b: Account): number {
        // tslint:disable-next-line:no-unused-expression
        a.id < b.id ? -1 : 1;
        return 0;
    }
    
    public compareTo(account: Accaount): boolean {
        return this.id === account.id;
    }
    
    public deserialize(datas: any): Accaount {
        Object.assign(this, datas);
        return this;
    }
}

