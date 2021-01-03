import React from "react";
import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import styles from "../styles/Home.module.css";

export default function HomeCarousel() {
  return (
    <div>
      <Carousel className={styles.carousel}>
        <Carousel.Item interval={5000}>
          <img
            className={"d-block w-100 h-100"}
            width={100}
            height={100}
            src="/1500x500.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className={"d-block w-100 h-100"}
            width={100}
            height={100}
            src="/1595842023397.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className={"d-block w-100 h-100"}
            width={100}
            height={100}
            src="/1598970833919.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className={"d-block w-100 h-100"}
            width={100}
            height={100}
            src="/1606741747667.jpg"
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
