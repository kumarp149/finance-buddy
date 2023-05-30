import React, { useEffect, useState } from 'react';

import { Route, useHistory } from 'react-router-dom';

import { Table, TableBody, TableCell, TableRow, TableHead, Loader } from '@aws-amplify/ui-react';
import Container from 'react-bootstrap/Container';
import { Row, Col, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { SearchField } from '@aws-amplify/ui-react';
import { Button, ButtonGroup } from '@aws-amplify/ui-react';
import { CheckboxField, TextField } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';

import axios from 'axios';


export default function ExpenseTable() {
    const [expenseData, setExpenseData] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    //const [userId, setUserId] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [refreshState, setRefreshState] = useState(false);
    const [editExpenseId, setEditExpenseId] = useState("");
    const [checkboxes, setCheckboxes] = useState([]);



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
            console.log(username);
            const response = await axios.get('/api/expenses/fetch', {
                params: {
                    userId: username,
                    fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    toDate: new Date()
                }
            });
            console.log(typeof response.data);
            console.log(JSON.stringify(response.data));
            console.log(response.data[0]);
            setExpenseData(response.data);
            setApiError(false);
            setRefreshState(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setApiError(true);
            setRefreshState(false);
        }
    };

    const handleSearch = (event) => {
        setSearchString(event.target.value);
        const filteredData = expenseData.filter((item) => {
            item.name.toLowerCase().includes(searchString);
        })
        setExpenseData(filteredData);
    }

    const handleRefresh = () => {
        setRefresh(!refresh);
    }

    const handleUpdate = (event) => {

    }

    const handleCancel = async (event) => {
        setEditExpenseId("");
        await fetchData();
    }

    const handleCheckboxChange = (event) => {
        const { checked, dataset } = event.target;
        const customValue = dataset.id;
        console.log(customValue);
    }


    const timeStampToDate = (timestamp) => {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
        return formattedDate;

    }





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

                                <Button disabled={editExpenseId === "" ? false : true} onClick={handleRefresh}>Refresh</Button>
                                {
                                    editExpenseId === "" ? (<Button disabled={apiError}>Edit</Button>) : (<Button style={{ backgroundColor: '#f90', color: 'black' }} onClick={() => { console.log("CLICKED ON UPDATE") }}>Update</Button>)
                                }
                                {
                                    editExpenseId === "" ? (<Button disabled={true}>Delete</Button>) : (<Button style={{}} onClick={handleCancel}>Cancel</Button>)
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
                            <SearchField label="search" placeholder='Search with expense name' hasSearchButton={false} hasSearchIcon={true} style={{ width: 'auto' }} disabled={editExpenseId === "" ? false : true} />
                        </div>
                    </Col>
                    <Col>
                        <div className='d-flex justify-content-end'>
                            <ButtonGroup size="small">
                                <TextField type='date' disabled={editExpenseId === "" ? false : true}></TextField>
                                <TextField type='date' disabled={editExpenseId === "" ? false : true}></TextField>
                                <Button style={{ backgroundColor: '#f90', color: 'black' }} disabled={editExpenseId === "" ? false : true}>Filter</Button>
                            </ButtonGroup>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Table style={{ marginTop: 15 }}
                    caption=""
                    highlightOnHover={true}>
                    <TableHead>
                        <TableRow>
                            <TableCell as="th"><CheckboxField name="subscribe" value="yes" isIndeterminate={true} disabled={refreshState || refresh} /></TableCell>
                            <TableCell as="th">Name</TableCell>
                            <TableCell as="th">Amount</TableCell>
                            <TableCell as="th">Category</TableCell>
                            <TableCell as="th">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {refreshState === true ? (
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell><Loader /></TableCell>
                                <TableCell><Loader /></TableCell>
                                <TableCell><Loader /></TableCell>
                                <TableCell><Loader /></TableCell>
                            </TableRow>
                        ) : apiError === true ? (
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell style={{ color: 'red' }}>API ERROR</TableCell>
                                <TableCell style={{ color: 'red' }}>API ERROR</TableCell>
                                <TableCell style={{ color: 'red' }}>API ERROR</TableCell>
                                <TableCell style={{ color: 'red' }}>API ERROR</TableCell>
                            </TableRow>
                        ) : (
                            expenseData.map((item, index) => (
                                <TableRow>
                                    <TableCell>
                                        <CheckboxField name="check" value="yes" onChange={handleCheckboxChange} data-id={item.id}></CheckboxField>
                                    </TableCell>
                                    <TableCell data-id={item.id}>{item.name}</TableCell>
                                    <TableCell data-id={item.id}>{item.amount}</TableCell>
                                    <TableCell data-id={item.id}>{item.category}</TableCell>
                                    <TableCell data-id={item.id}>{timeStampToDate(item.date)}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Container>
        </Container>
    )
}