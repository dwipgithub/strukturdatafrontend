import React, { useState, useEffect } from "react";
import axios from 'axios'

const GetForm = () => {
    const [Provinsi, setProvinsi] = useState([])
    const [urut, setUrut] = useState("id")
    const [metodeUrut, setMetodeUrut] = useState("+")
    const [ID, setID] = useState('')
    const [nama, setNama] = useState('')
    const [focusText, setFocusText] = useState(false);

    useEffect(() => {
        getProvinsi()
    }, []);

    const getProvinsi = async () => {
        try {
            const response = await axios.get("http://localhost:5001/indonesia/provinsi", {
            });
            setProvinsi(response.data.data)
        } catch (error) { }
    }

    const urutkan = async (e) => {
        setUrut(e)
    }

    const metodeUrutKan = async (e) => {
        setMetodeUrut(e)
    }

    const terapkan = async () => {
        try {
            const response = await axios.get("http://localhost:5001/indonesia/provinsi?urut=" + metodeUrut + urut, {
            });
            setProvinsi(response.data.data)
        } catch (error) { }
    }

    const changeHandlerID = (e) => {
        setID(e.target.value)
    }

    const changeHandlerNama = (e) => {
        setNama(e.target.value)
    }

    const simpan = async (e) => {
        e.preventDefault()
        if (ID === '') {
            alert('ID tidak boleh kosong')
            return
        }
        if (nama === '') {
            alert('nama tidak boleh kosong')
            return
        }
        const data = {
            id: ID,
            nama: nama
        }
        const customConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            await axios.post('http://localhost:5001/indonesia/Provinsi',
                data,
                customConfig)
                alert('data berhasil disimpan')
                setID('')
                setNama('')
                getProvinsi()
                setFocusText(true)
        } catch (error) {
            console.log(error)
            alert('error:' + error.response.data.message)
        }
        console.log(data)
    }

    return (
        <div className="container" style={{ marginTop: "70px" }}>
            <div className="row">
                <div className="mb-2">
                    <label htmlFor="urutkanSelect" style={{ height: "10px", lineHeight: "10px", paddingRight: "5px" }}>Urutkan</label>
                    <select
                        style={{ height: "30px", lineHeight: "30px", marginRight: "5px" }}
                        onChange={e => urutkan(e.target.value)}
                        id="urutkanSelect">
                        <option value="id">ID</option>
                        <option value="nama">Nama</option>
                    </select>
                    <select
                        style={{ height: "30px", lineHeight: "30px", paddingRight: "15px" }}
                        onChange={e => metodeUrutKan(e.target.value)}
                        id="metodeUrutkanSelect">
                        <option value="+">Asc</option>
                        <option value="-">Desc</option>
                    </select>
                    <button
                        style={{ marginLeft: "10px" }}
                        onClick={e => terapkan()}
                        className="btn btn-outline-success">
                        Terapkan
                    </button>
                </div>
                <div className="col-md-6">
                    <table
                        className="table table-bordered table-striped"
                        style={{ width: "100%" }}
                    >
                        <thead>
                            <tr>
                                <th>
                                    ID
                                </th>
                                <th>
                                    Nama
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Provinsi.map((value, index) => {
                                return (
                                    <tr key={value.id}>
                                        <td>
                                            {value.id}
                                        </td>
                                        <td>
                                            {value.nama}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <form onSubmit={simpan}>
                        <h5>Tambah</h5>
                        <table
                            className="table table-bordered table-striped"
                            style={{ width: "100%" }}>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="idInput">ID</label>
                                    </td>
                                    <td>
                                        <input type="number" id="idInput" 
                                        autoFocus={focusText}
                                        placeholder="isikan dengan ID Provinsi" 
                                        className="form-control"
                                        value={ID}
                                            onChange={e => changeHandlerID(e)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="namaInput">Nama</label>
                                    </td>
                                    <td>
                                        <input type="text" id="namaInput" 
                                        placeholder="isikan dengan Nama Provinsi" 
                                        className="form-control" value={nama}
                                            onChange={e => changeHandlerNama(e)}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            type="submit"
                            className="btn btn-outline-success"
                        >
                            Simpan
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GetForm