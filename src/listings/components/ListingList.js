import React, {useState, useEffect} from "react";
import "./ListingList.css";
import Card from "../../shared/components/UIElements/Card";
import ListingItem from "./ListingItem";
import Button from "../../shared/components/FormElements/Button";

const ListingList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="listing-list">
        <Card>
          <h2>No listings found. Create a listing?</h2>
          <Button to="/properties/new">Create Listing</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="listing-list">
      {props.items.map((listing) => (
        <ListingItem
          key={listing._id}
          id={listing._id}
          image={listing.image}
          title={listing.title}
          description={listing.description}
          propertyType={listing.propertyType}
          address={listing.address}
          price={listing.price}
          availableFrom={listing.availableFrom}
          size={listing.size}
          bedrooms={listing.bedrooms}
          bathrooms={listing.bathrooms}
          furnished={listing.furnished}
          parking={listing.parking}
          ownerName={listing.ownerName}
          ownerEmail={listing.ownerEmail}
          leaseRequired={listing.leaseRequired}
        />
      ))}
    </ul>
  );
};

export default ListingList;
