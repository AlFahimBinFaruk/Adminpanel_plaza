import { MDBCol, MDBTable, MDBTableBody, MDBInput, MDBBtn } from "mdb-react-ui-kit";

import { Link, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useGetOrderDetailsQuery, useUpdateOrderMutation } from "../../services/order_api";

// Define validation schema using Yup
const validationSchema = Yup.object({
    order_status: Yup.string()
        .required("Order status is required")
});



export default function ManageOrder() {

    const params = useParams();
    const order_id = params.order_id;

    const { data: details, isLoading, error } = useGetOrderDetailsQuery(order_id);
    const [updateOrder]=useUpdateOrderMutation();

    

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const payload = { id:order_id, order_status: values.order_status };
            await updateOrder(payload).unwrap();
            resetForm();
        
            toast.success('Order status saved successfully');
        } catch (err) {
            console.error(err.data.msg);
            toast.error('Failed to save order status');
        }
    };


    if (isLoading) {
        return <>Loading..</>
    }
    if (error) {
        return <>Error fetching order</>
    }

    console.log("details ", details);
    return (
        
        <MDBCol size="12" lg="6" className="mx-auto">

            <h6 className="mb-4">Order Id: {order_id}</h6>
            <MDBTable>
                {/* table body */}
                <MDBTableBody>
                    {details.order_details && details.order_details.map((data, ind) => (
                        <tr className="verticle-align-middle text-dark">
                            {/* product image */}
                            <td>
                                <Link to={`/product-details/${data.product_id}`}>
                                <p>Product Link</p>
                                </Link>
                            </td>
                            {/* name */}
                            <td>
                                <span className="fw-bold">Shirt</span>
                                <br />
                                <span className="fw-bold">Color: {data.color}</span>
                            </td>
                            {/* price */}
                            <td>
                                <span className="fw-bold">Price: Tk {data.price}</span>
                            </td>
                            <td>
                                <div className="d-flex justify-content-evenly align-items-center">
                                    {/* manage qty */}
                                    <div className="qty d-flex align-items-center me-3">

                                        <div className="mx-3 my-1 my-lg-0">
                                            <h6 className="mb-0">Qty: {data.qty}</h6>
                                        </div>

                                    </div>

                                </div>
                            </td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>
            <div className="my-5">
                <h6>
                    <span className="text-muted">Total:</span>Tk {details.subtotal}
                </h6>
                <h6>
                    <span className="text-muted"> order status:</span>
                    {details.order_status}
                </h6>
                <h6>
                    <span className="text-muted">payment status:</span>
                    {details.transaction_id.length>0 ? "Success "+ details.transaction_id : "Pending"}
                </h6>
                <h6>
                    <span className="text-muted">order type:</span>
                    COD
                </h6>
                <h6>
                    <span className="text-muted">address:</span>
                    {details.address}
                </h6>
                <h6>
                    <span className="text-muted">email:</span>
                    {details.user.email}
                </h6>
            </div>

            {/* if we don't have tran id yet we will show this otherwise we will show the tran id */}
            <Formik
                initialValues={{ order_status: details.order_status }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <small>Update Order status </small>
                        <Field
                            as={MDBInput}
                            type="text"
                            id="order_status"
                            name="order_status"
                            wrapperClass="mb-2"
                            label="Transaction ID"
                            size="sm"
                        />
                        <ErrorMessage name="order_status" component="div" className="text-danger mb-2" />
                        <MDBBtn type="submit" block size="sm">Save</MDBBtn>
                    </Form>
                )}
            </Formik>


        </MDBCol>
    );
};

