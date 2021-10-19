import React, { Component } from 'react'
import tableService from "../services/table.service.js";
import Landing from "../components/Landing"


export default class MainLanding extends Component {

    constructor(props) {
        super(props);
        this.state = {
          link: [],
        };
      }

    componentWillMount() {
        this.getLink(); 
    }

    async getLink() {
        return await tableService
          .getTables()
          .then((data) => this.setState({ link: data }));
      }

    render() {
      let linked = this.state.link
        return (
            <div>
                <Landing table={linked}/>
            </div>
        )
    }
}
