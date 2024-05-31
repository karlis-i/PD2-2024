
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
                    ? <BookPage selectedBook={selectedBook} />
                    : <Homepage onSelect={handleBookSelection} />
            }
        </>
    );

}


function Homepage({ onSelect }) {
    const [topBooks, setTopBooks] = useState([]);

    useEffect(function() {

        async function getTopBooks() {

            try {

                const result = await fetch('http://localhost/data/get-top-books');

                if (!result.ok) {
                    throw new Error("Kļūda ielādējot datus");
                }

                const data = await result.json();

                setTopBooks(data);

            } catch (error) {
                console.log(error);
            }
        }

        getTopBooks();
    }, []);


    return (
        <>
            {
                topBooks.map((book, idx) => (<TopBook book={{ ...book, idx: idx }} key={book.id} onSelect={onSelect} />))
            }
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

function BookPage({selectedBook}) {

    return (
        <>
            <p>Grāmata {selectedBook} ir izvēlēta</p>
        </>
    );
}
