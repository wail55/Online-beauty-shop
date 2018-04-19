import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import CatalogCard from "../templates/CatalogCard";

import { StorageKeys } from "../../utils/storagekeys.js";
import { Api } from "../../api/api.js";

export default class Catalog extends Component {

    constructor (props) {
        super(props);
        this.state = {
            status: "",
            message: "",
            catalogs: []
        }
    }

    componentWillMount () {
        console.log(localStorage.getItem(StorageKeys.APIKEY));

        //take all product catalogs and send that information to a list of catalogs
        Api.getProductCategories()
            .then(res => {
                this.setState({
                    catalogs: res.object
                });
            });
        console.log(this.state.catalogs);
    }

    render () {
        return (
            <section className="catalog-section">
                 <Col xs={12} sm={6} md={4} className="person-wrapper col-xs-12 col-sm-6 col-md-4">
                     <div className="section-heading text-left">
                         <h3>Catálogo de <strong>produtos</strong></h3>
                     </div>
                     <Row className="show-grid catalog-list">
                        <Col xs={12} sm={4} md={3} className="person-wrapper col-xs-12 col-sm-4 col-md-3">
                            <ul>
                                <CatalogCard
                                    catalogs={this.state.catalogs}>
                                </CatalogCard>
                            </ul>
                        </Col>
                     </Row>
                 </Col>
             </section>
        );
    }
}