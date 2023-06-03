import React from "react";
import { Menu, MenuItem, MenuButton, Link } from "@aws-amplify/ui-react";
import { useHistory } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { baseConfig } from "../../config";
import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { faGear, faRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  MdOutlineLogout
} from "react-icons/md";
import { Icon } from "@aws-amplify/ui-react";

const HeaderNav = () => {
  const history = useHistory();
  return (
    <>
      {/* <Menu
        menuAlign="end"
        trigger={
          <MenuButton variation="menu">
            <div className="header-avatar">
              <img alt="avatar" src={"https://i.pravatar.cc/150?img=3"}></img>
            </div>
          </MenuButton>
        }
      >
        <MenuItem onClick={() => history("/profile")}>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem><Icon>MdOutlineLogout</Icon></MenuItem>
      </Menu> */}
      <Row style={{ color: 'white' }}>
        <Col><OverlayTrigger placement='bottom' overlay={<Tooltip>Settings</Tooltip>}><FontAwesomeIcon icon={faGear} style={{ cursor: 'pointer' }} /></OverlayTrigger></Col>
        <Col><OverlayTrigger placement='bottom' overlay={<Tooltip>Logout</Tooltip>}><FontAwesomeIcon icon={faRightFromBracket} style={{ cursor: 'pointer' }} /></OverlayTrigger></Col>
      </Row>
    </>
  );
};

export default HeaderNav;