import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingList from "../components/ListingList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserListings = () => {
  const [loadedProperties, setLoadedProperties] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userEmail = useParams().userId;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8080/api/properties/user/${userId}`
        );
        setLoadedPlaces(responseData.properties);
      } catch (err) {}
    };
    fetchProperties();
  }, [sendRequest, userId]);

  const propertyDeletedHandler = (deletedPropertyId) => {
    setLoadedProperties((prevProperties) =>
      prevProperties.filter((property) => property.id !== deletedPropertyId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedProperties && (
        <ListingList items={loadedProperties} onDeleteProperty={propertyDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default UserListings;