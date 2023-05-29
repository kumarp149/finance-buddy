/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Auth } from 'aws-amplify';

import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
export default function ExpenseFormCreate(props) {
  const { onSubmit, onValidate, onChange, overrides, ...rest } = props;

  const handleSubmit = async (event) => {
    console.log(Field0);
    console.log(Field1);
    console.log(Field2);
    console.log(Field3);
    const username = await Auth.currentAuthenticatedUser();
    console.log(username.username);
  }

  const initialValues = {
    Field0: "",
    Field1: "",
    Field2: "",
    Field3: "",
  };
  const [Field0, setField0] = React.useState(initialValues.Field0);
  const [Field1, setField1] = React.useState(initialValues.Field1);
  const [Field2, setField2] = React.useState(initialValues.Field2);
  const [Field3, setField3] = React.useState(initialValues.Field3);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setField0(initialValues.Field0);
    setField1(initialValues.Field1);
    setField2(initialValues.Field2);
    setField3(initialValues.Field3);
    setErrors({});
  };
  const validations = {
    Field0: [
      { type: "Required" },
      {
        type: "GreaterThanChar",
        numValues: [5],
        validationMessage: "must be at least 5 characters",
      },
      {
        type: "LessThanChar",
        numValues: [30],
        validationMessage: "must be 30 characters or fewer",
      },
    ],
    Field1: [{ type: "Required" }],
    Field2: [{ type: "Required" }],
    Field3: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={handleSubmit}
      // {async (event) => {
      //   event.preventDefault();
      //   const modelFields = {
      //     Field0,
      //     Field1,
      //     Field2,
      //     Field3,
      //   };
      //   const validationResponses = await Promise.all(
      //     Object.keys(validations).reduce((promises, fieldName) => {
      //       if (Array.isArray(modelFields[fieldName])) {
      //         promises.push(
      //           ...modelFields[fieldName].map((item) =>
      //             runValidationTasks(fieldName, item)
      //           )
      //         );
      //         return promises;
      //       }
      //       promises.push(
      //         runValidationTasks(fieldName, modelFields[fieldName])
      //       );
      //       return promises;
      //     }, [])
      //   );
      //   if (validationResponses.some((r) => r.hasError)) {
      //     return;
      //   }
      //   await onSubmit(modelFields);
      // }}
      // {...getOverrideProps(overrides, "ExpenseFormCreate")}
      // {...rest}
    >
      <TextField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Title</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        descriptiveText="Give a title to your expense"
        isRequired={true}
        placeholder="Enter here"
        value={Field0}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Field0: value,
              Field1,
              Field2,
              Field3,
            };
            const result = onChange(modelFields);
            value = result?.Field0 ?? value;
          }
          if (errors.Field0?.hasError) {
            runValidationTasks("Field0", value);
          }
          setField0(value);
        }}
        onBlur={() => runValidationTasks("Field0", Field0)}
        errorMessage={errors.Field0?.errorMessage}
        hasError={errors.Field0?.hasError}
        {...getOverrideProps(overrides, "Field0")}
      ></TextField>
      <TextField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Amount</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        descriptiveText="Give the amount spent in INR"
        isRequired={true}
        placeholder="Enter here"
        type="number"
        step="any"
        value={Field1}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Field0,
              Field1: value,
              Field2,
              Field3,
            };
            const result = onChange(modelFields);
            value = result?.Field1 ?? value;
          }
          if (errors.Field1?.hasError) {
            runValidationTasks("Field1", value);
          }
          setField1(value);
        }}
        onBlur={() => runValidationTasks("Field1", Field1)}
        errorMessage={errors.Field1?.errorMessage}
        hasError={errors.Field1?.hasError}
        {...getOverrideProps(overrides, "Field1")}
      ></TextField>
      <TextField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Date</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        descriptiveText="Give the date of your expense"
        isRequired={true}
        type="date"
        value={Field2}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Field0,
              Field1,
              Field2: value,
              Field3,
            };
            const result = onChange(modelFields);
            value = result?.Field2 ?? value;
          }
          if (errors.Field2?.hasError) {
            runValidationTasks("Field2", value);
          }
          setField2(value);
        }}
        onBlur={() => runValidationTasks("Field2", Field2)}
        errorMessage={errors.Field2?.errorMessage}
        hasError={errors.Field2?.hasError}
        {...getOverrideProps(overrides, "Field2")}
      ></TextField>
      <SelectField
        label="Category"
        descriptiveText="Select the category of your expense"
        placeholder="Please select an option"
        value={Field3}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Field0,
              Field1,
              Field2,
              Field3: value,
            };
            const result = onChange(modelFields);
            value = result?.Field3 ?? value;
          }
          if (errors.Field3?.hasError) {
            runValidationTasks("Field3", value);
          }
          setField3(value);
        }}
        onBlur={() => runValidationTasks("Field3", Field3)}
        errorMessage={errors.Field3?.errorMessage}
        hasError={errors.Field3?.hasError}
        {...getOverrideProps(overrides, "Field3")}
      >
        <option
          children="Food"
          value="Food"
          {...getOverrideProps(overrides, "Field3option0")}
        ></option>
        <option
          children="Groceries"
          value="Groceries"
          {...getOverrideProps(overrides, "Field3option1")}
        ></option>
        <option
          children="Movies"
          value="Movies"
          {...getOverrideProps(overrides, "Field3option2")}
        ></option>
        <option
          children="Shopping"
          value="Shopping"
          {...getOverrideProps(overrides, "Field3option3")}
        ></option>
        <option
          children="Games"
          value="Games"
          {...getOverrideProps(overrides, "Field3option4")}
        ></option>
        <option
          children="Rent"
          value="Rent"
          {...getOverrideProps(overrides, "Field3option5")}
        ></option>
        <option
          children="Bills"
          value="Bills"
          {...getOverrideProps(overrides, "Field3option6")}
        ></option>
        <option
          children="Others"
          value="Others"
          {...getOverrideProps(overrides, "Field3option7")}
        ></option>
      </SelectField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
