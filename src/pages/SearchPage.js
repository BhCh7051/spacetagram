import React, {useEffect, useState} from "react";
import {trackPromise} from "react-promise-tracker";
import Images from "../components/Images";
import {useParams} from "react-router-dom";

import {searchImages} from "../nasa";
import Typography from "@material-ui/core/Typography";

function SearchPage() {
    const {searchTerm} = useParams();
    const [images, setImages] = useState([]);

    useEffect(() => {
        trackPromise(
            searchImages(searchTerm)
                .then((res) => res.json())
                .then((data) => {
                    let DataSet = data.collection.items;
                    DataSet.forEach(function (Data) {
                        fetch(Data.href)
                            .then((response) => response.json())
                            .then((responseJson) => {
                                Data["imghref"] = responseJson;

                                setImages(
                                    DataSet.map((image) => ({
                                        id: image.data[0].nasa_id,
                                        imageUrl: image.links[0].href,
                                        downloadUrl: image.imghref[0],
                                        title: image.data[0].title,
                                        description: image.data[0].description,
                                        date: image.data[0].date_created,
                                        keywords: image.data[0].keywords,
                                    }))
                                );
                            })
                            .catch((error) => {
                            });
                    });
                })
                .catch((error) => alert(error))
        );
    }, [searchTerm]);
    return (
        <div className="wrapper">
            <div className="container">
                <Typography
                    variant="h2"
                    className="title"
                    component="h2"
                    gutterBottom
                >
                    {searchTerm}
                </Typography>
                <div className="images__container">
                    {images.map((image) => (
                        <Images key={image.id} data={image}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
