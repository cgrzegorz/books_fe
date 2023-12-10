import {useEffect, useState} from "react";
import axiosInstance from "../../../axios.js";
import {AddBookModal} from "./addBookModal/addBookModal.jsx";

export const MainTable = () => {

    const refrestList = () =>{
        axiosInstance.get('/books')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }


const [books,setBooks] = useState([]);
    useEffect(() => {
        refrestList()
    }, []);


    return <>
        <div className={"container"}>
            <p className="h1">Books</p>
            <div className={"d-flex justify-content-end"}>
                <AddBookModal refrestList={refrestList} />
            </div>
            {books.length ? ( <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Autor</th>
                    <th scope="col">Tytuł</th>
                    <th scope="col">typ</th>
                    <th scope="col">isbn</th>
                    <th scope="col">publisher</th>
                    <th scope="col">Okładka</th>
                </tr>
                </thead>
                <tbody>
                {books.map((el) => {
                    return <tr key={el.id}>
                        <th scope="row">{el.id}</th>
                        <td>{el.author}</td>
                        <td>{el.title}</td>
                        <td>{el.type}</td>
                        <td>{el.isbn}</td>
                        <td>{el.publisher}</td>
                        <td>{el.image && (<img width={150} src={`data:image/jpeg;base64,${el.image}`} alt="Obraz"/>)}</td>
                    </tr>
                })}
                </tbody>
            </table>) : (<p>Ładuje</p>)}

        </div>
    </>
}