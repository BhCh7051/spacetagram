import React, {useEffect, useState} from "react";
import Images from "../components/Images";
// import ImageLightbox from "../components/ImageLightbox";
import {useParams} from "react-router-dom";

import {searchImages} from "../nasa";

function SearchPage() {
    const {searchTerm} = useParams();
    const [images, setImages] = useState([]);

    useEffect(() => {
        searchImages(searchTerm)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.collection.items);
                var DataSet = data.collection.items;
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
                                    // userImageUrl: image.links[0].href,
                                    // profileUrl: image.links[0].href,
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
      .catch((error) => alert(error));
  }, [searchTerm]);

  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="title">{searchTerm}</h1>

        <div className="images__container">
          {images.map((image) => (
              <Images key={image.imageUrl} data={image}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
