import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";

export default function Alert(){
    return(
        <div className="vh-100 d-flex justify-content-center align-items-center bg-none">
        <MDBCard className="w-25 border border-danger">
            <MDBCardBody>
                <h6>Alert!!!</h6>
            </MDBCardBody>
        </MDBCard>
        </div>
    )
}