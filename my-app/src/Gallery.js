// Gallery.js

import toursData from "./tours.json";
import { useState, useEffect } from "react";

function Gallery() {
    const [isLoading, setLoading] = useState(false);
    const [tours, setTours] = useState([])
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setTours(toursData);
            setLoading(false);
        }, 1000);
    }, []);

    // Remove tours that user is not intersted in.
    function RemoveTour(index) {
        setTours(tours.filter((value, _index, _arr) => {
            if (value.id !== index) {
                return value
            }
        }))
    }

    return <div className="gallery-view">
        {isLoading ? (
            <h4 className="loading-text">Loading...</h4>
        ) : (
            tours.map((tour) => {
                return <div>
                    <Tour key={tour.id} tour={tour}/>
                    <button className="not-interested-btn" onClick={() => {
                        RemoveTour(tour.id)
                    }}>Not Interested</button>
                </div>
            })
        )}
    </div>
   
};

// Change visibility based on user preferecnce.
function Tour({tour}) {
    const [isInfoVisible, setInfoVisible] = useState(false);
    return <div className="tour-view">
        <div>
            <h2>{tour.name}</h2>
            {isInfoVisible ? 
                <>
                    <p>{tour.info}</p>
                    <button onClick={() => {
                        setInfoVisible(false)
                    }}>Show Less</button>
                </> : <>
                    <button onClick={() => {
                        setInfoVisible(true)
                    }}>Read More</button>
                </>
                }
        </div>

        <img className="tour-img" src={tour.image} alt="picture of a tour location"/>
        <h3>Price: ${tour.price}</h3>
    </div>
}


export default Gallery;