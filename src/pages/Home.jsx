import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";

export default function Home(){
    return(
        <div className="home d-flex justify-content-between flex-wrap">
            <MDBCard className="w-25 border border-primary m-1">
                <MDBCardBody>
                    <h6>3653 Users</h6>
                </MDBCardBody>
            </MDBCard>
            <MDBCard className="w-25 border border-primary m-1">
                <MDBCardBody>
                    <h6>365 Products</h6>
                </MDBCardBody>
            </MDBCard>
            <MDBCard className="w-25 border border-primary m-1">
                <MDBCardBody>
                    <h6>34k profit</h6>
                </MDBCardBody>
            </MDBCard>
            <MDBCard className="w-25 border border-primary m-1">
                <MDBCardBody>
                    <h6>342 success orders</h6>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
}