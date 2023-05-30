import { forwardRef } from "react";

const { InputGroup, Form, Row } = require("react-bootstrap");

const InputField = forwardRef(function InputField(
  { type, number, value },
  ref
) {
  return (
    <Row className="justify-content-center">
      <InputGroup className="mb-3 w-75 m-0">
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
    </Row>
  );
});

export default InputField;
