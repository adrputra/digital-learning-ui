/* eslint-disable @typescript-eslint/no-unused-vars */
interface User {
    username: string;
    email: string;
    fullname: string;
    shortname: string;
    role_id: string;
    institution_id: string;
    created_at: string;
}

interface RequestNewUser {
    username: string;
    email: string;
    fullname: string;
    shortname: string;
    password: string;
    confirmPassword: string;
    role_id: string;
    institution_id: string;
}