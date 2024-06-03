
import { useEffect, useState } from "react";

export default function App() {
    const [selectedBook, setSelectedBook] = useState(null);

    function handleBookSelection(id) {
        setSelectedBook(id);
    }

    return (
        <>
            {
                selectedBook
                    ? <BookPage selectedBook={selectedBook} onSelect={handleBookSelection} />
                    : <Homepage onSelect={handleBookSelection} />
            }
        </>
    );

}


function Homepage({ onSelect }) {
    const [topBooks, setTopBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(function() {

        async function getTopBooks() {

            try {
                setIsLoading(true);
                setError("");

                const result = await fetch('http://localhost/data/get-top-books');

                if (!result.ok) {
                    throw new Error("Kļūda ielādējot datus.");
                }

                const data = await result.json();

                setTopBooks(data);
            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        getTopBooks();
    }, []);


    return (
        <>
            {isLoading && <Loading />}
            {error && <ErrorMsg message={error} />}
            {!isLoading && !error && (
                topBooks.map((book, idx) => (<TopBook book={{ ...book, idx: idx }} key={book.id} onSelect={onSelect} />))
            )}
        </>
    );
}

function TopBook({book, onSelect}) {

    return (
        <div className="row mb-5 pt-5 pb-5 bg-light">
            <div className={`col-md-6 mt-2 px-5 ${book.idx % 2 === 0 ? 'text-start order-2' : 'text-end order-1'}`}>
                <p className="display-4">{ book.name }</p>
                <p className="lead">{ (book.description.split(' ').slice(0, 32).join(' ')) + '...' }</p>
                <button className="btn btn-success" onClick={ () => onSelect(book.id) }>Apskatīt</button>
            </div>
            <div className={`col-md-6 text-center ${book.idx % 2 === 0 ? 'order-1' : 'order-2'}`}>
                <img className="img-fluid img-thumbnail rounded-lg w-50" alt={ book.name } src={ book.image } />
            </div>
        </div>
    );
}

function BookPage({ selectedBook, onSelect }) {
    return (
        <>
            <BookDetails selectedBook={selectedBook} onSelect={onSelect} />
            <RelatedContainer selectedBook={selectedBook} onSelect={onSelect} />
        </>
    );
}

function BookDetails({ selectedBook, onSelect }) {
    const [bookData, setBookData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(function() {

        async function getBookData(selectedBook) {

            try {

                setIsLoading(true);
                setError("");

                const result = await fetch('http://localhost/data/get-book/' + selectedBook, { mode: 'cors' });

                if (!result.ok) {
                    throw new Error("Kļūda ielādējot datus");
                }

                const data = await result.json();

                setBookData(data);

            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        getBookData(selectedBook);
    }, [selectedBook]);

    return (
        <>
            {isLoading && <Loading />}
            {error && <ErrorMsg message={error} />}
            {!isLoading && !error && (
                <div className="row mb-5">
                    <div className="col-md-6 pt-5">
                        <h1 className="display-3">{bookData.name}</h1>
                        <p className="lead">{bookData.description}</p>
                        <dl className="row">
                            <dt className="col-sm-3">Gads</dt>
                            <dd className="col-sm-9">{bookData.year}</dd>
                            <dt className="col-sm-3">Cena</dt>
                            <dd className="col-sm-9">&euro; {bookData.price}</dd>
                            <dt className="col-sm-3">Žanrs</dt>
                            <dd className="col-sm-9">{bookData.genre}</dd>
                        </dl>
                        <button className="btn btn-dark" onClick={ () => onSelect(null) }>Uz sākumu</button>
                    </div>
                    <div className="col-md-6 text-center p-5">
                        <img className="img-fluid img-thumbnail rounded-lg" src={bookData.image} alt={bookData.name} />
                    </div>
                </div>
            )}
        </>
    );
}

function RelatedContainer({ selectedBook, onSelect }) {
    const [relatedBooks, setRelatedBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(function() {

        async function getRelatedBooks(selectedBook) {

            try {

                setIsLoading(true);
                setError("");

                const result = await fetch('http://localhost/data/get-related-books/' + selectedBook, { mode: 'cors' });

                if (!result.ok) {
                    throw new Error("Kļūda ielādējot datus");
                }

                const data = await result.json();

                setRelatedBooks(data);

            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        getRelatedBooks(selectedBook);
    }, [selectedBook]);

    return (
        <>
            {isLoading && <Loading />}
            {error && <ErrorMsg message={error} />}
            {!isLoading && !error && (
                <>
                    <div className="row mt-5">
                        <div className="col-md-12">
                            <h2 className="display-4">Līdzīgas grāmatas</h2>
                        </div>
                    </div>
                    <div className="row mb-5">
                        {relatedBooks.map((book) => (<RelatedBook book={book} key={book.id} onSelect={onSelect} />))}
                    </div>
                </>
            )}
        </>
    );
}

function RelatedBook({ book, onSelect }) {
    return (
        <div className="col-md-4">
            <div className="card">
                <img className="card-img-top" src={book.image} alt={book.name} style={{ height: "620px" }} />
                <div className="card-body">
                    <h5 className="card-title">{book.name}</h5>
                    <button className="btn btn-success" onClick={ () => onSelect(book.id) }>Apskatīt</button>
                </div>
            </div>
        </div>
    );
}


function Loading() {
    return (
        <div className="row mb-5 mt-5">
            <div className="text-center">
                <img src="./loading.gif" alt="Lūdzu, uzgaidiet!" className="mx-auto d-block" />
            </div>
        </div>
    );
}

function ErrorMsg({ message }) {
    return (
        <div className="alert alert-danger">
            <p>{message}</p>
            <p>Lūdzu, pārlādējiet lapu!</p>
        </div>
    );
}

