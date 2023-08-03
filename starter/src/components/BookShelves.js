import React from "react";
import Shelf from "./Shelf";

const BookShelves = ({books, updateBookStatus}) => {
    const currentlyReading = books.filter(x => x.shelf === "currentlyReading");
    const wantToRead = books.filter(x => x.shelf === "wantToRead");
    const read = books.filter(x => x.shelf === "read");

    return (
        <div>
            <Shelf title="Current Reading" books={currentlyReading} updateBookStatus={updateBookStatus}/>
            <Shelf title="Want To Read" books={wantToRead} updateBookStatus={updateBookStatus}/>
            <Shelf title="Read" books={read} updateBookStatus={updateBookStatus}/>
        </div>
    )
} 

export default BookShelves;