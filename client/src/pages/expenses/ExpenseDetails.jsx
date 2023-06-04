import { Tabs, TabItem } from "@aws-amplify/ui-react"
import Layout from "../../components/layout/Layout.tsx"
import ExpenseTable from "../../components/expenses/ExpenseTable"
import { ExpenseFormCreate } from "../../ui-components"
import { Auth } from 'aws-amplify';
import { useEffect, useState } from "react";
import { Route, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Alert } from "react-bootstrap";



const ExpenseTabs = () => {

    const firstDayOfMonth = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Adding 1 to get the month index from 1 to 12
        const firstDay = "01"; // Assuming the first day is always the 1st
        return `${year}-${month.toString().padStart(2, "0")}-${firstDay}`;
    }
    const lastDayOfMonth = () => {
        const todayDate = new Date();
        const lastDay = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0);
        const year = lastDay.getFullYear();
        const month = lastDay.getMonth() + 1;
        const day = lastDay.getDate();
        return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    }
    const formatDate = (date) => {
        const currentDate = new Date(date);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Adding 1 to get the month index from 1 to 12
        const day = currentDate.getDate();
        return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    }

    const [apiExpenseData, setApiExpenseData] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [isDataFetched, setDataFetchStatus] = useState(true);
    const [updateStatus, setUpdateStatus] = useState(true);
    const [updateError, setUpdateError] = useState(false);
    const [deleteApiDone, setDeleteApiDone] = useState(true);
    const [deleteApiError, setDeleteApiError] = useState(false);

    const [updateAlert, setUpdateAlert] = useState("");
    const [deleteAlert, setDeleteAlert] = useState("");

    const history = useHistory();

    useEffect(async () => {
        await fetchData(firstDayOfMonth(), lastDayOfMonth());
    }, [])

    const fetchData = async (fromDate, toDate) => {  //send 0 as flag while fetching first time or refresh
        setDataFetchStatus(false);
        try {
            const user = await Auth.currentAuthenticatedUser();
            const { username } = user;
            try {
                const response = await axios.get('/api/expenses/fetch', {
                    params: {
                        userId: username,
                        fromDate: fromDate,
                        toDate: toDate
                    }
                });
                setApiExpenseData(response.data);
                setDataFetchStatus(true);
                setApiError(false);
            } catch (error) {
                setDataFetchStatus(true);
                setApiError(true);
            }
            setTimeout(() => {
                setDeleteAlert("");
                setUpdateAlert("");
            }, 5000)
        } catch (error) {
            history.push('/auth');
        }
    }
    const updateData = async (id, name, amount, date, category) => {
        setUpdateStatus(false);
        try {
            const user = await Auth.currentAuthenticatedUser();
            const { username } = user;
            try {
                const response = await axios.post('/api/expenses/update', {
                    expenseId: id,
                    expenseName: name,
                    expenseAmount: amount,
                    expenseDate: date,
                    expenseCategory: category
                })
                console.log("UPDATE API RESPONSE: " + response);
                setUpdateStatus(true);
                setApiExpenseData([]);
                setUpdateError(false);
                setUpdateAlert("Successfully updated the selected expense");
            } catch (error) {
                setUpdateStatus(true);
                setUpdateError(true);
                setUpdateAlert("Error while updating the selected expense");
            }
        } catch (error) {
            history.push('/auth');
        }
    }

    const deleteData = async (ids) => {
        setDeleteApiDone(false);
        try {
            const user = await Auth.currentAuthenticatedUser();
            const { username } = user;
            try {
                const response = await axios.post('/api/expenses/delete', {
                    expenseIds: ids
                })
                console.log("DELETE API response: " + response);
                setDeleteApiDone(true);
                setApiExpenseData([]);
                setDeleteApiError(false);
                setDeleteAlert("Successfully deleted the selected expenses");
            } catch (error) {
                setDeleteApiDone(true);
                setDeleteApiError(true);
                setDeleteAlert("Error occured while deleting the expenses");
            }
        } catch (error) {
            history.push('/auth');
        }
    }

    return (
        <>
            {updateAlert !== "" ? (
                <div>
                    <Alert variant={updateAlert.toLowerCase().includes("error") ? "error" : "success"} isDismissible={true}>{updateAlert}</Alert>
                </div>
            ) : deleteAlert !== "" ? (
                <div>
                    <Alert variant={deleteAlert.toLowerCase().includes("error") ? "error" : "success"} isDismissible={true}>{deleteAlert}</Alert>
                </div>
            ) : (
                <></>
            )
            }
            <Tabs>
                <TabItem title="Edit"><ExpenseTable data={apiExpenseData} apiError={apiError} refetchVia={fetchData} fromDate={firstDayOfMonth()} toDate={lastDayOfMonth()} isDataFetched={isDataFetched} updateVia={updateData} isUpdateApiDone={updateStatus} updateApiError={updateError} deleteVia={deleteData} isDeleteApiDone={deleteApiDone} deleteApiError={deleteApiError} /></TabItem>
                <TabItem title="New"><ExpenseFormCreate /></TabItem>
            </Tabs>
        </>
    )
}

const ExpenseDetails = () => {
    return (
        <Layout component={<ExpenseTabs />}></Layout>
    )
}

export default ExpenseDetails;