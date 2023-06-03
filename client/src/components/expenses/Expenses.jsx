import { TabItem, Tabs } from "@aws-amplify/ui-react";
import ExpenseTable from "./ExpenseTable";
import { ExpenseFormCreate } from "../../ui-components";

export default function Expenses() {
    return (
        <Tabs>
            <TabItem title="Edit"><ExpenseTable /></TabItem>
            <TabItem title="New"><ExpenseFormCreate /></TabItem>
        </Tabs>
    )
}