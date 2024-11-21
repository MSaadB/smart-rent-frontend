import React, { useState } from "react";
import "./ListingItem.css";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/FormElements/modal";

const ListingItem = (props) => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="listing-item__modal-content"
        footerClass="listing-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <h2>Map</h2>
        </div>
      </Modal>
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
            <Button onClick={openMapHandler}>VIEW ON MAP</Button>
            <Button>EDIT</Button>
            <Button>DELETE</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ListingItem;
