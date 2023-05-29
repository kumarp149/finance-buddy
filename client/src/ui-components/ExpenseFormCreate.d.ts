/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ExpenseFormCreateInputValues = {
    Field0?: string;
    Field1?: string;
    Field2?: string;
    Field3?: string;
};
export declare type ExpenseFormCreateValidationValues = {
    Field0?: ValidationFunction<string>;
    Field1?: ValidationFunction<string>;
    Field2?: ValidationFunction<string>;
    Field3?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ExpenseFormCreateOverridesProps = {
    ExpenseFormCreateGrid?: PrimitiveOverrideProps<GridProps>;
    Field0?: PrimitiveOverrideProps<TextFieldProps>;
    Field1?: PrimitiveOverrideProps<TextFieldProps>;
    Field2?: PrimitiveOverrideProps<TextFieldProps>;
    Field3?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type ExpenseFormCreateProps = React.PropsWithChildren<{
    overrides?: ExpenseFormCreateOverridesProps | undefined | null;
} & {
    onSubmit: (fields: ExpenseFormCreateInputValues) => void;
    onChange?: (fields: ExpenseFormCreateInputValues) => ExpenseFormCreateInputValues;
    onValidate?: ExpenseFormCreateValidationValues;
} & React.CSSProperties>;
export default function ExpenseFormCreate(props: ExpenseFormCreateProps): React.ReactElement;
