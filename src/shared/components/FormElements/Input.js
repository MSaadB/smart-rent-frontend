import React, { useReducer, useEffect } from "react";

import { validate } from "../../util/validator";
import "./Input.css";
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {

    let value = event.target ? event.target.value : event.value;

    dispatch({
      type: "CHANGE",
      val: value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : props.element === "textarea" ? (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : props.element === "select" ? (
      <Select
        id={props.id}
        options={props.options}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={props.options.find(option => option.value === inputState.value)}
      />
    ) : null;

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>
        {props.label}
      </label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
        >
      {element}
      {isValid && inputState.isTouched && (
          <FontAwesomeIcon
            icon={faCheckCircle}
            style={{ color: "green", fontSize: "20px" }}
          />
        )}
      </div>
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;