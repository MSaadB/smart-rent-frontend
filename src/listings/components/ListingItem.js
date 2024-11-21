import React from "react";
import "./ListingItem.css";
import Card from "../../shared/components/UIElements/Card";

const ListingItem = (props) => {
    return (
        <li className="listing-item">
            <Card className="listing-item__content">
                <div className="listing-item__image">
                    <img src={props.image} alt={props.title}></img>
                </div>
                <div className="listing-item__info">
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <p>{props.description}</p>
                </div>
                <div className="listing-item__actions">
                    <button>VIEW ON MAP</button>
                    <button>EDIT</button>
                    <button>DELETE</button>
                </div>
            </Card>
        </li>
    );
};

export default ListingItem;