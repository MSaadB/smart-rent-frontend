import React, { useCallback, useReducer } from "react";
import "./NewListing.css";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validator";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const NewListing = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const listingSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={listingSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description(at least 5 characters)."
        onInput={inputHandler}
      />
      {/*need to edit to allow selections only*/}
      <Input
        id="propertyType"
        element="input"
        label="Type of Property"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please select a valid type of property."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      {/*need to edit to validate URLs*/}
      <Input
        id="image"
        element="input"
        label="Image URL"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid URL."
        onInput={inputHandler}
      />
      {/*need to edit to validate numbers only*/}
      <Input
        id="price"
        element="input"
        label="Listing Price"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid number."
        onInput={inputHandler}
      />
      {/*need to edit to validate dates only*/}
      <Input
        id="availableFrom"
        element="input"
        label="Date(s) Property is Available"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid date."
        onInput={inputHandler}
      />
      {/*need to edit to validate numbers only*/}
      <Input
        id="size"
        element="input"
        label="Size (sq ft.)"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid number."
        onInput={inputHandler}
      />
      {/*need to edit to validate numbers only*/}
      <Input
        id="bedrooms"
        element="input"
        label="# of Bedroom(s)"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid number."
        onInput={inputHandler}
      />
      {/*need to edit to validate numbers only*/}
      <Input
        id="bathrooms"
        element="input"
        label="# of Bathroom(s)"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid number."
        onInput={inputHandler}
      />
      {/*need to edit to validate Yes/No selection only*/}
      <Input
        id="furnished"
        element="input"
        label="Furnished?"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please make a selection."
        onInput={inputHandler}
      />
      {/*need to edit to validate Yes/No selection only*/}
      <Input
        id="parking"
        element="input"
        label="Parking Available?"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please make a selection."
        onInput={inputHandler}
      />
      <Input
        id="location"
        element="input"
        label="Lat/Long:"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter valid co-ordinates."
        onInput={inputHandler}
      />
      <Input
        id="owner"
        element="input"
        label="Owner:"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name."
        onInput={inputHandler}
      />
      {/*need to edit to validate Yes/No selection only*/}
      <Input
        id="leaseRequired"
        element="input"
        label="Lease Required?"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please make a selection."
        onInput={inputHandler}
      />

      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewListing;