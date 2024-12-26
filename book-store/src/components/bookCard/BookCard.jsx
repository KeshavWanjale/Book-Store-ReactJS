import React from 'react'
import "./BookCard.css";
import { MdStar } from "react-icons/md";
import bookImage from '../../assets/education/education.png'


export default function BookCard({ book }) {
    return (
        <div>
            <div className="book-card">
                <div className="top-container">
                    <div className="book-img">
                        <img
                            src={bookImage}
                            alt={"Book Cover"}
                            className="book-image"
                        />
                    </div>
                </div>
                <div className="book-info">
                    <h3 className="book-title">{book.name || "Untitled Book"}</h3>
                    <p className="book-author">{book.author || "Unknown Author"}</p>
                    <div className="book-rating">
                        {`4.5`}<MdStar />
                    </div>
                    <div className="book-price-container">
                        <p className="discounted-price">
                            {`Rs.${book.price || 2000}`}
                        </p>
                        <p className="original-price">{`Rs.${book.price + 200 || 2500}`}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
