import {useEffect, useState} from "react";
import axiosInstance from "../../../axios.js";

export const MainTable = () => {
const [books,setBooks] = useState([]);
    useEffect(() => {
        axiosInstance.get('/books')
            .then(response => {
                setBooks(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    return <>
        <div className={"container"}>
            <p className="h1">Books</p>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Autor</th>
                    <th scope="col">Tytuł</th>
                    <th scope="col">typ</th>
                    <th scope="col">isbn</th>
                    <th scope="col">publisher</th>
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
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    </>
}