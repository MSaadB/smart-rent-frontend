import React from "react";
import "./ListingList.css";
import Card from "../../shared/components/UIElements/Card";
import ListingItem from "./ListingItem";

const ListingList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="listing-list">
        <Card>
          <h2>No listings found. Create a listing?</h2>
          <button>Create Listing</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="listing-list">
      {props.items.map((listing) => (
        <ListingItem key={listing.id} id={listing.id} title={listing.title}
        description={listing.description}
        propertyType={listing.propertyType}
        address={listing.address}
        image={listing.image}
        price={listing.price}
        availableFrom={listing.availableFrom}
        size={listing.size}
        bedrooms={listing.bedrooms}
        bathrooms={listing.bathrooms}
        furnished={listing.furnished}
        parking={listing.parking}
        location={listing.location}
        owner={listing.owner}
        leaseRequired={listing.leaseRequired}
        />
      ))}
    </ul>
  );
};

export default ListingList;
