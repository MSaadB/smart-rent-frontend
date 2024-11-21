import React from "react";
import "./Listings.css";
import ListingList from "../components/ListingList";

const DUMMY_LISTINGS = [
    {
        id: "id 1",
        title: "title 1",
        description: "description 1",
        propertyType: "propertyType 1",
        address: "address 1",
        image: "https://live.staticflickr.com/2889/33076859034_cb257fc1da_b.jpg",
        price: "price 1",
        availableFrom: "availableFrom 1",
        size: "size 1",
        bedrooms: "bedrooms 1",
        bathrooms: "bathrooms 1",
        furnished: "furnished 1",
        parking: "parking 1",
        location: {
            lat: "lat 1",
            lng: "lng 1"
        },
        owner: "owner 1",
        leaseRequired: "leaseRequired 1"
    }
];

const Listings = () => {
    return <ListingList items={DUMMY_LISTINGS}/>;
};

export default Listings;