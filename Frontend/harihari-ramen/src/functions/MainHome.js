import React, { Component } from 'react'
import tableService from "../services/table.service.js";
import Home from "../components/Home"

export default class MainHome extends Component {
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
                <Home table={linked}/>
            </div>
        )
    }
}

