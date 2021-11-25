import Header from "../../components/header";
import { useState, Component } from 'react';
import { Row, Col, Container, Modal } from 'react-bootstrap';
import Select from 'react-select';
import DynamicTable from '../../components/DynamicTable';
import styles from "./index.module.css";

const LISTS = 0;
const COMPANIES = 1;
const EMAILS = 2;
const BULK = 3;

class LegalWatchlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watchedCompanies: [],
            watchLists: [],
            tmpWatched: [],
            currentPage: COMPANIES,
            currentWatchlist: null,
            showCreate: false,
            showAdd: false,
            data: [],
            newCompany: {
                name: "",
                refNum: "",
                provinces: {
                    ON: false,
                    QC: false,
                    NS: false,
                    NB: false,
                    MB: false,
                    BC: false,
                    PE: false,
                    SK: false,
                    AB: false,
                    NL: false,
                    NT: false,
                    YT: false,
                    NU: false
                }
            }
        }
    }

    resetNewCompany = () => {
        this.setState({
            newCompany: {
                name: "",
                refNum: "",
                provinces: {
                    ON: false,
                    QC: false,
                    NS: false,
                    NB: false,
                    MB: false,
                    BC: false,
                    PE: false,
                    SK: false,
                    AB: false,
                    NL: false,
                    NT: false,
                    YT: false,
                    NU: false
                }
            }
        })
    }
    componentDidMount() {
        //get watchList from API
        let wl = [
            {
                _id: "abcd",
                reference_id: "LW123",
                company_name: "Krabby Patty Pvt. Ltd.",
                date_added: "2021-09-23T11:35:00",
                provinces: ["AB", "MB", "BC", "NB", "NL", "ON", "QC"],
                flagged: 7,
                watchlist: 0
            },
            {
                _id: "def",
                reference_id: "LW122",
                company_name: "Green Tiles Incorporation",
                date_added: "2021-09-23T11:35:00",
                provinces: ["All"],
                flagged: 5,
                watchlist: 0
            },
            {
                _id: "ghi",
                reference_id: "LW121",
                company_name: "Green Tiles Incorporation",
                date_added: "2021-09-07T11:35",
                provinces: ["QC", "NL", "ON"],
                flagged: 6,
                watchlist: 0
            },
            {
                _id: "ghi",
                reference_id: "Test",
                company_name: "New Company",
                date_added: "2021-09-07T11:35",
                provinces: ["QC", "NL", "ON"],
                flagged: 2,
                watchlist: 1
            }
        ]

        wl.forEach(row => {
            row.view = 'View More';
            row.remove = 'Remove'
        })

        this.setState({ tmpWatched: wl })
    }

    getColData = () => {
        const colData = [
            {
                colName: "_id",
                visible: false,
                type: "id"
            },
            {
                colName: 'reference_id',
                displayName: "Ref. Id",
                editable: false,
                visible: true,
                subText: false
            },
            {
                colName: 'company_name',
                displayName: "Company Name",
                editable: false,
                visible: true,
                subText: false

            },
            {
                colName: 'date_added',
                displayName: "Date Added",
                type: "date",
                timeSize: '9',
                timeLocation: 'below',
                editable: false,
                visible: true
            },
            {
                colName: 'provinces',
                displayName: "Provinces",
                editable: false,
                visible: true
            },
            {
                colName: 'flagged',
                displayName: "Flagged",
                editable: false,
                visible: true,
                subText: false
            },
            {
                colName: 'view',
                displayName: "Actions",
                onClick: viewMore,
                editable: true,
                visible: true,
                type: "link"
            },
            {
                colName: 'remove',
                displayName: "",
                onClick: remove,
                editable: true,
                visible: true,
                type: "link"
            }

        ]

    }

    getWatchlistData = () => {
        let data = this.state.tmpWatched;
        let currentData = data.filter(row => row.watchlist == this.state.currentWatchlist)
        // this.setState({ displayedList: currentData });
        return data ? data : []; //make sure at least an array is returned
    }

    watchlistAdded = () => {
        let wl = this.state.watchLists;
        wl.push(this.state.wlName)
        this.setState({ wlName: null, watchLists: wl, showCreate: false });
        if (wl.length === 0) this.setState({ currentWatchlist: 0 });
    }

    companyAdded = () => {
        this.setState({ addCompany: false });
        let company = this.state.newCompany;
        console.log("New Company: ", company)
        company.watchList = this.state.currentWatchlist;
        let data = this.state.data;
        let provinces = [];
        for (let province in company.provinces) {
            if (company.provinces.hasOwnProperty(province)) {
                if (company.provinces[province] == true) {
                    provinces.push(province)
                }
            }
        }
        company.provinceArray = provinces
        data.push(company);
        this.setState({ data: data });
    }

    headData = () => {
        let options = [];

        if (this.state.watchLists) {
            this.state.watchLists.forEach((row, index) => {
                options.push({ value: index, label: row });
            })
        }
        return (
            <>
                <Col sm={3}>
                    <div style={{ width: '200px' }}>
                        <Select options={options} value={
                            options.filter(option => option.value === 0)
                        } onChange={(e) => this.setState({ currentWatchlist: e })} />
                    </div>
                </Col>
                <Col sm={3}><button disabled>Create New Watchlist</button></Col>
                <Col sm={6} style={{ textAlign: 'right' }} className="mr0">Companies Added: 31/100</Col>
            </>
        )
    }

    createWatchList = () => {
        return (
            <>
                <Row>
                    <Col sm={{ span: 6, offset: 3 }} className={styles.centered}>
                        <button className='btn btn-primary' onClick={() => this.setState({ showCreate: true })}>Create New Watchlist</button>
                        <br /><br />
                        There are no watchlists to show.  Click <span className={styles.bolder}>"Create New Watchlist" <br /></span>
                        button to add a new watchlist
                    </Col>
                </Row>
            </>
        )
    }

    showCompany = () => {
        this.setState({ addCompany: true });
    }

    addCompanies = () => {
        return (
            <>
                <Container>
                    <Row>
                        {this.headData()}
                        <br />
                    </Row>
                    <Row>
                        <Col>
                            <button className='btn btn-primary' id='btnCompanies' onClick={() => this.setState({ addCompany: true })}>Add Companies</button>
                            <br /><br />
                        </Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col sm={{ span: 6, offset: 3 }} className={styles.centered}>
                            There are no companies in this watchlist.  Click <span className={styles.bolder}>"Add Company" <br /></span>
                            button to add companies to this watchlist
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }

    showCompanies = (list) => {

        return (<>
            <Container>
                <Row>
                    {this.headData()}
                </Row>
                <Row>

                    <table>
                        <thead>
                            <tr><th>Company Name</th>
                                <th>Ref Number</th>
                                <th>Provinces</th></tr>
                        </thead>
                        <tbody>
                            {list.map(row => {
                                return (
                                    <tr>
                                        <td>{row.name}</td>
                                        <td>{row.refNum}</td>
                                        <td>{row.provinceArray.join()}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Row>
            </Container>
        </>)
    }

    mainPage = () => {
        let flag = -1;
        let data = this.state.watchLists;
        let list = [];
        console.log("DATA: ", data)
        if (!data || data.length === 0) {
            //check to see if we have any watchlists
            let lists = this.state.watchLists;
            if (!lists || lists.length === 0) {
                //show create watchlist
                flag = 0;
            }
        }
        else {
            list = this.state.data.filter(row =>
                row.watchlist == this.state.currentWatchList
            )
            if (list.length == 0) {
                //show no companies in list
                flag = 1;
            }
            else {
                //return all companies for this watchlist
                flag = 2
            }
        }

        let ret;

        switch (flag) {
            case 0: ret = this.createWatchList(); break;
            case 1: ret = this.addCompanies(); break;
            case 2: ret = this.showCompanies(list);
            default: console.log("ERROR");
        }
        // console.log(ret)
        console.log(flag)
        return ret;
    }

    showDetails = () => { }
    loadBulk = () => { }

    updateWLName = (target => {
        this.setState({ wlName: target.value })
    })

    addCompanyData = (target, type, data) => {
        let currentCompany = this.state.newCompany || {}
        switch (type) {
            case 0: //company name
                currentCompany.name = target.value; break;
            case 1:
                let provinces = currentCompany.provinces || {};
                currentCompany.provinces[data] = !currentCompany.provinces.data;
                break;
            case 2:
                currentCompany.refNum = target.value; break;
            default: break;
        }
        console.log(currentCompany)
        this.setState({ newCompany: currentCompany });
    }


    // handleSwitch = () => {
    //     let ret;
    //     switch (this.state.currentPage) {
    //         case COMPANIES: ret = this.createWatchlist(); break;

    //     }
    //     return ret;
    //     /*
    //          case DETAILS: ret = this.showDetails(); break;
    //         case BULK: ret = this.loadBulk(); break;
    //         case LISTS: ret = this.showWatchlists();
    //         default: ret = this.createView(); break;
    //         */
    // }

    getProvinces = () => {
        let prov = [
            { name: "Ontario", abbr: "ON" },
            { name: "Quebec", abbr: "QC" },
            { name: "Nova Scotia", abbr: "NS" },
            { name: "New Brunswick", abbr: "NB" },
            { name: "Manitoba", abbr: "MB" },
            { name: "British Columbia", abbr: "BC" },
            { name: "Prince Edward Island", abbr: "PE" },
            { name: "Saskatchewan", abbr: "SK" },
            { name: "Alberta", abbr: "AB" },
            { name: "Newfoundland and Labrador", abbr: "NL" },
            { name: "Northwest Territories", abbr: "NT" },
            { name: "Yukon", abbr: "YT" },
            { name: "Nunavut", abbr: "NU" },
        ]
        return prov;
    }

    render() {
        return (
            <>


                <Modal
                    show={this.state.addCompany}
                    onHide={() => this.setState({ addCompany: false })}
                    backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Add Company to watchlist {this.state.watchLists[this.state.currentWatchList]}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Watchlist Name<br />
                        <input type='text' onChange={(e) => this.addCompanyData(e.target, 0)} />
                        <table style={{ width: '80%' }}>
                            <tbody>
                                {this.getProvinces().map(prov => {
                                    return (
                                        <tr><td>{prov.name} - {prov.abbr}</td><td><input type='checkbox' onChange={(e) => this.addCompanyData(e.target, 1, prov.abbr)} />
                                        </td></tr>)
                                })}
                            </tbody>
                        </table>
                        Ref. No<br />
                        <input type='text' onChange={(e) => this.addCompanyData(e.target, 2)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-outline-primary" onClick={() => this.setState({ addCompany: false })}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={this.companyAdded}>
                            Add Company
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={this.state.showCreate}
                    onHide={() => this.setState({ showCreate: false })}
                    backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Watchlist</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Watchlist Name<br />
                        <input type='text' onChange={(e) => this.updateWLName(e.target)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-outline-primary" onClick={() => this.setState({ showCreate: false })}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={this.watchlistAdded}>
                            Add Watchlist
                        </button>
                    </Modal.Footer>
                </Modal>
                <Header />
                {this.mainPage()}
            </>)
    }

}
export default LegalWatchlist;



