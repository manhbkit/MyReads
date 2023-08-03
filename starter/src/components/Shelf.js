import React from "react";
import Book from "./Book";

const Shelf = ({books, title, updateBookStatus}) => {

    return (
        <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                        books.map(x=> 
                            <li key={x.id}>
                                <Book book={x} updateBookStatus={updateBookStatus}/>
                            </li>
                        )
                    }
                    
                  </ol>
                </div>
              </div>
    )
} 

export default Shelf;