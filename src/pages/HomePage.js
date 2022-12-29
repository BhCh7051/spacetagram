import React, {useEffect, useState} from "react";
import {trackPromise} from "react-promise-tracker";
import Hero from "../components/Hero";
import Images from "../components/Images";

import {getRandomImages} from "../nasa";

function HomePage() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        trackPromise(
            getRandomImages()
                .then((res) => res.json())
                .then((data) => {
                    let Data = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].media_type === "image") {
                            Data.push(data[i]);
                        }
                    }
                    setImages(
                        Data.map((image) => ({
                            imageUrl: image.url,
                            downloadUrl: image.hdurl,
                            title: image.title,
                            description: image.explanation,
                            date: image.date,
                        }))
                    );
                })
                .catch((error) => alert(error))
        );
    }, []);
    return (
        <>
            <Hero/>

            <div className="wrapper">
                <div className="container">
                    <div className="images__container">
                        {images.map((image) => (
                            <Images key={image.imageUrl} data={image}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
