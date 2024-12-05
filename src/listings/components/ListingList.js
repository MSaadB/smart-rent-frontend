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
      {props.items.map((property) => (
        <ListingItem
          key={property.id}
          id={property.id}
          image={property.image}
          title={property.title}
          description={property.description}
          propertyType={property.propertyType}
          address={property.address}
          price={property.price}
          availableFrom={property.availableFrom}
          size={property.size}
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          furnished={property.furnished}
          parking={property.parking}
          ownerName={property.ownerName}
          ownerEmail={property.ownerEmail}
          leaseRequired={property.leaseRequired}
          creatorId={property.creator}
        />
      ))}
    </ul>
  );
};

export default ListingList;
