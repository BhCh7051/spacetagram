import React, { useState, useEffect } from "react";
import Image from "../components/Image";
import { useParams } from "react-router-dom";

import { searchImages } from "../nasa";

function SearchPage() {
  const { searchTerm } = useParams();
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
                console.log(DataSet);

              setImages(
                  DataSet.map((image) => ({
                  id: image.data[0].nasa_id,
                  imageUrl: image.links[0].href,
                  downloadUrl: image.imghref[0],
                  username: image.data[0].title,
                  userImageUrl: image.links[0].href,
                  profileUrl: image.links[0].href,
                }))
              );
            })
            .catch((error) => {
            });
        })
      })
      .catch((error) => alert(error));
  }, [searchTerm]);

  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="title">{searchTerm}</h1>

        <div className="images__container">
          {images.map((image) => (
            <Image key={image.imageUrl} data={image} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
