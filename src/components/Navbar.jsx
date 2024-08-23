import React, { useState } from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem,
} from 'mdb-react-ui-kit';

export default function Navbar() {
    const [openNavRight, setOpenNavRight] = useState(false);

    const handleLogout=()=>{
        localStorage.removeItem("token");
        window.location.assign("/login");
    }

    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <div className="ms-auto">
                <MDBContainer fluid>
                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarRightAlignExample'
                        aria-controls='navbarRightAlignExample'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setOpenNavRight(!openNavRight)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar center open={openNavRight}>
                        <MDBNavbarNav fullWidth={false} className='mb-2 mb-lg-0'>
                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' href='#'>
                                    Profile
                                </MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' onClick={handleLogout}>
                                    Logout
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            

                            
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </div>
        </MDBNavbar>
    );
}