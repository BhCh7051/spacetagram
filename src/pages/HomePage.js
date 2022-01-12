import React, {useEffect, useState} from "react";
import Hero from "../components/Hero";
import Images from "../components/Images";

import {getRandomImages} from "../nasa";

function HomePage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getRandomImages()
      .then((res) => res.json())
      .then((data) => {
        // // console.log(data);
        var Data = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].media_type === "image") {
            Data.push(data[i]);
          }
        }
        setImages(
          // for(var i=0;i<data.length;i++)
          Data.map((image) => ({
              // id: image.id,
              imageUrl: image.url,
              downloadUrl: image.hdurl,
              title: image.title,
              // userImageUrl: image.url,
              // profileUrl: image.url,
              description: image.explanation,
              date: image.date,
          }))
        );
      })
      .catch((error) => alert(error));
  }, []);
    // // console.log(images);
  return (
    <>
      <Hero />

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

/*  { imageUrl: "https://images.nasa.com/photo-1611489704477-f116748db329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg4MDd8MHwxfHJhbmRvbXx8fHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080" },
    { imageUrl: "https://images.nasa.com/photo-1613904985222-0d534430bdbd?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { imageUrl: "https://images.nasa.com/photo-1593643946890-b5b85ade6451?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { imageUrl: "https://images.nasa.com/photo-1613878501675-42738513f0a4?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { imageUrl: "https://images.nasa.com/photo-1613824320065-3d07b66b8d32?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { imageUrl: "https://images.nasa.com/photo-1612831819448-f6cae53d3dcf?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { imageUrl: "https://images.nasa.com/photo-1613870145855-09aca19f32ca?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { imageUrl: "https://images.nasa.com/photo-1585399000684-d2f72660f092?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzN3x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { imageUrl: "https://images.nasa.com/photo-1613858749327-c09380ae8116?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { imageUrl: "https://images.nasa.com/photo-1613865342914-5c41d188d02d?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { imageUrl: "https://images.nasa.com/photo-1613862445274-31ce9c920238?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1NHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { imageUrl: "https://images.nasa.com/photo-1613871346404-82d406aafbad?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" } */

export default HomePage;
