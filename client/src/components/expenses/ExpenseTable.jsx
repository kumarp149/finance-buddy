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


export default function ExpenseTable() {

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


    const [expenseData, setExpenseData] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [fromDate, setFromDate] = useState(firstDayOfMonth());
    const [toDate, setToDate] = useState(currentDate());
    const [refresh, setRefresh] = useState(false);
    const [refreshState, setRefreshState] = useState(false);
    const [editExpenseId, setEditExpenseId] = useState("");
    const [checkboxes, setCheckboxes] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [newTitle, setNewTitle] = useState("");
    const [newAmount, setNewAmount] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [newDate, setNewDate] = useState("");
    const [updateStatus, setUpdateStatus] = useState("");
    const [modelOpen,setModelOpen] = useState(false);
    const [deleteStatus,setDeleteStatus] = useState(false);
    const [deleteStatusApi,setDeleteStatusApi] = useState(false);


    const history = useHistory();

    // const fetchUserId = async () => {
    //     try {
    //         const user = await Auth.currentAuthenticatedUser();
    //         const { username } = user;
    //         console.log('username is ' + username);
    //         setUserId(username);
    //     } catch (error) {
    //         history.push('/');
    //     }
    //}

    const fetchData = async () => {
        setRefreshState(true);
        try {
            const user = await Auth.currentAuthenticatedUser();
            console.log(user);
            const { username } = user;
            const response = await axios.get('/api/expenses/fetch', {
                params: {
                    userId: username,
                    fromDate: fromDate,
                    toDate: toDate
                }
            });
            setExpenseData(response.data);
            setFilteredData(response.data);
            setApiError(false);
            setRefreshState(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setApiError(true);
            setRefreshState(false);
        }
    };

    const handleSearch = (event) => {
        event.persist();
        setSearchString(event.target.value);
        const data = expenseData.filter(item =>
            item.title.toLowerCase().includes(searchString.toLowerCase())
        )
        setFilteredData(data);
    }

    const handleRefresh = () => {
        setRefresh(!refresh);
        setCheckboxes([]);
        setSearchString("");
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
        await fetchData();
    }

    const handleDelete = (event) => {
        const obj = expenseData.filter(item =>
            item.id.includes(checkboxes[0])
        )
        setDeleteStatus(true);
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
        try {
            const user = await Auth.currentAuthenticatedUser();
            setRefreshState(true);
            try {
                setUpdateStatus("Successfully updated the expense details");
                const response = await axios.post('/api/expenses/update', {
                    expenseId: editExpenseId,
                    expenseName: newTitle,
                    expenseAmount: newAmount,
                    expenseDate: newDate,
                    expenseCategory: newCategory
                })
                console.log(response);
                await fetchData();
                setEditExpenseId("");
                setUpdateStatus("");
            } catch (error) {
                setUpdateStatus("Error updating the expense details, try again later");
                await fetchData();
                setEditExpenseId("");
                setUpdateStatus("");
            }
        } catch (error) {
            history.push('/auth');
        }
    }

    const handleDeleteConfirm = async(event) => {
        console.log(checkboxes);
        setDeleteStatus(false);
        try {
            const user = await Auth.currentAuthenticatedUser();
            setRefreshState(true);
            try {
                setDeleteStatusApi("Successfully deleted the selected expenses");
                const response = await axios.post('/api/expenses/delete',{
                    expenseIds: checkboxes
                })
                console.log(response);
                await fetchData();
                setDeleteStatus("");
            } catch (error) {
                setDeleteStatusApi("Error deleting the selected expenses");
                await fetchData();
                setDeleteStatusApi("");
            }
        } catch (error) {
            history.push('/auth');
        }
    }


    const timeStampToDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());

        return `${day}-${month}-${year}`;
    }

    useEffect(() => {
        const data = expenseData.filter(item =>
            item.title.toLowerCase().includes(searchString.toLowerCase())
        )
        const nonFilteredData = expenseData.filter(item =>
            !item.title.toLowerCase().includes(searchString.toLowerCase())
        )
        console.log(data);
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
    }, [searchString])

    useEffect(() => {
        fetchData();
    }, [refresh])

    return (
        <Container style={{ border: '1px solid lightgray', marginTop: 2, zIndex: 'auto' }}>
            <Container style={{ marginTop: 20 }}>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-start'>
                            <Card style={{ border: 'none' }}>
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

                                <Button disabled={refreshState === true ? true : editExpenseId !== "" ? true : false} onClick={handleRefresh}>Refresh</Button>
                                {
                                    editExpenseId === "" ? (<Button disabled={apiError ? true : refreshState === true ? true : checkboxes.length === 1 ? false : true} onClick={handleUpdate}>Edit</Button>) : (<Button style={{ backgroundColor: '#f90', color: 'black' }} onClick={handleUpdateSubmit} disabled={(newTitle === null || newTitle.length < 3 || newTitle.length > 30) ? true : ((newAmount === null) || (newAmount == "") || (newAmount <= 0)) ? true : (newCategory === null || newCategory === "") ? true : (newDate === null || newDate.length == 0) ? true : false}>Update</Button>)
                                }
                                {
                                    editExpenseId === "" ? (<Button disabled={apiError ? true : refreshState === true ? true : checkboxes.length > 0 ? false : true} onClick={handleDelete}>Delete</Button>) : (<Button style={{}} onClick={handleCancel}>Cancel</Button>)
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
                            <SearchField label="search" placeholder='Search with expense name' hasSearchButton={false} hasSearchIcon={true} style={{ width: 'auto' }} disabled={(editExpenseId !== "" || refreshState === true) ? true : false} value={searchString} onChange={(e) => { console.log(e.target.value); setSearchString(e.target.value) }} />
                        </div>
                    </Col>
                    <Col>
                        <div className='d-flex justify-content-end'>
                            <ButtonGroup size="small">
                                <TextField type='date' disabled={(refreshState === true) ? true : editExpenseId === "" ? false : true} value={fromDate} onChange={(e) => { setFromDate(e.target.value) }} onBlur={() => { console.log(typeof fromDate); console.log(fromDate.length) }}></TextField>
                                <TextField type='date' disabled={(refreshState === true) ? true : editExpenseId === "" ? false : true} value={toDate} onChange={(e) => { setToDate(e.target.value) }} onBlur={() => { console.log(typeof toDate); console.log(toDate.length) }}></TextField>
                                <Button style={{ backgroundColor: '#f90', color: 'black' }} disabled={(refreshState === true) ? true : ((fromDate.length === 0) || (toDate.length === 0)) ? true : (editExpenseId !== "") ? true : false} onClick={async () => { await fetchData() }}>Filter</Button>
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
                            <TableCell as="th"><CheckboxField name="subscribe" value="yes" isIndeterminate={((filteredData.length !== 0) && (checkboxes.length === filteredData.length)) ? false : (checkboxes.length > 0) ? true : false} disabled={editExpenseId !== "" || refreshState || filteredData.length === 0} onChange={handleParentCheckBoxChange} checked={(refreshState === true) ? false : (filteredData.length === 0) ? false : (checkboxes.length === filteredData.length) ? true : false} /></TableCell>
                            <TableCell as="th">Name</TableCell>
                            <TableCell as="th">Amount</TableCell>
                            <TableCell as="th">Category</TableCell>
                            <TableCell as="th">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {refreshState === true ? (
                            <TableRow>
                                {/* <TableCell></TableCell>
                                <TableCell><Loader /></TableCell>
                                <TableCell><Loader /></TableCell>
                                <TableCell><Loader /></TableCell>
                                <TableCell><Loader /></TableCell> */}
                            </TableRow>
                        ) : apiError === true ? (
                            <TableRow>
                                {/* <TableCell></TableCell>
                                <TableCell style={{ color: 'red' }}>API ERROR</TableCell>
                                <TableCell style={{ color: 'red' }}>API ERROR</TableCell>
                                <TableCell style={{ color: 'red' }}>API ERROR</TableCell>
                                <TableCell style={{ color: 'red' }}>API ERROR</TableCell> */}
                            </TableRow>
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
                                        <TableCell><CheckboxField disabled={true}/></TableCell>
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
                        )}
                    </TableBody>
                </Table>
            </Container>
            {(refreshState === true && updateStatus === "") ? (
                <Container fluid style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}><Loader variation="linear" /></Container>
            ) : refreshState === true && updateStatus !== "" ? (
                <>
                    <Container fluid style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}><Loader variation="linear" /></Container>
                    <Container fluid style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px', color: updateStatus.includes("Error") ? "red" : "green" }}> {updateStatus}</Container>
                </>
            ) : refreshState === true && deleteStatusApi !== "" ? (
                <>
                    <Container fluid style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}><Loader variation="linear" /></Container>
                    <Container fluid style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px', color: deleteStatusApi.includes("Error") ? "red" : "green" }}> {deleteStatusApi}</Container>
                </>
            ) : (apiError === true) ? (
                <Container fluid style={{ textAlign: 'center', color: '#ff0000', marginTop: '10px', marginBottom: '10px' }}>Error Fetching Data</Container>
            ) : (filteredData.length === 0) ? (
                <Container fluid style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}> No expenses found in the select date range</Container>
            ) : (
                <></>
            )}
            <Modal title="All the selected expenses will be deleted" open={deleteStatus} onOk={handleDeleteConfirm} onCancel={() => {setDeleteStatus(!deleteStatus)}}></Modal>
        </Container>
    )
}