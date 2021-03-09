import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      search: null,
      items: [],
    };
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    fetch("https://dekontaminasi.com/api/id/covid19/hospitals")
      .then((results) => results.json())
      .then((results) => this.setState({ items: results }));
  }

  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  render() {
    const showAlert = (data) => {
      alert(
        "Rumah Sakit : " +
          data.name +
          "\n" +
          "Alamat : " +
          data.address +
          "\n" +
          "Wilayah : " +
          data.region +
          "\n" +
          "Telepon : " +
          data.phone +
          "\n" +
          "Provinsi : " +
          data.province
      );
    };

    const items = this.state.items
      .filter((data) => {
        if (this.state.search == null) return data;
        else if (
          data.name.toLowerCase().includes(this.state.search.toLowerCase())
        ) {
          return data;
        }
      })
      .map((data) => {
        return (
          <tr onClick={() => showAlert(data)} key={data.name}>
            <td>{data.name}</td>
            <td>{data.address}</td>
            <td>{data.region}</td>
            <td>{data.phone}</td>
            <td>{data.province}</td>
          </tr>
        );
      });

    return (
      <>
        {/* Navbar */}
        <div class="navbar">
          {/* Title */}
          <div class="title">
            <p>Daftar Rumah Sakit</p>
          </div>

          {/* Search Bar */}
          <div class="search">
            <input
              type="text"
              placeholder="Cari Rumah Sakit"
              onChange={(e) => this.searchSpace(e)}
            />
          </div>
        </div>

        {/* Table */}
        <div class="table">
          <Table responsive="sm">
            {/* Head Table */}
            <thead>
              <tr>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Wilayah</th>
                <th>Telepon</th>
                <th>Provinsi</th>
              </tr>
            </thead>

            {/* Body Table */}
            <tbody style={{ cursor: "pointer" }}>{items}</tbody>
          </Table>
        </div>
      </>
    );
  }
}

export default App;

// ReactJS
// React Bootstrap

//--------------------PENTING------------------//
// Jika mengalami error 'CORS policy: Access-Control-Allow-Origin' download dan jalankan extensi Chrome 'Allow CORS: Access-Control-Allow-Origin'
