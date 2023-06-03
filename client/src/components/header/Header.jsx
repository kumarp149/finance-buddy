import React from "react";
import "./Header.css";
import { Flex } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";
import HeaderNav from './HeaderNav'



const Header = () => {
  return (
    <div className="header" style={{backgroundColor: '#212529'}}>
      <Flex
        direction="row"
        alignItems="center"
        wrap="nowrap"
        gap="1rem"
        justifyContent="space-between"
        style={{height: '100%'}}
      >
        <div className="header-left">
          <div className="header-logo">
            <span style={{color: 'white'}}>Welcome</span>
          </div>
        </div>

        <div className="header-right">
          <HeaderNav />
        </div>
      </Flex>
    </div>
  );
};

export default Header;