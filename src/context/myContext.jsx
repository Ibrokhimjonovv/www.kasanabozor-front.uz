<<<<<<< HEAD
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { usersServerUrl, eCommerseServerUrl } from "../SuperVars";
=======
// src/MyContext.js
import React, { createContext, useEffect, useState } from "react";
>>>>>>> 93d4ab598bebfcdd83611ed0f0d2f643fd9a3237


export const MyContext = createContext(null);

export const MyContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newsList] = useState([]);
  const [documents] = useState([]);
  const [courses] = useState([]);
  const [announcements] = useState([]);

<<<<<<< HEAD
  const [isAuthenticated, setIsAuthenticated] = useState(false);
=======
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

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [ refresh, setRefresh ] = useState("");
>>>>>>> 93d4ab598bebfcdd83611ed0f0d2f643fd9a3237
  const [followedCourses, setFollowedCourses] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("UZ"); // Boshlang'ich til
  const [languages, setLanguages] = useState(["RU", "EN"]); // Dropdowndagi boshqa tillar
  const [isOpen, setIsOpen] = useState(false);
  const [signupSuccess, setSignUpSuccess] = useState("");
<<<<<<< HEAD

  const loadContextData = async () => {
    try {
      const userResponse = await axios.post(`${usersServerUrl}accounts/get-me/`);
      setIsAuthenticated(userResponse.data.status === 'ok');
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false);
    }

    try {
      const productsResponse = await axios.get(`${eCommerseServerUrl}products/popular/`);
      if (productsResponse.data.status === "ok") {
        setProducts(productsResponse.data.results);
        console.log(productsResponse.data);
      }
    } catch (err) {
      console.error(err);
    }

    try {
      const categoriesResponse = await axios.get(`${eCommerseServerUrl}categories/list/`);
      if (categoriesResponse.data.status === "ok") {
        setCategories(categoriesResponse.data.results);
	console.log(categoriesResponse.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let isMounted = true; // To prevent setting state on unmounted component

    const loadData = async () => {
      if (isMounted) {
        await loadContextData();
      }
    };

    loadData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [usersServerUrl]); // Ensure usersServerUrl is a dependency if it's dynamic
=======
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // LocalStorage dan access_tokenni olish
    const tokenn = localStorage.getItem("access_token");
  
    // Agar access_token mavjud bo'lsa, isAuthenticated ni true qilamiz
    if (tokenn) {
      setIsAuthenticated(true);
    }
  }, []);
>>>>>>> 93d4ab598bebfcdd83611ed0f0d2f643fd9a3237

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
<<<<<<< HEAD
	categories
=======
        token, setToken,
        refresh, setRefresh,
        setLoginSuccess,
        loginSuccess,
        isAdmin,
        setIsAdmin,
        data,
        setData
>>>>>>> 93d4ab598bebfcdd83611ed0f0d2f643fd9a3237
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
