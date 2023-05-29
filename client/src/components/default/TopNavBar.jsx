import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { faGear, faRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Route, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

function TopNavBar(props) {

  const history = useHistory();

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      history.push('/auth');
      // Perform any additional logout-related actions or redirects
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  const handleSettings = async () => {
    history.push('/hello');
  }

  return (
    <Navbar style={{padding: '0', height: '60px'}}>
      <Container fluid style={{backgroundColor: '#212529', margin: 'auto', height: '100%'}}>
        <Navbar.Text style={{color: 'white'}}><FontAwesomeIcon icon={faBars} style={{cursor: 'pointer'}} onClick={props.onClick}/></Navbar.Text>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={{color: 'white'}}>
            <Row>
              <Col><OverlayTrigger placement='bottom' overlay={<Tooltip>Settings</Tooltip>}><FontAwesomeIcon onClick={handleSettings} icon={faGear} style={{cursor: 'pointer'}}/></OverlayTrigger></Col>
              <Col><OverlayTrigger placement='bottom' overlay={<Tooltip>Logout</Tooltip>}><FontAwesomeIcon onClick={handleLogout} icon={faRightFromBracket} style={{cursor: 'pointer'}}/></OverlayTrigger></Col>
            </Row>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavBar;