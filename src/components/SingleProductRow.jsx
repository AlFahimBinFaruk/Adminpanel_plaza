import { MDBIcon } from "mdb-react-ui-kit"

export default function SingleProductRow() {
    return (
        <tr>
            <td>
                <div className='d-flex align-items-center'>
                    <img
                        src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                        alt=''
                        style={{ width: '45px', height: '45px' }}
                        className='rounded-circle'
                    />
                    <div className='ms-3'>
                        <p className='fw-bold mb-1 product-name'>Basic Training T-shirt</p>
                        <p className='text-muted mb-0 product-category'>men,shirts</p>
                    </div>
                </div>
            </td>
            <td>
                <p className='fw-normal mb-1 small'>Green: 23</p>
                <p className='fw-normal mb-1 small'>Red: 3</p>


            </td>
            <td>
                <p className='fw-bold mb-1 product-name'>450 tk</p>
            </td>

            <td>
                <MDBIcon far icon="edit" role="button" className="me-2" color="warning" />
                <MDBIcon far icon="trash-alt" role="button" color="danger" />
            </td>
        </tr>
    )
}