import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import BookShelves from "./components/BookShelves";
import * as BooksAPI from "./BooksAPI";
import Book from "./components/Book";

function App() {
  // const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const updateQuery = (query) => {
    setQuery(query);
  };
  const [searchResults, setSearchResults] = useState([]);
  const [mergedBooks, setMergedBooks] = useState([]);
  const [mapBooksById, setMapBooksById] = useState(new Map());


  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
      setMapBooksById(createMapOfBooks(res));
    };

    getBooks();
  }, []);

  useEffect(() => {
    if (query) {
      BooksAPI.search(query).then(data => {
        if (data.error) {
          setSearchResults([]);
        } else {
          setSearchResults(data);
        }
      })
    }
    else {
      setSearchResults([]);
    }

  }, [query]);

  useEffect(() => {
    const merged = searchResults.map(book => {
      if (mapBooksById.has(book.id)) {
        return mapBooksById.get(book.id);
      } else {
        return book;
      }
    });
    setMergedBooks(merged);
  }, [searchResults, mapBooksById]);

  const updateBookStatus = (book, status) => {
    const updatedBooks = books.map(x => {
      if (x.id === book.id) {
        book.shelf = status;
        return book;
      }
      return x;
    })
    if (!mapBooksById.has(book.id)) {
      book.shelf = status;
      updatedBooks.push(book)
    }
    setBooks(updatedBooks);
    BooksAPI.update(book, status);
  }

  const createMapOfBooks = (books) => {
    const myMap = new Map();
    books.map(book => myMap.set(book.id, book));
    return myMap;
  }

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/search">
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/">
                  <span className="close-search">Close</span>
                </Link>
                <div className="search-books-input-wrapper">
                  <input
                    type="text"
                    placeholder="Search by title, author, or ISBN"
                    value={query}
                    onChange={(event) => updateQuery(event.target.value)}
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {
                    mergedBooks.map(x =>
                      <li key={x.id}>
                        <Book book={x} updateBookStatus={updateBookStatus} />
                      </li>
                    )
                  }
                </ol>
              </div>
            </div>
          </Route>
          <Route path="/">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <BookShelves books={books} updateBookStatus={updateBookStatus} />
              </div>
              <div className="open-search">
                <Link to="/search">
                  <span>Add a book</span>
                </Link>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
