import React, {useEffect, useState, useContext} from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MIN, VALIDATOR_FUTURE_DATE } from "../../shared/util/validator";
import { useForm } from "../../shared/hooks/form-hooks";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./NewListing.css"

const propertyTypeOptions = [
    { value: "Room", label: "Room" },
    { value: "Basement", label: "Basement" },
    { value: "House", label: "House" },
    { value: "Apartment", label: "Apartment" },
  ];
  
  const yesNoOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

const UpdateListing = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedProperty, setLoadedProperty] = useState();
    const propertyId = useParams()._id;
    const history = useHistory();
  
    const [formState, inputHandler, setFormData] = useForm(
      {
        title: {
          value: "",
          isValid: false,
        },
        description: {
          value: "",
          isValid: false,
        },
        propertyType: {
            value: "",
            isValid: false,
        },
        address: {
            value: "",
            isValid: false,
        },
        price: {
            value: "",
            isValid: false,
        },
        availableFrom: {
            value: "",
            isValid: false,
        },
        size: {
            value: "",
            isValid: false,
        },
        bedrooms: {
            value: "",
            isValid: false,
        },
        bathrooms: {
            value: "",
            isValid: false,
        },
        furnished: {
            value: "",
            isValid: false,
        },
        parking: {
            value: "",
            isValid: false,
        },
        owner: {
            value: "",
            isValid: false,
        },
        ownerEmail: {
            value: "",
            isValid: false,
        },
        leaseRequired: {
            value: "",
            isValid: false,
        },
      },
      false
    );

    useEffect(() => {
        const fetchProperty = async () => {
          try {
            const responseData = await sendRequest(
              `http://localhost:8080/api/properties/${propertyId}`
            );
            setLoadedProperty(responseData.property);
            setFormData(
              {
                title: {
                  value: responseData.property.title,
                  isValid: true,
                },
                description: {
                  value: responseData.property.description,
                  isValid: true,
                },
                propertyType: {
                    value: responseData.property.propertyType,
                    isValid: true,
                },
                address: {
                    value: responseData.property.address,
                    isValid: true,
                },
                price: {
                    value: responseData.property.price,
                    isValid: true,
                },
                availableFrom: {
                    value: responseData.property.availableFrom,
                    isValid: true,
                },
                size: {
                    value: responseData.property.size,
                    isValid: true,
                },
                bedrooms: {
                    value: responseData.property.bedrooms,
                    isValid: true,
                },
                bathrooms: {
                    value: responseData.property.bathrooms,
                    isValid: true,
                },
                furnished: {
                    value: responseData.property.furnished,
                    isValid: true,
                },
                parking: {
                    value: responseData.property.parking,
                    isValid: true,
                },
                owner: {
                    value: responseData.property.owner.name,
                    isValid: true,
                },
                ownerEmail: {
                    value: responseData.property.owner.email,
                    isValid: true,
                },
                leaseRequired: {
                    value: responseData.property.leaseRequired,
                    isValid: true,
                },
              },
              true
            );
          } catch (err) {}
        };
        fetchProperty();
      }, [sendRequest, propertyId, setFormData]);

      const propertyUpdateSubmitHandler = async (event) => {
        event.preventDefault();
        try {
          await sendRequest(
            `http://localhost:8080/api/properties/${propertyId}`,
            "PATCH",
            JSON.stringify({
              title: formState.inputs.title.value,
              description: formState.inputs.description.value,
            }),
            {
              "Content-Type": "application/json",
            }
          );
          history.push("/" + auth.userId + "/properties");
        } catch (err) {}
      };

      if (isLoading) {
        return (
          <div className="center">
            <LoadingSpinner />
          </div>
        );
      }
    
      if (!loadedProperty && !error) {
        return (
          <div className="center">
            <Card>
              <h2>Could not find place!</h2>
            </Card>
          </div>
        );
      }

      return (
        <React.Fragment>
          <ErrorModal error={error} onClear={clearError} />
          {!isLoading && loadedProperty && (
            <form className="place-form" onSubmit={propertyUpdateSubmitHandler}>
              <Input
                id="title"
                element="input"
                type="text"
                label="Title:"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
                initialValue={loadedProperty.title}
                initialValid={true}
              />
              <Input
                id="description"
                element="textarea"
                label="Description:"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (min. 5 characters)."
                onInput={inputHandler}
                initialValue={loadedProperty.description}
                initialValid={true}
              />
              <Input
                id="propertyType"
                element="select"
                label="Type of property:"
                options={propertyTypeOptions}
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please select at least 1 valid type of property."
                onInput={inputHandler}
                initialValue={loadedProperty.propertyType}
                initialValid={true}
              />
              <Input
                id="address"
                element="input"
                label="Address:"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid address."
                onInput={inputHandler}
                initialValue={loadedProperty.address}
                initialValid={true}
              />
              <Input
                id="price"
                element="input"
                label="Listing Price:"
                type="number"
                validators={[VALIDATOR_MIN(0), VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid price (non-negative)."
                onInput={inputHandler}
                initialValue={loadedProperty.price}
                initialValid={true}
              />
              <Input
                id="availableFrom"
                element="input"
                label="Available From:"
                type="date"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_FUTURE_DATE()]}
                errorText="Please select a valid date."
                onInput={inputHandler}
                initialValue={loadedProperty.availableFrom}
                initialValid={true}
              />
              <Input
                id="size"
                element="input"
                label="Size (sq ft.):"
                type="number"
                validators={[VALIDATOR_MIN(0)]}
                errorText="Please enter a valid size (non-negative)."
                onInput={inputHandler}
                initialValue={loadedProperty.size}
                initialValid={true}
              />
              <Input
                id="bedrooms"
                element="input"
                label="Number of Bedroom(s):"
                type="number"
                validators={[VALIDATOR_MIN(0)]}
                errorText="Please enter a valid number of bedrooms (non-negative)."
                onInput={inputHandler}
                initialValue={loadedProperty.bedrooms}
                initialValid={true}
              />
              <Input
                id="bathrooms"
                element="input"
                label="Number of Bathrooms(s):"
                type="number"
                validators={[VALIDATOR_MIN(0)]}
                errorText="Please enter a valid number of bathrooms (non-negative)."
                onInput={inputHandler}
                initialValue={loadedProperty.bathrooms}
                initialValid={true}
              />
              <Input
                id="furnished"
                element="select"
                label="Furnished?:"
                options={yesNoOptions}
                validators={[]}
                errorText="Please select Yes or No."
                onInput={inputHandler}
                initialValue={loadedProperty.furnished}
                initialValid={true}
              />
              <Input
                id="parking"
                element="select"
                label="Parking Available?:"
                options={yesNoOptions}
                validators={[]}
                errorText="Please select Yes or No."
                onInput={inputHandler}
                initialValue={loadedProperty.parking}
                initialValid={true}
              />
              <Input
                id="owner"
                element="input"
                label="Your name:"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid name."
                onInput={inputHandler}
                initialValue={loadedProperty.owner.name}
                initialValid={true}
              />
              <Input
                id="owner"
                element="input"
                label="Your name:"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid name."
                onInput={inputHandler}
                initialValue={loadedProperty.owner.email}
                initialValid={true}
              />
              <Input
                id="leaseRequired"
                element="select"
                label="Lease Required?:"
                options={yesNoOptions}
                validators={[]}
                errorText="Please select Yes or No."
                onInput={inputHandler}
                initialValue={loadedProperty.leaseRequired}
                initialValid={true}
              />
              <Button type="submit" disabled={!formState.isValid}>
                UPDATE PROPERTY
              </Button>
            </form>
          )}
        </React.Fragment>
      );
    };
    
    export default UpdateListing;