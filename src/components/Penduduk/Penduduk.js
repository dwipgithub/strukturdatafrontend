import React, { useState, useEffect } from "react";
import axios from 'axios'

const GetForm = () => {
    const [Penduduk, setPenduduk] = useState([])
    const [urut, setUrut] = useState("nik")
    const [metodeUrut, setMetodeUrut] = useState("+")
    const [NIK, setNIK] = useState('')
    const [nama, setNama] = useState('')
    const [agamaId, setAgamaId] = useState('')
    const [alamat, setAlamat] = useState('')
    const [provinsiId, setProvinsiId] = useState('')
    const [focusText, setFocusText] = useState(false)
    const [agama, setAgama] = useState([])
    const [provinsi, setProvinsi] = useState([])

    useEffect(() => {
        getPenduduk()
        getAgama()
        getProvinsi()
    }, []);

    const getPenduduk = async () => {
        try {
            const response = await axios.get("/api-strukturdata/penduduk", {
            });
            setPenduduk(response.data.data)
        } catch (error) { }
    }

    const getAgama = async () => {
        try {
            const response = await axios.get("/api-strukturdata/agama", {
            });
            setAgama(response.data.data)
            setAgamaId(response.data.data[0].id)
        } catch (error) { }
    }

    const getProvinsi = async () => {
        try {
            const response = await axios.get("/api-strukturdata/provinsi", {
            });
            setProvinsi(response.data.data)
            setProvinsiId(response.data.data[0].id)
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
            const response = await axios.get("/api-strukturdata/penduduk?urut=" + metodeUrut + urut, {
            });
            setPenduduk(response.data.data)
        } catch (error) { }
    }

    const changeHandlerID = (e) => {
        setNIK(e.target.value)
    }

    const changeHandlerNama = (e) => {
        setNama(e.target.value)
    }

    const changeHandlerAgama = (e) => {
        setAgamaId(e.target.value)
    }

    const changeHandlerAlamat = (e) => {
        setAlamat(e.target.value)
    }

    const changeHandlerProvinsi = (e) => {
        setProvinsiId(e.target.value)
    }

    const simpan = async (e) => {
        e.preventDefault()
        if (NIK === '') {
            alert('NIK tidak boleh kosong')
            return
        }
        if (nama === '') {
            alert('nama tidak boleh kosong')
            return
        }
        if (alamat === '') {
            alert('alamat tidak boleh kosong')
            return
        }
        const data = {
            nik: NIK,
            nama: nama,
            agamaId: agamaId,
            alamat: alamat,
            provinsiId: provinsiId
        }

        const customConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            await axios.post('/api-strukturdata/penduduk',
                data,
                customConfig)
                alert('data berhasil disimpan')
                setNIK('')
                setNama('')
                setAgamaId(agama[0].id)
                setAlamat('')
                setProvinsiId(provinsi[0].id)
                getPenduduk()
                setFocusText(true)
        } catch (error) {
            console.log(error)
            alert('error:' + error.response.data.message)
        }
    }

    return (
        <div className="container-fluid" style={{ marginTop: "70px" }}>
            <div className="row">
                <div className="col-md-12 mb-1">
                    <label htmlFor="urutkanSelect" style={{ height: "10px", lineHeight: "10px", paddingRight: "20px" }}>Urutkan</label>
                    <select
                        style={{ borderRadius: "5px", height: "30px", lineHeight: "30px", marginRight: "5px" }}
                        onChange={e => urutkan(e.target.value)}
                        id="urutkanSelect">
                        <option value="nik">NIK</option>
                        <option value="nama">Nama</option>
                        <option value="agamaNama">Agama</option>
                        <option value="alamat">Alamat</option>
                        <option value="provinsiNama">Provinsi</option>
                    </select>
                    <select
                        style={{ borderRadius: "5px", height: "30px", lineHeight: "30px", marginRight: "5px" }}
                        onChange={e => metodeUrutKan(e.target.value)}
                        id="metodeUrutkanSelect">
                        <option value="+">Asc</option>
                        <option value="-">Desc</option>
                    </select>
                    <button
                        style={{ color: "green", height: "30px", width: "93px", borderRadius: "5px", backgroundColor: "white", border: "1px solid green" }}
                        onClick={e => terapkan()}
                        className="">
                        Terapkan
                    </button>
                </div>
                <div className="col-md-7">
                    <div className="">
                        <table
                            className="table table-bordered table-striped"
                            style={{ width: "100%" }}
                        >
                            <thead>
                                <tr>
                                    <th>
                                        NIK
                                    </th>
                                    <th>
                                        Nama
                                    </th>
                                    <th>
                                        Agama
                                    </th>
                                    <th>
                                        Alamat
                                    </th>
                                    <th>
                                        Provinsi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Penduduk.map((value, index) => {
                                    return (
                                        <tr key={value.nik}>
                                            <td style={{ width: "18%" }}>
                                                {value.nik}
                                            </td>
                                            <td>
                                                {value.nama}
                                            </td>
                                            <td>
                                                {value.agamaNama}
                                            </td>
                                            <td>
                                                {value.alamat}
                                            </td>
                                            <td>
                                                {value.provinsiNama}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="">
                        <h5>Tambah</h5>
                        <div className="">
                            <form onSubmit={simpan}>
                                <table
                                    className="table table-bordered table-striped"
                                    style={{ width: "100%" }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: "35%" }}>
                                                <label htmlFor="idInput">NIK</label>
                                            </td>
                                            <td>
                                                <input type="number" id="idInput"
                                                    autoFocus={focusText}
                                                    placeholder="isikan dengan NIK"
                                                    className="form-control"
                                                    value={NIK}
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
                                        <tr>
                                            <td>
                                                <label htmlFor="selectAgama">Agama</label>
                                            </td>
                                            <td>
                                                <select 
                                                    name="selectAgama" 
                                                    id="selectAgama" 
                                                    className="form-select"
                                                    onChange={ e => changeHandlerAgama(e)}
                                                    value={agamaId}
                                                    >
                                                    {agama.map((option) => {
                                                        return (
                                                            <option
                                                                key={option.id}
                                                                name={option.nama}
                                                                value={option.id}
                                                            >
                                                                {option.nama}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="alamatInput">Alamat</label>
                                            </td>
                                            <td>
                                                <textarea 
                                                    id="alamatInput" 
                                                    className="form-control" 
                                                    placeholder="isikan dengan alamat"
                                                    value={alamat}
                                                    onChange={e => changeHandlerAlamat(e)}
                                                ></textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="selectProvinsi">Provinsi</label>
                                            </td>
                                            <td>
                                                <select 
                                                    name="selectProvinsi" 
                                                    id="selectProvinsi" 
                                                    className="form-select"
                                                    value={provinsiId}
                                                    onChange={ e => changeHandlerProvinsi(e)}
                                                    >
                                                    {provinsi.map((option) => {
                                                        return (
                                                            <option
                                                                key={option.id}
                                                                name={option.nama}
                                                                value={option.id}
                                                            >
                                                                {option.nama}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
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
            </div>
        </div>
    )
}

export default GetForm