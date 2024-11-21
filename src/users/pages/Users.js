import React from "react";
import "./Users.css";
import UsersList from "../components/UsersList";

const Users = () => {
    const USERS = [
        {
            "id" : "user1",
            "name" : "Sample Name",
            "email" : "example@my.com",
            "phone" : '123-456-7890',
            "address" : "123 Fake St.",
            "image" : "https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg",
            "listingCount" : 1
        }
    ]
    return <UsersList items={USERS}/>;
};

export default Users;