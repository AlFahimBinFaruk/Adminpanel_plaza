import { MDBBtn, MDBInput, MDBTextArea, MDBIcon } from "mdb-react-ui-kit";

export default function UpdateProduct() {
    return (
        <div className="update-product w-50 m-auto mt-5">
            <h6 className="text-center mb-4">Update product</h6>
            <form>
                <MDBInput type="text" label="Product Name" className="mb-3" />

                <div className="mb-3">
                    <p className="mb-0 small">Select Category</p>
                    <select name="category" id="category" form="categoryform" className="form-control select-input placeholder-active active">
                        <option value="shirt">shirt</option>
                        <option value="top">top</option>
                    </select>
                </div>

                <MDBInput type="number" label="Product price" className="mb-3" />

                <div className="mb-3">
                    <p className="mb-0 small">Product image</p>

                    <div className="my-3 d-flex justify-content-around align-items-center">
                        <img
                            src='https://mdbootstrap.com/img/new/standard/city/041.webp'
                            className='w-50'
                            alt='...'
                        />
                        <MDBIcon far icon="trash-alt" color="danger" />
                    </div>
                    {/* <MDBInput type="file" /> */}
                </div>

                <div className="mb-3">
                    <p className="mb-0 small">Product Color</p>
                    <MDBInput type="text" placeholder="[[color,qty]]" />
                </div>

                <div className="mb-3">
                    <p className="mb-0 small">Product Size</p>
                    <MDBInput type="text" placeholder="[XL,M,L,XM,SM]" />
                </div>

                <MDBTextArea type="text" rows={5} label="Product description" className="mb-3" />

                <MDBBtn block>Update Product</MDBBtn>

            </form>
        </div>
    )
}