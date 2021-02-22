export class User {
    id: number;
    name: string;
    username: string;
    password: string;
    email: string;
    imagePath: string;
    createdAt: Date;
    cart: String[];
    token?: string; 
}
