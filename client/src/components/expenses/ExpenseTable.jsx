import React, { useEffect, useState } from 'react';

import { Route, useHistory } from 'react-router-dom';

import { Table, TableBody, TableCell, TableRow, TableHead, Loader, SelectField } from '@aws-amplify/ui-react';
import Container from 'react-bootstrap/Container';
import { Row, Col, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { SearchField } from '@aws-amplify/ui-react';
import { Button, ButtonGroup } from '@aws-amplify/ui-react';
import { CheckboxField, TextField } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { Modal } from 'antd';




import axios from 'axios';


export default function ExpenseTable(props) {

    const firstDayOfMonth = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Adding 1 to get the month index from 1 to 12
        const firstDay = "01"; // Assuming the first day is always the 1st
        return `${year}-${month.toString().padStart(2, "0")}-${firstDay}`;
    }

    const currentDate = () => {
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


    const [expenseData, setExpenseData] = useState(props.data);
    const [apiError, setApiError] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [fromDate, setFromDate] = useState(props.fromDate);
    const [toDate, setToDate] = useState(props.toDate);
    //const [refresh, setRefresh] = useState(false);
    const [refreshState, setRefreshState] = useState(false);
    const [editExpenseId, setEditExpenseId] = useState("");
    const [checkboxes, setCheckboxes] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [newTitle, setNewTitle] = useState("");
    const [newAmount, setNewAmount] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [newDate, setNewDate] = useState("");
    const [updateStatus, setUpdateStatus] = useState("");
    const [modelOpen, setModelOpen] = useState(false);
    //const [deleteStatus, setDeleteStatus] = useState(false);
    const [deleteStatusApi, setDeleteStatusApi] = useState(false);
    const [deleteConfirmModelOpen, setDeleteConfirmModel] = useState(false);
    const [deleteModelLoading, setDeleteModelLoading] = useState(false);
    const [newFetch, setNewFetch] = useState(false);


    const history = useHistory();


    // const fetchData = async () => {
    //     setRefreshState(true);
    //     try {
    //         const user = await Auth.currentAuthenticatedUser();
    //         console.log(user);
    //         const { username } = user;
    //         const response = await axios.get('/api/expenses/fetch', {
    //             params: {
    //                 userId: username,
    //                 fromDate: fromDate,
    //                 toDate: toDate
    //             }
    //         });
    //         setExpenseData(response.data);
    //         setFilteredData(response.data);
    //         setApiError(false);
    //         setRefreshState(false);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         setApiError(true);
    //         setRefreshState(false);
    //     }
    // };

    // const handleSearch = (event) => {
    //     event.persist();
    //     setSearchString(event.target.value);
    //     const data = expenseData.filter(item =>
    //         item.title.toLowerCase().includes(searchString.toLowerCase())
    //     )
    //     setFilteredData(data);
    // }

    const handleRefresh = async () => {
        //setRefreshState(true);
        setCheckboxes([]);
        setSearchString("");
        await props.refetchVia(fromDate, toDate);
        //setRefreshState(false);
    }

    const handleUpdate = (event) => {
        const obj = expenseData.filter(item =>
            item.id.includes(checkboxes[0])
        )
        setNewTitle(obj[0].title);
        setNewAmount(obj[0].amount);
        setNewCategory(obj[0].category);
        setNewDate(formatDate(obj[0].date));
        setEditExpenseId(checkboxes[0]);
        setCheckboxes([]);
    }

    const handleCancel = async (event) => {
        setEditExpenseId("");
    }

    const handleDelete = (event) => {
        const obj = expenseData.filter(item =>
            item.id.includes(checkboxes[0])
        )
        setDeleteConfirmModel(true);
    }

    const handleCheckboxChange = (event) => {
        const { checked, dataset } = event.target;
        const idToggled = dataset.id;
        console.log(idToggled);
        if (checkboxes.includes(idToggled)) {
            const updatedCheckBoxIds = checkboxes.filter(item => item !== idToggled);
            setCheckboxes(updatedCheckBoxIds);
        } else {
            setCheckboxes((prevArray) => [...prevArray, idToggled]);
        }
    }

    const handleParentCheckBoxChange = (event) => {
        if (checkboxes.length === filteredData.length) {
            setCheckboxes((prevArray) => []);
        } else {
            filteredData.map((item, index) => {
                if (checkboxes.includes(item.id)) {

                } else {
                    setCheckboxes((prevArray) => [...prevArray, item.id]);
                }
            })
        }
    }

    const handleUpdateSubmit = async (e) => {
        await props.updateVia(editExpenseId, newTitle, newAmount, newDate, newCategory);
        setEditExpenseId("");
        await props.refetchVia(fromDate, toDate);
    }

    const handleDeleteConfirm = async (event) => {
        setDeleteModelLoading(true);
        console.log(checkboxes);
        await props.deleteVia(checkboxes);
        setExpenseData([]);
        setCheckboxes([]);
        setDeleteConfirmModel(false);
        setNewFetch(true);
        setTimeout(async () => {
            setDeleteModelLoading(false);
        }, 2000);
        await props.refetchVia(fromDate, toDate);
        setNewFetch(false);
    }


    const timeStampToDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());

        return `${day}-${month}-${year}`;
    }

    useEffect(() => {
        console.log("USE EFFECT CALLED");
        console.log("EXPENSE DATA");
        console.log(expenseData);
        const data = expenseData.filter(item =>
            item.title.toLowerCase().includes(searchString.toLowerCase())
        )
        const nonFilteredData = expenseData.filter(item =>
            !item.title.toLowerCase().includes(searchString.toLowerCase())
        )
        nonFilteredData.map((item, index) => {
            let updatedCheckBoxIds = checkboxes;
            if (checkboxes.includes(item.id)) {
                console.log(item.id + " has been checked and will be removed from the checkboxes")
                updatedCheckBoxIds = updatedCheckBoxIds.filter(val => val !== item.id);
            }
            console.log("UPDATED CHECKBOX IDS");
            console.log(updatedCheckBoxIds);
            setCheckboxes(updatedCheckBoxIds);
        })
        setFilteredData(data);
    }, [searchString, expenseData])

    useEffect(() => {
        setExpenseData(props.data);
    }, [props.isDataFetched])

    return (
        <Container style={{ border: '1px solid lightgray', marginTop: 0, zIndex: 'auto', marginLeft: '0px' }}>
            <Container style={{ marginTop: 20 }}>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-start'>
                            <Card style={{ border: 'none', color: 'inherit' }}>
                                <Card.Body style={{ padding: '0' }}>
                                    <Card.Title>Expenses</Card.Title>
                                    <Card.Text>
                                        <i>Add new expenses in the next tab</i>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div className='d-flex justify-content-end'>
                            <ButtonGroup size="small">

                                <Button disabled={(props.isUpdateApiDone === false) || (props.isDataFetched === false) || (props.isDeleteApiDone === false) ? true : editExpenseId !== "" ? true : false} onClick={handleRefresh}>Refresh</Button>
                                {
                                    editExpenseId === "" ? (<Button disabled={(props.apiError === true) || (props.updateApiError === true) || (props.deleteApiError === true) ? true : (props.isUpdateApiDone === false) || (props.isDataFetched === false) || (props.isDeleteApiDone === false) ? true : checkboxes.length === 1 ? false : true} onClick={handleUpdate}>Edit</Button>) : (<Button style={{ backgroundColor: '#f90', color: 'black' }} onClick={handleUpdateSubmit} disabled={(newTitle === null || newTitle.length < 3 || newTitle.length > 30) ? true : ((newAmount === null) || (newAmount == "") || (newAmount <= 0)) ? true : (newCategory === null || newCategory === "") ? true : (newDate === null || newDate.length == 0) ? true : false}>Update</Button>)
                                }
                                {
                                    editExpenseId === "" ? (<Button disabled={(props.apiError === true) || (props.updateApiError === true) || (props.deleteApiError === true) ? true : (props.isUpdateApiDone === false) || (props.isDataFetched === false) || (props.isDeleteApiDone === false) ? true : checkboxes.length > 0 ? false : true} onClick={handleDelete}>Delete</Button>) : (<Button style={{}} onClick={handleCancel}>Cancel</Button>)
                                }
                            </ButtonGroup>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className='mt-2'>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-start'>
                            <SearchField label="search" placeholder='Search with expense name' hasSearchButton={false} hasSearchIcon={true} style={{ width: 'auto' }} disabled={(editExpenseId !== "" || props.apiError === true || props.updateError === true || props.isDataFetched === false || props.isUpdateApiDone === false) ? true : false} value={searchString} onChange={(e) => { console.log(e.target.value); setSearchString(e.target.value) }} />
                        </div>
                    </Col>
                    <Col>
                        <div className='d-flex justify-content-end'>
                            <ButtonGroup size="small">
                                <TextField type='date' disabled={(props.isUpdateApiDone === false) || (props.isDataFetched === false) || (editExpenseId !== "") ? true : false} value={fromDate} onChange={(e) => { setFromDate(e.target.value) }} onBlur={() => { console.log(typeof fromDate); console.log(fromDate.length) }}></TextField>
                                <TextField type='date' disabled={(props.isUpdateApiDone === false) || (props.isDataFetched === false) || (editExpenseId !== "") ? true : false} value={toDate} onChange={(e) => { setToDate(e.target.value) }} onBlur={() => { console.log(typeof toDate); console.log(toDate.length) }}></TextField>
                                <Button style={{ backgroundColor: '#f90', color: 'black' }} disabled={(props.isUpdateApiDone === false) || (props.isDataFetched === false) ? true : ((fromDate.length === 0) || (toDate.length === 0)) ? true : (editExpenseId !== "") ? true : false} onClick={async () => { setFilteredData([]); await props.refetchVia(fromDate, toDate) }}>Filter</Button>
                            </ButtonGroup>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container style={{ marginBottom: 20 }}>
                <Table style={{ marginTop: 15 }}
                    caption=""
                    highlightOnHover={editExpenseId === ""}>
                    <TableHead>
                        <TableRow>
                            <TableCell as="th"><CheckboxField name="parent" value="yes" isIndeterminate={filteredData.length !== 0 && checkboxes.length !== 0 && filteredData.length !== checkboxes.length ? false : (checkboxes.length > 0) ? true : false} disabled={editExpenseId !== "" || refreshState || filteredData.length === 0} onChange={handleParentCheckBoxChange} checked={(refreshState === true) ? false : (filteredData.length === 0) ? false : (checkboxes.length === filteredData.length) ? true : false} /></TableCell>
                            <TableCell as="th">Name</TableCell>
                            <TableCell as="th">Amount</TableCell>
                            <TableCell as="th">Category</TableCell>
                            <TableCell as="th">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {refreshState === true || props.apiError === true || props.isDataFetched === false || props.isUpdateApiDone === false || props.updateApiError === true || props.isDeleteApiDone === false || props.deleteApiError === true ? (
                            <TableRow></TableRow>
                        ) : (
                            filteredData.map((item, index) => (
                                editExpenseId === "" || item.id !== editExpenseId ? (
                                    <TableRow>
                                        <TableCell>
                                            <CheckboxField name="check" value="yes" onChange={handleCheckboxChange} data-id={item.id} checked={checkboxes.includes(item.id) === true} disabled={editExpenseId !== ""}></CheckboxField>
                                        </TableCell>
                                        <TableCell data-id={item.id}>{item.title}</TableCell>
                                        <TableCell data-id={item.id}>{item.amount}</TableCell>
                                        <TableCell data-id={item.id}>{item.category}</TableCell>
                                        <TableCell data-id={item.id}>{timeStampToDate(item.date)}</TableCell>
                                    </TableRow>
                                ) : (
                                    <TableRow>
                                        <TableCell><CheckboxField disabled={true} /></TableCell>
                                        <TableCell><TextField size="small" value={newTitle} placeholder="Enter here" onChange={(e) => setNewTitle(e.target.value)} hasError={(newTitle === null || newTitle.length < 3 || newTitle.length > 30)} errorMessage={(newTitle.length < 3) ? "cannot have less than 3 characters" : (newTitle.length > 30) ? "cannot have more than 30 characters" : ""}></TextField></TableCell>
                                        <TableCell><TextField size="small" type='number' value={newAmount} placeholder="Enter here" onChange={(e) => setNewAmount(e.target.value)} hasError={(newAmount === null) || (newAmount == "") || (newAmount <= 0)} errorMessage={(newAmount === null || newAmount == "") ? "have to be a valid positive number" : (newAmount <= 0) ? "have to be a valid positive number" : ""}></TextField></TableCell>
                                        <TableCell><SelectField placeholder="Please select an option" value={newCategory} size='small' onChange={(e) => setNewCategory(e.target.value)} hasError={newCategory === null || newCategory === ""} errorMessage={(newCategory === null || newCategory === "") ? "please select a category" : ""}>
                                            <option children="Food" value="Food"></option>
                                            <option children="Groceries" value="Groceries"></option>
                                            <option children="Movies" value="Movies"></option>
                                            <option children="Shopping" value="Shopping"></option>
                                            <option children="Games" value="Games"></option>
                                            <option children="Rent" value="Rent"></option>
                                            <option children="Others" value="Others"></option>
                                        </SelectField>
                                        </TableCell>
                                        <TableCell><TextField size="small" type='date' value={newDate} onChange={(e) => setNewDate(e.target.value)} hasError={newDate === null || newDate.length == 0} errorMessage={(newDate === null || newDate.length == 0) ? "select a valid date" : ""}></TextField></TableCell>
                                    </TableRow>
                                )
                            )
                            )
                        )

                        }
                    </TableBody>
                </Table>
            </Container>
            {(props.isDataFetched === false || props.isDeleteApiDone === false || props.isUpdateApiDone === false) ? (
                <Container fluid style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}><Loader variation="linear" /></Container>
            ) : (props.apiError === true) ? (
                <Container fluid style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px', color: "red" }}><i>Error fetching expense details</i></Container>
            ) : (props.updateApiError === true) ? (
                <Container fluid style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px', color: "red" }}><i>Error updating the expense details</i></Container>
            ) : (props.deleteApiError === true) ? (
                <Container fluid style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px', color: "red" }}><i>Error deleting the selected expenses</i></Container>
            ) : (filteredData.length === 0 && deleteModelLoading === false) ? (
                <Container fluid style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}><i>No expense details found in the selected date range</i></Container>
            ) : (newFetch === true) ? (
                <Container fluid style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}><Loader variation="linear" /></Container>
            ) : (
                <></>
            )
            }
            <Modal title="All the selected expenses will be deleted" open={deleteConfirmModelOpen} onOk={handleDeleteConfirm} onCancel={() => { setDeleteConfirmModel(false) }} closable={false} confirmLoading={deleteModelLoading} cancelButtonProps={{ disabled: deleteModelLoading }}></Modal>
        </Container>
    )
}