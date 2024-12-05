import React, { useContext, useEffect } from "react";
import "./NewListing.css";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MIN,
  VALIDATOR_FUTURE_DATE,
  VALIDATOR_YESNO,
  VALIDATOR_PROPERTY_TYPE
} from "../../shared/util/validator";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useForm } from "../../shared/hooks/form-hooks";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const NewListing = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      },
      propertyType: {
        value: "",
        isValid: false
      },
      address: {
        value: "",
        isValid: false
      },
      image: {
        value: "",
        isValid: false
      },
      price: {
        value: "",
        isValid: false
      },
      availableFrom: {
        value: "",
        isValid: false
      },
      size: {
        value: "",
        isValid: false
      },
      bedrooms: {
        value: "",
        isValid: false
      },
      bathrooms: {
        value: "",
        isValid: false
      },
      furnished: {
        value: "",
        isValid: false
      },
      parking: {
        value: "",
        isValid: false
      },
      ownerName: {
        value: auth.name || "",
        isValid: !!auth.name
      },
      ownerEmail: {
        value: auth.email || "",
        isValid: !!auth.email
      },
      leaseRequired: {
        value: "",
        isValid: false
      },
    },
    false
  );

  useEffect(() => {
    console.log('auth.name:', auth.name);
    console.log('auth.email:', auth.email);
    if (auth.name && auth.email && (!formState.inputs.ownerName.isValid || !formState.inputs.ownerEmail.isValid)) {
      setFormData(
        {
          ...formState.inputs,
          ownerName: { value: auth.name, isValid: true },
          ownerEmail: { value: auth.email, isValid: true },
        },
        formState.isValid
      );
    }
  }, [auth.name, auth.email, setFormData, formState.inputs]);

  const history = useHistory();

  const listingSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title",formState.inputs.title.value);
      formData.append("description",formState.inputs.description.value);
      formData.append("propertyType",formState.inputs.propertyType.value);
      formData.append("address",formState.inputs.address.value);
      formData.append("image",formState.inputs.image.value);
      formData.append("price",formState.inputs.price.value);
      formData.append("availableFrom",formState.inputs.availableFrom.value);
      formData.append("size",formState.inputs.size.value);
      formData.append("bedrooms",formState.inputs.bedrooms.value);
      formData.append("bathrooms",formState.inputs.bathrooms.value);
      formData.append("furnished",formState.inputs.furnished.value);
      formData.append("parking",formState.inputs.parking.value);
      formData.append("ownerName",formState.inputs.ownerName.value);
      formData.append("ownerEmail",formState.inputs.ownerEmail.value);
      formData.append("leaseRequired",formState.inputs.leaseRequired.value);
      await sendRequest(
        "http://localhost:8080/api/properties/new",
        "POST", formData, {
          Authorization: "Bearer " + auth.token,
        });
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
          element="input"
          type="text"
          label="Type of Property:"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_PROPERTY_TYPE()]}
          errorText="Please enter Room, basement, apartment or house."
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
        <ImageUpload
        id="image"
        onInput={inputHandler}
        errorText="Please provide an image."
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
          validators={[VALIDATOR_FUTURE_DATE()]}
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
          element="input"
          type="text"
          label="Furnished?:"
          validators={[VALIDATOR_YESNO()]}
          errorText="Please enter Yes or No."
          onInput={inputHandler}
        />
        <Input
          id="parking"
          element="input"
          type="text"
          label="Parking Available?:"
          validators={[VALIDATOR_YESNO()]}
          errorText="Please enter Yes or No."
          onInput={inputHandler}
        />
        <Input
          id="ownerName"
          element="input"
          label="Your name:"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
          initialValue={auth.name}
          initialValid={!!auth.name}
        />
        <Input
          id="ownerEmail"
          element="input"
          label="Your Email:"
          type="email"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
          initialValue={auth.email}
          initialValid={!!auth.email}
        />
        <Input
          id="leaseRequired"
          element="input"
          type="text"
          label="Lease Required?:"
          validators={[VALIDATOR_YESNO()]}
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
