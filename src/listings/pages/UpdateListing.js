import React, {useEffect, useState, useContext} from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MIN, VALIDATOR_FUTURE_DATE, VALIDATOR_YESNO, VALIDATOR_PROPERTY_TYPE } from "../../shared/util/validator";
import { useForm } from "../../shared/hooks/form-hooks";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./NewListing.css"

const UpdateListing = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedProperty, setLoadedProperty] = useState();
    const propertyId = useParams().propertyId;
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
            console.log("Property ID:", propertyId)
            const responseData = await sendRequest(
              `http://localhost:8080/api/properties/${propertyId}`
            );
            console.log("Fetched property:", responseData);

            if (!responseData || !responseData.property) {
              throw new Error("Property data not found");
          }

            setLoadedProperty(responseData.property);
            console.log("Loaded Property:", responseData.property);

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
                price: {
                    value: responseData.property.price,
                    isValid: true,
                },
                availableFrom: {
                  value: responseData.property.availableFrom
                    ? new Date(responseData.property.availableFrom).toISOString().split('T')[0]
                    : "",
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
                leaseRequired: {
                    value: responseData.property.leaseRequired,
                    isValid: true,
                },
              },
              true
            );
          } catch (err) {
            console.log("Error fetching property:", err);
          }
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
              propertyType: formState.inputs.propertyType.value,
              price: formState.inputs.price.value,
              availableFrom: formState.inputs.availableFrom.value,
              size: formState.inputs.size.value,
              bedrooms: formState.inputs.bedrooms.value,
              bathrooms: formState.inputs.bathrooms.value,
              furnished: formState.inputs.furnished.value,
              parking: formState.inputs.parking.value,
              leaseRequired: formState.inputs.leaseRequired.value,
            }),
            {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token,
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
                element="input"
                type="text"
                label="Type of property:"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_PROPERTY_TYPE()]}
                errorText="Please enter Room, basement, apartment or house."
                onInput={inputHandler}
                initialValue={loadedProperty.propertyType}
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
                initialValue={loadedProperty ? loadedProperty.availableFrom: ""}
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
                element="input"
                type="text"
                label="Furnished?:"
                validators={[VALIDATOR_YESNO()]}
                errorText="Please enter Yes or No."
                onInput={inputHandler}
                initialValue={loadedProperty.furnished}
                initialValid={true}
              />
              <Input
                id="parking"
                element="input"
                type="text"
                label="Parking Available?:"
                validators={[VALIDATOR_YESNO()]}
                errorText="Please enter Yes or No."
                onInput={inputHandler}
                initialValue={loadedProperty.parking}
                initialValid={true}
              />
              <Input
                id="leaseRequired"
                element="input"
                type="text"
                label="Lease Required?:"
                validators={[VALIDATOR_YESNO()]}
                errorText="Please enter Yes or No."
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