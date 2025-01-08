// src/MyContext.js
import React, { createContext, useEffect, useState } from "react";

import productImg1 from "./productImg1.png";
import authorImg from "./authorImg1.png";

import newsImg1 from "./newsImg1.png";
import newsImg2 from "./newsImg2.png";
import newsImg3 from "./newsImg3.png";
import newsImg4 from "./newsImg4.png";
import cardImg1 from "./cardImg1.png";
import cardImg2 from "./cardImg2.png";
import cardImg3 from "./cardImg3.png";
import cardImg4 from "./cardImg4.png";
import profileImg1 from "./profileImg.png";
import authorImg2 from "./authorImg2.png";
import heroImg from "../assets/heroImg.jpg"

export const MyContext = createContext(null);

export const MyContextProvider = ({ children }) => {
  // Vaqtinchalik mahsulotlar ro'yxati
  const products = [
    {
      id: 1,
      title: "Mahsulot nomi 1",
      description: "Mahsulot tavsifi 1",
      oldPrice: 256000,
      newPrice: null,
      rating: 4.8,
      category: "Kasanachilik",
      paid: true,
      img: productImg1,
      authorImg: authorImg,
      authorName: "Nilufar Tashkentova",
      work: "Hunarmand",
      cart: 450
    },
    {
      id: 2,
      title: "Mahsulot nomi 2",
      description: "Mahsulot tavsifi 2",
      oldPrice: 300000,
      newPrice: 250000,
      rating: 4.5,
      category: "Ipakchilik",
      paid: false,
      img: productImg1,
      authorImg: authorImg,
      authorName: "Nilufar Tashkentova",
      work: "Hunarmand",
      cart: 450
    },
    {
      id: 3,
      title: "Mahsulot nomi 3",
      description: "Mahsulot tavsifi 3",
      oldPrice: 500000,
      newPrice: 450000,
      rating: 3.9,
      category: "Tandirchilik",
      paid: true,
      img: productImg1,
      authorImg: authorImg,
      authorName: "Nilufar Tashkentova",
      work: "Hunarmand",
      cart: 450
    },
    {
      id: 4,
      title: "Mahsulot nomi 4",
      description: "Mahsulot tavsifi 4",
      oldPrice: 500000,
      newPrice: 450000,
      rating: 3.9,
      category: "Tandirchilik",
      paid: true,
      img: productImg1,
      authorImg: authorImg,
      authorName: "Nilufar Tashkentova",
      work: "Hunarmand",
      cart: 450
    },
    {
      id: 5,
      title: "Mahsulot nomi 5",
      description: "Mahsulot tavsifi 5",
      oldPrice: 256000,
      newPrice: 200000,
      rating: 4.8,
      category: "Kasanachilik",
      paid: true,
      img: productImg1,
      authorImg: authorImg,
      authorName: "Nilufar Tashkentova",
      work: "Hunarmand",
      cart: 450
    },
  ];

  const [newsList, setNewsList] = useState([
    {
      id: 1,
      img: newsImg1,
      date: "Bugun",
      views: 2567,
      title: "O‘zini o‘zi band qilgan shaxslar",
      description:
        "«Kasanachilikni yanada rivojlantirishga oid qo‘shimcha chora-tadbirlar to‘g‘risida»gi",
      type: "Qonunchilik",
      category: "Qonunchilik",
      authorImg: authorImg,
      authorName: "Muallif ismi",
      postedDate: "11.11.2024",
    },
    {
      id: 2,
      img: newsImg2,
      date: "Bugun",
      views: 3123,
      title: "Hunarmandchilik va kasanachilikni",
      description:
        "Традиционным способом изготовленный браслет, очень красивый и узорчатый",
      type: "Me’yoriy hujjatlar",
      category: "Meyoriy huquqiy hujjatlar",
      authorImg: authorImg,
      authorName: "Muallif ismi",
      postedDate: "11.11.2024",
    },
    {
      id: 3,
      img: newsImg3,
      date: "Kecha",
      views: 1345,
      title: "Milliy hunarmandchilik festivali",
      description:
        "An’anaviy hunarmandlar festivali qiziqarli voqealar va ko‘rgazmalar bilan boyitilgan.",
      type: "Madaniyat",
      category: "Qonunchilik",
      authorImg: authorImg,
      authorName: "Muallif ismi",
      postedDate: "11.11.2024",
    },
    {
      id: 4,
      img: newsImg4,
      date: "O‘tgan hafta",
      views: 5678,
      title: "Texnologiya va innovatsiyalar",
      description: "Yangi texnologiyalarning jamiyatdagi o‘rni va rivoji.",
      type: "Texnologiya",
      category: "Meyoriy huquqiy hujjatlar",
      authorImg: authorImg,
      authorName: "Muallif ismi",
      postedDate: "11.11.2024",
    },
    {
      id: 5,
      img: newsImg1,
      date: "Bugun",
      views: 2567,
      title: "O‘zini o‘zi band qilgan shaxslar",
      description:
        "«Kasanachilikni yanada rivojlantirishga oid qo‘shimcha chora-tadbirlar to‘g‘risida»gi",
      type: "Qonunchilik",
      category: "Qonunchilik",
      authorImg: authorImg,
      authorName: "Muallif ismi",
      postedDate: "11.11.2024",
    },
    {
      id: 6,
      img: newsImg2,
      date: "Bugun",
      views: 3123,
      title: "Hunarmandchilik va kasanachilikni",
      description:
        "Традиционным способом изготовленный браслет, очень красивый и узорчатый",
      type: "Me’yoriy hujjatlar",
      category: "Meyoriy huquqiy hujjatlar",
      authorImg: authorImg,
      authorName: "Muallif ismi",
      postedDate: "11.11.2024",
    },
    {
      id: 7,
      img: newsImg3,
      date: "Kecha",
      views: 1345,
      title: "Milliy hunarmandchilik festivali",
      description:
        "An’anaviy hunarmandlar festivali qiziqarli voqealar va ko‘rgazmalar bilan boyitilgan.",
      type: "Madaniyat",
      category: "Qonunchilik",
      authorImg: authorImg,
      authorName: "Muallif ismi",
      postedDate: "11.11.2024",
    },
    {
      id: 8,
      img: newsImg4,
      date: "O‘tgan hafta",
      views: 5678,
      title: "Texnologiya va innovatsiyalar",
      description: "Yangi texnologiyalarning jamiyatdagi o‘rni va rivoji.",
      type: "Texnologiya",
      category: "Qonunchilik",
      authorImg: authorImg,
      authorName: "Muallif ismi",
      postedDate: "11.11.2024",
    },
    {
      id: 9,
      img: newsImg1,
      date: "Bugun",
      views: 2567,
      title: "O‘zini o‘zi band qilgan shaxslar",
      description:
        "«Kasanachilikni yanada rivojlantirishga oid qo‘shimcha chora-tadbirlar to‘g‘risida»gi",
      type: "Qonunchilik",
      category: "Qonunchilik",
      authorImg: authorImg,
      authorName: "Muallif ismi",
      postedDate: "11.11.2024",
    },
    {
      id: 10,
      img: newsImg2,
      date: "Bugun",
      views: 3123,
      title: "Hunarmandchilik va kasanachilikni",
      description:
        "Традиционным способом изготовленный браслет, очень красивый и узорчатый",
      type: "Me’yoriy hujjatlar",
      category: "Meyoriy huquqiy hujjatlar",
      authorImg: authorImg,
      authorName: "Muallif ismi",
      postedDate: "11.11.2024",
    },
    {
      id: 11,
      img: newsImg3,
      date: "Kecha",
      views: 1345,
      title: "Milliy hunarmandchilik festivali",
      description:
        "An’anaviy hunarmandlar festivali qiziqarli voqealar va ko‘rgazmalar bilan boyitilgan.",
      type: "Madaniyat",
      authorImg: authorImg,
      authorName: "Muallif ismi",
      postedDate: "11.11.2024",
    },
    {
      id: 12,
      img: newsImg4,
      date: "O‘tgan hafta",
      views: 5678,
      title: "Texnologiya va innovatsiyalar",
      description: "Yangi texnologiyalarning jamiyatdagi o‘rni va rivoji.",
      type: "Texnologiya",
      authorImg: authorImg,
      authorName: "Muallif ismi",
      postedDate: "11.11.2024",
    },
    {
      id: 13,
      img: newsImg1,
      date: "Bugun",
      views: 2567,
      title: "O‘zini o‘zi band qilgan shaxslar",
      description:
        "«Kasanachilikni yanada rivojlantirishga oid qo‘shimcha chora-tadbirlar to‘g‘risida»gi",
      type: "Qonunchilik",
      authorImg: authorImg,
      authorName: "Muallif ismi",
      postedDate: "11.11.2024",
    },
    {
      id: 14,
      img: newsImg2,
      date: "Bugun",
      views: 3123,
      title: "Hunarmandchilik va kasanachilikni",
      description:
        "Традиционным способом изготовленный браслет, очень красивый и узорчатый",
      type: "Me’yoriy hujjatlar",
      authorImg: authorImg,
      authorName: "Muallif ismi",
      postedDate: "11.11.2024",
    },
    {
      id: 15,
      img: newsImg3,
      date: "Kecha",
      views: 1345,
      title: "Milliy hunarmandchilik festivali",
      description:
        "An’anaviy hunarmandlar festivali qiziqarli voqealar va ko‘rgazmalar bilan boyitilgan.",
      type: "Madaniyat",
      authorImg: authorImg,
      authorName: "Muallif ismi",
      postedDate: "11.11.2024",
    },
    {
      id: 16,
      img: newsImg4,
      date: "O‘tgan hafta",
      views: 5678,
      title: "Texnologiya va innovatsiyalar",
      description: "Yangi texnologiyalarning jamiyatdagi o‘rni va rivoji.",
      type: "Texnologiya",
      authorImg: authorImg,
      authorName: "Muallif ismi",
    },
  ]);

  const documentsCategory = [
    {
      id: 1,
      category: "Qonunchilik hujjatlari",
    },
    {
      id: 2,
      category: "Kichik biznes loyihalar",
    },
  ];

  const documents = [
    {
      id: 1,
      title:
        "Kasanachilikni yanada rivojlantirishga oid qo‘shimcha chora-tadbirlar to‘g‘risida",
      smallTitle: "Kasanachilikni rivojlantirish, bu sohada yangi",
      category: "Qonunchilik hujjatlari",
    },
    {
      id: 2,
      title:
        "Kasanachilikni yanada rivojlantirishga oid qo‘shimcha chora-tadbirlar to‘g‘risida",
      smallTitle: "Kasanachilikni rivojlantirish, bu sohada yangi",
      category: "Qonunchilik hujjatlari",
    },
    {
      id: 3,
      title:
        "Kasanachilikni yanada rivojlantirishga oid qo‘shimcha chora-tadbirlar to‘g‘risida",
      smallTitle: "Kasanachilikni rivojlantirish, bu sohada yangi",
      category: "Qonunchilik hujjatlari",
    },
    {
      id: 4,
      title:
        "Kasanachilikni yanada rivojlantirishga oid qo‘shimcha chora-tadbirlar to‘g‘risida",
      smallTitle: "Kasanachilikni rivojlantirish, bu sohada yangi",
      category: "Kichik biznes loyihalar",
    },
    {
      id: 5,
      title:
        "Kasanachilikni yanada rivojlantirishga oid qo‘shimcha chora-tadbirlar to‘g‘risida",
      smallTitle: "Kasanachilikni rivojlantirish, bu sohada yangi",
      category: "Kichik biznes loyihalar",
    },
    {
      id: 6,
      title:
        "Kasanachilikni yanada rivojlantirishga oid qo‘shimcha chora-tadbirlar to‘g‘risida",
      smallTitle: "Kasanachilikni rivojlantirish, bu sohada yangi",
      category: "Kichik biznes loyihalar",
    },
    {
      id: 7,
      title:
        "Kasanachilikni yanada rivojlantirishga oid qo‘shimcha chora-tadbirlar to‘g‘risida",
      smallTitle: "Kasanachilikni rivojlantirish, bu sohada yangi",
      category: "Kichik biznes loyihalar",
    },
    {
      id: 8,
      title:
        "Kasanachilikni yanada rivojlantirishga oid qo‘shimcha chora-tadbirlar to‘g‘risida",
      smallTitle: "Kasanachilikni rivojlantirish, bu sohada yangi",
      category: "Kichik biznes loyihalar",
    },
    {
      id: 9,
      title:
        "Kasanachilikni yanada rivojlantirishga oid qo‘shimcha chora-tadbirlar to‘g‘risida",
      smallTitle: "Kasanachilikni rivojlantirish, bu sohada yangi",
      category: "Kichik biznes loyihalar",
    },
    {
      id: 10,
      title:
        "Kasanachilikni yanada rivojlantirishga oid qo‘shimcha chora-tadbirlar to‘g‘risida",
      smallTitle: "Kasanachilikni rivojlantirish, bu sohada yangi",
      category: "Kichik biznes loyihalar",
    },
  ];

  const courses = [
    {
      id: 1,
      img: cardImg1,
      category: "Kasanachilik",
      title: "An’anaviy taqinchoqlar yasash",
      description:
        "An'anaviy usulda tayyorlangan bilaguzuk, juda chiroyli va naqshli",
      details: { users: 123, duration: "2s. 32d.", lessons: 25, rating: 4.9 },
      author: "Otabek Rajabov",
      profileImg: profileImg1,
      oldPrice: 256000,
      newPrice: 200000,
      paid: "free",
      date: "11.11.2024",
      rating: 4.9,
      viewsCount: 123456,
      share: 32,
      lessons: [
        {
          id: 1,
          title: "Kirish darsi",
          videoUrl: "https://www.w3schools.com/html/movie.mp4",
          description: "Bu darsda dasturlash asoslari bilan tanishamiz.",
        },
        {
          id: 2,
          title: "O'zgaruvchilar va ma'lumot turlari",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          description:
            "O'zgaruvchilar va ma'lumot turlari haqida batafsil ma'lumot.",
        },
        {
          id: 3,
          title: "Funksiyalar va algoritmlar",
          videoUrl: "https://example.com/lesson3.mp4",
          description: "Funksiyalar va algoritmlar haqida asosiy tushunchalar.",
        },
      ],
    },
    {
      id: 2,
      img: cardImg1,
      category: "Kasanachilik",
      title: "An’anaviy taqinchoqlar yasash",
      description:
        "An'anaviy usulda tayyorlangan bilaguzuk, juda chiroyli va naqshli",
      details: { users: 123, duration: "2s. 32d.", lessons: 25, rating: 4.9 },
      author: "Otabek Rajabov",
      profileImg: profileImg1,
      oldPrice: 256000,
      newPrice: 200000,
      paid: "free",
      date: "11.11.2024",
      rating: 4.9,
      viewsCount: 123456,
      share: 32,
      lessons: [
        {
          id: 1,
          title: "Kirish darsi",
          videoUrl: "https://www.w3schools.com/html/movie.mp4",
          description: "Bu darsda dasturlash asoslari bilan tanishamiz.",
        },
        {
          id: 2,
          title: "O'zgaruvchilar va ma'lumot turlari",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          description:
            "O'zgaruvchilar va ma'lumot turlari haqida batafsil ma'lumot.",
        },
        {
          id: 3,
          title: "Funksiyalar va algoritmlar",
          videoUrl: "https://example.com/lesson3.mp4",
          description: "Funksiyalar va algoritmlar haqida asosiy tushunchalar.",
        },
      ],
    },
    {
      id: 3,
      img: cardImg3,
      category: "#kategoriya",
      title: "An’anaviy taqinchoqlar yasash",
      description:
        "An'anaviy usulda tayyorlangan bilaguzuk, juda chiroyli va naqshli",
      details: { users: 123, duration: "2s. 32d.", lessons: 25, rating: 4.9 },
      author: "Otabek Rajabov",
      profileImg: profileImg1,
      oldPrice: 256000,
      newPrice: 200000,
      isPaid: "paid",
    },
    {
      id: 4,
      img: cardImg4,
      category: "#kategoriya",
      title: "An’anaviy taqinchoqlar yasash",
      description:
        "An'anaviy usulda tayyorlangan bilaguzuk, juda chiroyli va naqshli",
      details: { users: 123, duration: "2s. 32d.", lessons: 25, rating: 4.9 },
      author: "Otabek Rajabov",
      profileImg: profileImg1,
      oldPrice: 256000,
      newPrice: 200000,
      isPaid: "paid",
    },
    {
      id: 5,
      img: cardImg1,
      category: "#kategoriya",
      title: "An’anaviy taqinchoqlar yasash",
      description:
        "An'anaviy usulda tayyorlangan bilaguzuk, juda chiroyli va naqshli",
      details: { users: 123, duration: "2s. 32d.", lessons: 25, rating: 4.9 },
      author: "Otabek Rajabov",
      profileImg: profileImg1,
      oldPrice: 256000,
      newPrice: 200000,
      isPaid: "paid",
    },
    {
      id: 6,
      img: cardImg2,
      category: "#kategoriya",
      title: "An’anaviy taqinchoqlar yasash",
      description:
        "An'anaviy usulda tayyorlangan bilaguzuk, juda chiroyli va naqshli",
      details: { users: 123, duration: "2s. 32d.", lessons: 25, rating: 4.9 },
      author: "Otabek Rajabov",
      profileImg: profileImg1,
      oldPrice: 256000,
      newPrice: 200000,
      isPaid: "paid",
    },
    {
      id: 7,
      img: cardImg3,
      category: "#kategoriya",
      title: "An’anaviy taqinchoqlar yasash",
      description:
        "An'anaviy usulda tayyorlangan bilaguzuk, juda chiroyli va naqshli",
      details: { users: 123, duration: "2s. 32d.", lessons: 25, rating: 4.9 },
      author: "Otabek Rajabov",
      profileImg: profileImg1,
      oldPrice: 256000,
      newPrice: 200000,
      isPaid: "paid",
    },
    {
      id: 8,
      img: cardImg4,
      category: "#kategoriya",
      title: "An’anaviy taqinchoqlar yasash",
      description:
        "An'anaviy usulda tayyorlangan bilaguzuk, juda chiroyli va naqshli",
      details: { users: 123, duration: "2s. 32d.", lessons: 25, rating: 4.9 },
      author: "Otabek Rajabov",
      profileImg: profileImg1,
      oldPrice: 256000,
      newPrice: 200000,
      isPaid: "paid",
    },
    {
      id: 9,
      img: cardImg1,
      category: "#kategoriya",
      title: "An’anaviy taqinchoqlar yasash",
      description:
        "An'anaviy usulda tayyorlangan bilaguzuk, juda chiroyli va naqshli",
      details: { users: 123, duration: "2s. 32d.", lessons: 25, rating: 4.9 },
      author: "Otabek Rajabov",
      profileImg: profileImg1,
      oldPrice: 256000,
      newPrice: 200000,
      isPaid: "paid",
    },
    {
      id: 10,
      img: cardImg2,
      category: "#kategoriya",
      title: "An’anaviy taqinchoqlar yasash",
      description:
        "An'anaviy usulda tayyorlangan bilaguzuk, juda chiroyli va naqshli",
      details: { users: 123, duration: "2s. 32d.", lessons: 25, rating: 4.9 },
      author: "Otabek Rajabov",
      profileImg: profileImg1,
      oldPrice: 256000,
      newPrice: 200000,
      isPaid: "paid",
    },
    {
      id: 11,
      img: cardImg3,
      category: "#kategoriya",
      title: "An’anaviy taqinchoqlar yasash",
      description:
        "An'anaviy usulda tayyorlangan bilaguzuk, juda chiroyli va naqshli",
      details: { users: 123, duration: "2s. 32d.", lessons: 25, rating: 4.9 },
      author: "Otabek Rajabov",
      profileImg: profileImg1,
      oldPrice: 256000,
      newPrice: 200000,
      isPaid: "paid",
    },
    {
      id: 12,
      img: cardImg4,
      category: "#kategoriya",
      title: "An’anaviy taqinchoqlar yasash",
      description:
        "An'anaviy usulda tayyorlangan bilaguzuk, juda chiroyli va naqshli",
      details: { users: 123, duration: "2s. 32d.", lessons: 25, rating: 4.9 },
      author: "Otabek Rajabov",
      profileImg: profileImg1,
      oldPrice: 256000,
      newPrice: 200000,
      isPaid: "paid",
    },
    {
      id: 13,
      img: cardImg1,
      category: "#kategoriya",
      title: "An’anaviy taqinchoqlar yasash",
      description:
        "An'anaviy usulda tayyorlangan bilaguzuk, juda chiroyli va naqshli",
      details: { users: 123, duration: "2s. 32d.", lessons: 25, rating: 4.9 },
      author: "Otabek Rajabov",
      profileImg: profileImg1,
      oldPrice: 256000,
      newPrice: 200000,
      isPaid: "paid",
    },
    {
      id: 14,
      img: cardImg2,
      category: "#kategoriya",
      title: "An’anaviy taqinchoqlar yasash",
      description:
        "An'anaviy usulda tayyorlangan bilaguzuk, juda chiroyli va naqshli",
      details: { users: 123, duration: "2s. 32d.", lessons: 25, rating: 1 },
      author: "Otabek Rajabov",
      profileImg: profileImg1,
      oldPrice: 256000,
      newPrice: 200000,
      isPaid: "paid",
    },
    {
      id: 15,
      img: cardImg3,
      category: "#kategoriya",
      title: "An’anaviy taqinchoqlar yasash",
      description:
        "An'anaviy usulda tayyorlangan bilaguzuk, juda chiroyli va naqshli",
      details: { users: 123, duration: "2s. 32d.", lessons: 25, rating: 4.9 },
      author: "Otabek Rajabov",
      profileImg: profileImg1,
      oldPrice: 256000,
      newPrice: 200000,
      isPaid: "paid",
    },
    {
      id: 16,
      img: cardImg4,
      category: "#kategoriya",
      title: "An’anaviy taqinchoqlar yasash",
      description:
        "An'anaviy usulda tayyorlangan bilaguzuk, juda chiroyli va naqshli",
      details: { users: 123, duration: "2s. 32d.", lessons: 25, rating: 4.9 },
      author: "Otabek Rajabov",
      profileImg: profileImg1,
      oldPrice: 256000,
      newPrice: 200000,
      isPaid: "paid",
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "Novvoy yordamchisi",
      price: "100 000 - 200 000 so’m/soatiga",
      details: ["2+ yil tajriba", "Qisqa vaqtli ish", "Toshkent shaxri"],
      authorImg: "authorImg1.png",
      author: "Dilshodbek Tursunov",
      date: "Bugun",
      views: 456,
      authorImg: authorImg,
      location: "Toshkent shaxri",
      timeWork: "To'liq stavka",
    },
    {
      id: 2,
      title: "Uy-joy ta'mirlash ustasi",
      price: "300 000 so’m/kuniga",
      details: ["2+ yil tajriba", "Doimiy ish", "Toshkent shaxri"],
      authorImg: "authorImg2.png",
      author: "Sardorbek Qodirov",
      date: "Bugun",
      views: 324,
      authorImg: authorImg2,
    },
    {
      id: 3,
      title: "Sotuvchi",
      price: "150 000 - 250 000 so’m/kuniga",
      details: ["1+ yil tajriba", "O'rindoshlik ish", "Andijon shaxri"],
      authorImg: "authorImg3.png",
      author: "Shohruhbek Salimov",
      date: "3 kun oldin",
      views: 789,
      authorImg: authorImg,
    },
    {
      id: 4,
      title: "Dasturchi",
      price: "20 000 000 - 30 000 000 so’m/oyiga",
      details: ["3+ yil tajriba", "Uydan ishlash", "Buxoro shaxri"],
      authorImg: "authorImg4.png",
      author: "Nilufar To'xtayeva",
      date: "Bugun",
      views: 1024,
      authorImg: authorImg2,
    },
    {
      id: 5,
      title: "Dasturchi",
      price: "20 000 000 - 30 000 000 so’m/oyiga",
      details: ["3+ yil tajriba", "Uydan ishlash", "Buxoro shaxri"],
      authorImg: "authorImg4.png",
      author: "Nilufar To'xtayeva",
      date: "Bugun",
      views: 1024,
      authorImg: authorImg2,
    },
    {
      id: 6,
      title: "Dasturchi",
      price: "20 000 000 - 30 000 000 so’m/oyiga",
      details: ["3+ yil tajriba", "Uydan ishlash", "Buxoro shaxri"],
      authorImg: "authorImg4.png",
      author: "Nilufar To'xtayeva",
      date: "Bugun",
      views: 1024,
      authorImg: authorImg2,
    },
    {
      id: 7,
      title: "Novvoy yordamchisi",
      price: "100 000 - 200 000 so’m/soatiga",
      details: ["2+ yil tajriba", "Qisqa vaqtli ish", "Toshkent shaxri"],
      authorImg: "authorImg1.png",
      author: "Dilshodbek Tursunov",
      date: "Bugun",
      views: 456,
      authorImg: authorImg,
    },
    {
      id: 8,
      title: "Uy-joy ta'mirlash ustasi",
      price: "300 000 so’m/kuniga",
      details: ["2+ yil tajriba", "Doimiy ish", "Toshkent shaxri"],
      authorImg: "authorImg2.png",
      author: "Sardorbek Qodirov",
      date: "Bugun",
      views: 324,
      authorImg: authorImg2,
    },
    {
      id: 9,
      title: "Sotuvchi",
      price: "150 000 - 250 000 so’m/kuniga",
      details: ["1+ yil tajriba", "O'rindoshlik ish", "Andijon shaxri"],
      authorImg: "authorImg3.png",
      author: "Shohruhbek Salimov",
      date: "3 kun oldin",
      views: 789,
      authorImg: authorImg,
    },
    {
      id: 10,
      title: "Dasturchi",
      price: "20 000 000 - 30 000 000 so’m/oyiga",
      details: ["3+ yil tajriba", "Uydan ishlash", "Buxoro shaxri"],
      authorImg: "authorImg4.png",
      author: "Nilufar To'xtayeva",
      date: "Bugun",
      views: 1024,
      authorImg: authorImg2,
    },
    {
      id: 11,
      title: "Dasturchi",
      price: "20 000 000 - 30 000 000 so’m/oyiga",
      details: ["3+ yil tajriba", "Uydan ishlash", "Buxoro shaxri"],
      authorImg: "authorImg4.png",
      author: "Nilufar To'xtayeva",
      date: "Bugun",
      views: 1024,
      authorImg: authorImg2,
    },
    {
      id: 12,
      title: "Dasturchi",
      price: "20 000 000 - 30 000 000 so’m/oyiga",
      details: ["3+ yil tajriba", "Uydan ishlash", "Buxoro shaxri"],
      authorImg: "authorImg4.png",
      author: "Nilufar To'xtayeva",
      date: "Bugun",
      views: 1024,
      authorImg: authorImg2,
    },
    {
      id: 13,
      title: "Novvoy yordamchisi",
      price: "100 000 - 200 000 so’m/soatiga",
      details: ["2+ yil tajriba", "Qisqa vaqtli ish", "Toshkent shaxri"],
      authorImg: "authorImg1.png",
      author: "Dilshodbek Tursunov",
      date: "Bugun",
      views: 456,
      authorImg: authorImg,
    },
    {
      id: 14,
      title: "Uy-joy ta'mirlash ustasi",
      price: "300 000 so’m/kuniga",
      details: ["2+ yil tajriba", "Doimiy ish", "Toshkent shaxri"],
      authorImg: "authorImg2.png",
      author: "Sardorbek Qodirov",
      date: "Bugun",
      views: 324,
      authorImg: authorImg2,
    },
    {
      id: 15,
      title: "Sotuvchi",
      price: "150 000 - 250 000 so’m/kuniga",
      details: ["1+ yil tajriba", "O'rindoshlik ish", "Andijon shaxri"],
      authorImg: "authorImg3.png",
      author: "Shohruhbek Salimov",
      date: "3 kun oldin",
      views: 789,
      authorImg: authorImg,
    },
    {
      id: 16,
      title: "Dasturchi",
      price: "20 000 000 - 30 000 000 so’m/oyiga",
      details: ["3+ yil tajriba", "Uydan ishlash", "Buxoro shaxri"],
      authorImg: "authorImg4.png",
      author: "Nilufar To'xtayeva",
      date: "Bugun",
      views: 1024,
      authorImg: authorImg2,
    },
    {
      id: 17,
      title: "Dasturchi",
      price: "20 000 000 - 30 000 000 so’m/oyiga",
      details: ["3+ yil tajriba", "Uydan ishlash", "Buxoro shaxri"],
      authorImg: "authorImg4.png",
      author: "Nilufar To'xtayeva",
      date: "Bugun",
      views: 1024,
      authorImg: authorImg2,
    },
    {
      id: 18,
      title: "Dasturchi",
      price: "20 000 000 - 30 000 000 so’m/oyiga",
      details: ["3+ yil tajriba", "Uydan ishlash", "Buxoro shaxri"],
      authorImg: "authorImg4.png",
      author: "Nilufar To'xtayeva",
      date: "Bugun",
      views: 1024,
      authorImg: authorImg2,
    },
  ];

  const services = [
    {
      id: 1,
      heroImg: heroImg,
      title: "Tandir yasash",
      price: "100 000 - 200 000 so’m/soatiga",
      details: ["2+ yil tajriba", "Qisqa vaqtli ish", "Toshkent shaxri"],
      authorImg: "authorImg1.png",
      author: "Dilshodbek Tursunov",
      date: "2 soat oldin",
      views: 456,
      authorImg: authorImg,
      location: "Toshkent shaxri",
      timeWork: "To'liq stavka",
    },
    {
      id: 2,
      heroImg: heroImg,
      title: "Pishiriq pishirish xizmatlari",
      price: "100 000 - 200 000 so’m/soatiga",
      details: ["2+ yil tajriba", "Qisqa vaqtli ish", "Toshkent shaxri"],
      authorImg: "authorImg1.png",
      author: "Dilshodbek Tursunov",
      date: "2 soat oldin",
      views: 456,
      authorImg: authorImg,
      location: "Toshkent shaxri",
      timeWork: "To'liq stavka",
    },
    {
      id: 3,
      heroImg: heroImg,
      title: "Front end dasturchi",
      price: "100 000 - 200 000 so’m/soatiga",
      details: ["2+ yil tajriba", "Qisqa vaqtli ish", "Toshkent shaxri"],
      authorImg: "authorImg1.png",
      author: "Dilshodbek Tursunov",
      date: "2 soat oldin",
      views: 456,
      authorImg: authorImg,
      location: "Toshkent shaxri",
      timeWork: "To'liq stavka",
    },
    {
      id: 4,
      heroImg: heroImg,
      title: "Marketing mutaxasis",
      price: "100 000 - 200 000 so’m/soatiga",
      details: ["2+ yil tajriba", "Qisqa vaqtli ish", "Toshkent shaxri"],
      authorImg: "authorImg1.png",
      author: "Dilshodbek Tursunov",
      date: "2 soat oldin",
      views: 456,
      authorImg: authorImg,
      location: "Toshkent shaxri",
      timeWork: "To'liq stavka",
    },
    {
      id: 5,
      heroImg: heroImg,
      title: "Bosh buhgalter",
      price: "100 000 - 200 000 so’m/soatiga",
      details: ["2+ yil tajriba", "Qisqa vaqtli ish", "Toshkent shaxri"],
      authorImg: "authorImg1.png",
      author: "Dilshodbek Tursunov",
      date: "2 soat oldin",
      views: 456,
      authorImg: authorImg,
      location: "Toshkent shaxri",
      timeWork: "To'liq stavka",
    },
  ];
  const [token, setToken] = useState("");
  const [refresh, setRefresh] = useState("");
  const [followedCourses, setFollowedCourses] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("UZ");
  const [languages, setLanguages] = useState(["RU", "EN"]);
  const [isOpen, setIsOpen] = useState(false);
  const [signupSuccess, setSignUpSuccess] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState(null);
  const [activeLink, setActiveLink] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({role: 'user'})
  useEffect(() => {
    const tokenn = localStorage.getItem("access_token");
    if (tokenn) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <MyContext.Provider
      value={{
        products,
        newsList,
        documents,
        courses,
        isAuthenticated,
        setIsAuthenticated,
        followedCourses,
        setFollowedCourses,
        announcements,
        selectedLanguage,
        setSelectedLanguage,
        languages,
        setLanguages,
        isOpen,
        setIsOpen,
        signupSuccess,
        setSignUpSuccess,
        token,
        setToken,
        refresh,
        setRefresh,
        setLoginSuccess,
        loginSuccess,
        isAdmin,
        setIsAdmin,
        data,
        setData,
        services,
        activeLink,
        setActiveLink,
        user,
        setUser
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
