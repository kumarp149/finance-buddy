import { Table, TableBody, TableCell, TableRow, TableHead } from '@aws-amplify/ui-react';
import Container from 'react-bootstrap/Container';
import { Row, Col, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { SearchField } from '@aws-amplify/ui-react';
import { Button, ButtonGroup } from '@aws-amplify/ui-react';


export default function ExpenseTable() {
    return (
        <Container style={{ border: '1px solid lightgray', marginTop: 2, zIndex: 'auto' }}>
            <Container style={{marginTop: 20}}>
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
                            {/* <Row>
                                <Col>
                                    <Button>Click</Button>
                                </Col>
                                <Col>
                                    <Button>Click</Button>
                                </Col>
                                <Col>
                                    <Button>Click</Button>
                                </Col>
                            </Row> */}
                            <ButtonGroup size="small">
                                <Button>Refresh</Button>
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                            </ButtonGroup>

                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className='mt-2'>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-start'>
                            <SearchField label="search" placeholder='Search with expense name' hasSearchButton={false} hasSearchIcon={true}/>
                        </div>
                        <div className='d-flex justify-content-end'>

                        </div>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Table
                    caption=""
                    highlightOnHover={true}>
                    <TableHead>
                        <TableRow>
                            <TableCell as="th">Citrus</TableCell>
                            <TableCell as="th">Stone Fruit</TableCell>
                            <TableCell as="th">Berry</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Orange</TableCell>
                            <TableCell>Nectarine</TableCell>
                            <TableCell>Raspberry</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Grapefruit</TableCell>
                            <TableCell>Apricot</TableCell>
                            <TableCell>Blueberry</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Lime</TableCell>
                            <TableCell>Peach</TableCell>
                            <TableCell>Strawberry</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Container>
        </Container>
    )
}