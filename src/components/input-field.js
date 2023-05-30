import { forwardRef } from "react";

const { InputGroup, Form } = require("react-bootstrap");

const InputField = forwardRef(function InputField(
  { type, number, value },
  ref
) {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text
        id={`basic-addon${number}`}
      >{`${type} #${number}`}</InputGroup.Text>
      <Form.Control
        aria-label={`${type} #${number} ${value ? "Value" : "Line"}`}
        aria-describedby={`basic-addon${number}`}
        ref={ref}
        placeholder={`Enter ${value ? "a value" : "odds"}`}
      />
    </InputGroup>
  );
});

export default InputField;
