import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useState} from "react";
import axiosInstance from "../../../../axios.js";

export const AddBookModal = (props) => {

    const [modal, setModal] = useState(false);

    const [isbn, setIsbn] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState();

    const toggle = () => setModal(!modal);
    const sendData = (e) => {
        e.preventDefault()
        console.log({title,author,isbn,publisher,type,image})
        axiosInstance.post("/book",{title,author,isbn,publisher,type,image} ).then(()=>{
            setModal(false);
            // eslint-disable-next-line react/prop-types
            props.refrestList();
        })
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                let base64String = reader.result;

                const base64ImagePattern = /^data:image\/\w+;base64,/;
                if (base64String.match(base64ImagePattern)) {
                    base64String = base64String.split(',')[1];
                }

                setImage(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

        return <>
            <div>
                <Button color="primary" onClick={toggle}>
                    Dodaj
                </Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <form onSubmit={sendData} className="container mt-4">
                        <ModalHeader toggle={toggle}>Dodaj Książkę</ModalHeader>
                        <ModalBody>
                            <div className="mb-3">
                                <label htmlFor="nameInput" className="form-label">Tytuł</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="nameInput"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nameInput" className="form-label">Autor</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="nameInput"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nameInput" className="form-label">ISBN</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="nameInput"
                                    value={isbn}
                                    onChange={(e) => setIsbn(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nameInput" className="form-label">Publisher</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="nameInput"
                                    value={publisher}
                                    onChange={(e) => setPublisher(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nameInput" className="form-label">Typ</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="nameInput"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <div className="mb-3">
                                    <label htmlFor="fileInput" className="form-label">Obrazek</label>
                                    <div className="form-group">
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="fileInput"
                                            onChange={handleFileInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit">
                                Wyślij
                            </Button>{' '}
                            <Button color="secondary" onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        </>
};