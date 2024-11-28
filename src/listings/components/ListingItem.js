import React, { useState } from "react";
import "./ListingItem.css";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/FormElements/modal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useContext } from "react";

const ListingItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:8080/api/properties/${props.userId}`,
        "DELETE"
      );
      props.onDelete(props.owner.email);
    } catch (err) {}
  };

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
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed and delete this property?</p>
      </Modal>
      <li className="listing-item">
        <Card className="listing-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="listing-item__image">
          {props.image ? (
              <img src={props.image} alt={props.title} />
            ) : (
              <p>No image available</p>
            )}
          </div>
          <div className="listing-item__info">
            <h1>{props.title}</h1>
            <p>
              <strong>Description: </strong>{props.description}
            </p>
            <p>
              <strong>Property Type: </strong>{props.propertyType}
            </p>
            <p>
              <strong>Address: </strong>{props.address}
            </p>
            <p>
              <strong>Price: </strong>${props.price}
            </p>
            <p>
              <strong>Available From: </strong>{new Date(props.availableFrom).toLocaleDateString()}
            </p>
            <p>
              <strong>Size: </strong>{props.size} sqft
            </p>
            <p>
              <strong>Bedrooms: </strong>{props.bedrooms}
            </p>
            <p>
              <strong>Bathrooms: </strong>{props.bathrooms}
            </p>
            <p>
              <strong>Furnished: </strong>{props.furnished}
            </p>
            <p>
              <strong>Parking: </strong>{props.parking}
            </p>
            <p>
              <strong>Owner: </strong>{props.owner.name} 
            </p>
            <p>
              <strong>Owner email: </strong>{props.owner.email}
            </p>
            <p>
              <strong>Lease Required: </strong>{props.leaseRequired}
            </p>
          </div>
          <div className="listing-item__actions">
            <Button onClick={openMapHandler}>VIEW ON MAP</Button>
            {auth.userId === props.owner.email && (
              <Button to={`/properties/${props.userId}`}>EDIT</Button>
            )}
            {auth.userId === props.userId && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ListingItem;
