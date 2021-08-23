import React, { useState } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

export const setUserAtom = atom({
  key: "setUserAtom",
  default: "",
});

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selUser, setSelUser] = useRecoilState(setUserAtom);
  const toggle = () => setIsOpen(!isOpen);

  const handleUser = (e) => {
    setSelUser(e.target.name);
  };
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">eight sleep</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                User List
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem name="1" onClick={handleUser}>
                  User 1
                </DropdownItem>
                <DropdownItem name="2" onClick={handleUser}>
                  User 2
                </DropdownItem>
                <DropdownItem name="3" onClick={handleUser}>
                  User 3
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
