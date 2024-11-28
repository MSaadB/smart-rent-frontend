import React, { useContext } from "react";
import "./NewListing.css";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MIN,
  VALIDATOR_FUTURE_DATE,
  VALIDATOR_URL,
} from "../../shared/util/validator";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useForm } from "../../shared/hooks/form-hooks";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

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

const NewListing = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
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
      image: {
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
      ownerName: {
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

  const history = useHistory();

  const listingSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:8080/api/properties/new",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          propertyType: formState.inputs.propertyType.value,
          address: formState.inputs.address.value,
          image: formState.inputs.image.value,
          price: formState.inputs.price.value,
          availableFrom: formState.inputs.availableFrom.value,
          size: formState.inputs.size.value,
          bedrooms: formState.inputs.bedrooms.value,
          bathrooms: formState.inputs.bathrooms.value,
          furnished: formState.inputs.furnished.value,
          parking: formState.inputs.parking.value,
          owner: {
            name: formState.inputs.ownerName.value,
            email: formState.inputs.ownerEmail.value,
          },
          leaseRequired: formState.inputs.leaseRequired.value,
          creator: auth.userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={listingSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title:"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
          errorText="Please enter a valid title(at least 10 characters)."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description:"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description(at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="propertyType"
          element="select"
          label="Type of Property:"
          options={propertyTypeOptions}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please select at least 1 valid type of property."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address:"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Input
          id="image"
          element="input"
          label="Images:"
          type="url"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_URL()]}
          errorText="Please enter a valid image URL."
          onInput={inputHandler}
        />
        <Input
          id="price"
          element="input"
          label="Listing Price:"
          type="number"
          validators={[VALIDATOR_MIN(0), VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid price (non-negative)."
          onInput={inputHandler}
        />
        <Input
          id="availableFrom"
          element="input"
          label="Available From:"
          type="date"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_FUTURE_DATE()]}
          errorText="Please select a valid date."
          onInput={inputHandler}
        />
        <Input
          id="size"
          element="input"
          label="Size (sq ft.):"
          type="number"
          validators={[VALIDATOR_MIN(0)]}
          errorText="Please enter a valid size (non-negative)."
          onInput={inputHandler}
        />
        <Input
          id="bedrooms"
          element="input"
          label="Number of Bedroom(s):"
          type="number"
          validators={[VALIDATOR_MIN(0)]}
          errorText="Please enter a valid number of bedrooms (non-negative)."
          onInput={inputHandler}
        />
        <Input
          id="bathrooms"
          element="input"
          label="Number of Bathroom(s):"
          type="number"
          validators={[VALIDATOR_MIN(0)]}
          errorText="Please enter a valid number of bathrooms (non-negative)."
          onInput={inputHandler}
        />
        <Input
          id="furnished"
          element="select"
          label="Furnished?:"
          options={yesNoOptions}
          validators={[]}
          errorText="Please select Yes or No."
          onInput={inputHandler}
        />
        <Input
          id="parking"
          element="select"
          label="Parking Available?:"
          options={yesNoOptions}
          validators={[]}
          errorText="Please select Yes or No."
          onInput={inputHandler}
        />
        <Input
          id="ownerName"
          element="input"
          label="Your name:"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
        />
        <Input
          id="ownerEmail"
          element="input"
          label="Your Email:"
          type="email"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          id="leaseRequired"
          element="select"
          label="Lease Required?:"
          options={yesNoOptions}
          validators={[]}
          errorText="Please select Yes or No."
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          ADD PROPERTY
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewListing;
