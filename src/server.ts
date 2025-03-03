const local: boolean = true;

let usersServerUrl: string | null = null;
let usersApi: string | null = null;
let onlineShopApi: string | null = null;
let eCommerseServerUrl: string | null = null;
let coursesServerUrl: string | null = null;
let announcementsServerUrl: string | null = null;
let announcementsApi: string | null = null;
let newsServerUrl: string | null = null;
let newsApi: string | null = null;
let mediaServerUrl: string | null = null;
let messagingServerUrl: string | null = null;

if (local) {
  usersServerUrl = "http://localhost:8900/api/";
  usersApi = "http://localhost:8900/api/";
  onlineShopApi = "http://localhost:8901/api/";
  eCommerseServerUrl = "http://localhost:8901/api/";
  coursesServerUrl = "http://localhost:8902/api/";
  announcementsServerUrl = "http://localhost:8903/api/";
  announcementsApi = "http://localhost:8902/api/";
  newsServerUrl = "http://localhost:8904/api/";
  newsApi = "http://localhost:8903/api/";
  mediaServerUrl = "http://localhost:8915/media/";
  messagingServerUrl = "http://localhost:8905/";
} else {
  usersServerUrl = "https://api.users.kasanabozor.uz/api/";
  usersApi = "http://192.168.1.19:8900/api/";
  onlineShopApi = "http://192.168.1.19:8901/api/";
  eCommerseServerUrl = "https://api.ecommerse.kasanabozor.uz/api/";
  coursesServerUrl = "https://192.168.1.19:8900/api/";
  announcementsServerUrl = "https://api.announcements.kasanabozor.uz/api/";
  announcementsApi = "http://192.168.1.19:8902/api/";
  newsServerUrl = "https://api.news.kasanabozor.uz/api/";
  newsApi = "http://api.news.kasanabozor.uz/api/";
  mediaServerUrl = "https://media.kasanabozor.uz/media/";
  messagingServerUrl = "https://ws.messaging.kasanabozor.uz/";
}

const formatLink = (link: string | undefined): string | undefined => {
  return link;
};

export {
  usersServerUrl,
  usersApi,
  onlineShopApi,
  eCommerseServerUrl,
  coursesServerUrl,
  announcementsServerUrl,
  announcementsApi,
  newsServerUrl,
  newsApi,
  messagingServerUrl,
  mediaServerUrl,
  formatLink,
};
