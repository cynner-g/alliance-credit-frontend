import React, { userState, useEffect, useState } from 'react'
import Header from "../../components/header"
import { useRouter } from "next/router"
import { parseCookies } from "nookies";
// import Pagination from "../../components/datatable/pagination"
import { Col, Modal, Row } from 'react-bootstrap';
import DynamicTable from '../../components/DynamicTable';

const UPLOADING = 1;
const UPLOADED = 2;
const ERROR = 3;

const LegalUploads = (props) => {
    const router = useRouter()
    // const limit = 3
    // const lastPage = Math.ceil(totalPage / limit)

    const [pageData, setPageData] = useState(props?.data?.data);
    const [legalFile, setLegalFile] = useState(null);
    const [type, setType] = useState(null);
    const [region, setRegion] = useState(null);
    const [language, setLanguage] = useState(null);


    const [upload, showUpload] = useState(false)

    const fetchData = async () => {
        //code to load data fresh from API
        const res = await fetch(`${process.env.API_URL}/report/list-legal-upload`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "api_token": token
            })

        })
        const resData = await res.json()
    }

    const deleteClick = async (event, columnName, row) => {
        //code to send delete request to API
        let uploadID = row._id;
        let token = Cookies.get('token');

        let body = {
            api_token: token,
            legal_upload_id: uploadID
        }

        const res = await fetch(`${process.env.API_URL}/report/list-legal-upload`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })

        fetch_data();
    }

    const getBadgeCss = (type) => {

        switch (type) {
            case 'Uploaded': return 'success'; break;
            case 'Uploading': return 'info'; break;
            case 'Error': return 'error'; break;
        }
    }

    const columns = [{
        colName: "reference_id",
        displayName: "File Ref. Id",
        editable: false,
        visible: true,
        addable: false,
    },
    {
        colName: "legal_report_type",
        displayName: "File Type",
        editable: false,
        required: false,
        visible: true,
        addable: false,
    },
    {
        colName: "language",
        displayName: "Language",
        editable: false,
        required: false,
        visible: true,
        addable: false,
        defaultVal: null
    },
    {
        colName: "status",
        displayName: "Status",
        type: "badge",
        styleFn: getBadgeCss,
        styleParam: "status",
        editable: false,
        required: false,
        visible: true,
        addable: false,
        defaultVal: null
    },
    {
        colName: "upload_date",
        displayName: "Upload Date",
        type: 'date',
        timeSize: 9,
        timeLocation: 'below',
        editable: false,
        required: false,
        visible: true,
        addable: false,
        defaultVal: null
    },
    {
        colName: "compare_date",
        displayName: "Compared to Watchlist",
        editable: false,
        required: false,
        type: 'date',
        timeSize: 9,
        timeLocation: 'below',
        visible: true,
        addable: false,
        defaultVal: null
    },
    {
        colName: "sis_count",
        displayName: "SIS Count",
        editable: false,
        required: false,
        visible: true,
        addable: false,
        defaultVal: null
    }, {
        colName: "clr_count",
        displayName: "CLR Count",
        editable: false,
        required: false,
        visible: true,
        addable: false,
        defaultVal: null
    }, {
        colName: "bkr_count",
        displayName: "Bankruptcy Count",
        editable: false,
        required: false,
        visible: true,
        addable: false,
        defaultVal: null
    }, {
        colName: "jlr_count",
        displayName: "Hypotech Count",
        editable: false,
        required: false,
        visible: true,
        addable: false,
        defaultVal: null
    },
    {
        colName: "actions",
        displayName: "Actions",
        onClick: deleteClick,
        buttonText: 'Remove',
        type: 'button',
        editable: false,
        required: false,
        visible: true,
        addable: false,
        defaultVal: null
    },

    ]

    const uploadFile = (e) => {
        setLegalFile(e.target.files[0])
    }

    const startUpload = async () => {
        let token = cookies.g
        const formData = new FormData();
        formData.append('report_type', type);
        formData.append('region', region);
        formData.append('language', language);
        formData.append('api_token', token);
        formData.append('legal_file', legalFile)
        let body = formData


        const addCompanyDB = await fetch(`https://dev.alliancecredit.ca/report/upload-legal-report`, {
            method: "POST",
            headers: {
                contentType: false,
            },
            body: formData
        })

        fetchData();

    }


    useEffect(() => {
        // let data = [
        //     {
        //         refId: 'L123',
        //         fileType: 'Commercial Law Record',
        //         language: 'French',
        //         status: 'Uploaded',
        //         uploadTime: '09/23/2021 11:35 AM',
        //         comparedToWatchlist: '09/23/2021 11:35 AM',
        //         sisCount: "0",
        //         clrCount: 56,
        //         bankruptcyCount: "0",
        //         hypotechCount: "0"
        //     },
        //     {
        //         refId: 'L122',
        //         fileType: 'Bankruptcy',
        //         language: 'English',
        //         status: 'Uploaded',
        //         uploadTime: '07/09/2021 11:35 AM',
        //         comparedToWatchlist: '08/09/2021 11:35 AM',
        //         sisCount: "0",
        //         clrCount: "0",
        //         bankruptcyCount: 21,
        //         hypotechCount: "0"
        //     },
        //     {
        //         refId: 'L121',
        //         fileType: 'Hyptotech',
        //         language: 'English',
        //         status: 'Uploaded',
        //         uploadTime: '07/09/2021 11:35 AM',
        //         comparedToWatchlist: '07/09/2021 11:35 AM',
        //         sisCount: "0",
        //         clrCount: "0",
        //         bankruptcyCount: "0",
        //         hypotechCount: 10
        //     },
        //     {
        //         refId: 'L121',
        //         fileType: 'Special Information Sheet',
        //         language: 'Both',
        //         status: 'Uploaded',
        //         uploadTime: '07/09/2021 11:35 AM',
        //         comparedToWatchlist: '08/09/2021 11:35 AM',
        //         sisCount: 10,
        //         clrCount: "0",
        //         bankruptcyCount: "0",
        //         hypotechCount: "0"
        //     },
        // ]
        // setPageData(data);
    }, [])

    return (
        <>
            <Modal
                show={upload}
                onHide={() => showUpload(false)}
                backdrop="static">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label htmlFor='legalType'>Legal Type</label>
                            <select onChange={e => setType(e.target.value)} id='legalType'>
                                <option value='Bankruptcy'>Bankruptcy</option>
                                <option value='Commercial Law Record'>Commercial Law Record</option>
                                <option value='Hypotech'>Hypotech</option>
                                <option value='Special Information Sheet'>Special Information Sheet</option>
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label htmlFor='region'>Region</label>
                            <select onChange={e => setRegion(e.target.value)} id='region'>
                                <option value='Eastern'>Eastern</option>
                                <option value='Central'>Central</option>
                                <option value='Western'>Western</option>
                                <option value='USA'>USA</option>
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label htmlFor='language'>Language</label>
                            <select onChange={e => setLanguage(e.target.value)} id='language'>
                                <option value='English'>English</option>
                                <option value='French'>French</option>
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label for='customFile' className='btn btn-primary'>Select Legal File</label><span>{legalFile?.name}</span>
                            <input type="file" className="form-control" style={{ visibility: 'hidden' }} id="customFile" onChange={e => this.uploadFile(e)} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-outline-primary" onClick={() => showUpload(false)}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={startUpload}>
                        Update Status
                    </button>
                </Modal.Footer>
            </Modal>


            <Header />
            <div className="bottom_gap">
                <button className="btn legal_upload">Legal Uploads</button>
            </div>

            {/* <table id="example" className="table table-striped">
                <thead>
                    <tr>
                        <th>File Ref. Id</th>
                        <th>Position</th>
                        <th>Office</th>
                        <th>Age</th>
                        <th>Start date</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Tiger Nixon</td>
                        <td>System Architect</td>
                        <td>Edinburgh</td>
                        <td>61</td>
                        <td>2011/04/25</td>
                        <td>$320,800</td>
                    </tr>
                </tbody>
            </table>
            <Pagination page={page} totalPage={totalPage} lastPage={lastPage} /> */}
            <div className="listing">
                <DynamicTable data={pageData} columns={columns} />
            </div>
        </>
    )
}

/**
 *
 *
 * @export
 * @param {*} { query: { page = 1, data = null, totalPage = 10 } }
 * @return {*} 
 */
export async function getServerSideProps(ctx) {
    const { token } = parseCookies(ctx)
    const res = await fetch(`${process.env.API_URL}/report/list-legal-upload`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "api_token": token,
        })

    })
    const resData = await res.json()


    /** 
     * limit, start, search item
     */
    return {
        props: {
            data: resData
        }
    }

}

export default LegalUploads