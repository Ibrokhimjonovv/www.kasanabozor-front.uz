const local: boolean = true;

let usersApi: string | null = null;
let onlineShopApi: string | null = null;
let announcementsApi: string | null = null;
let newsApi: string | null = null;
let coursesApi: string | null = null;

if (local) {
  usersApi = "http://localhost:8900/api/";
  onlineShopApi = "http://localhost:8901/api/";
  coursesApi = "http://localhost:8904/api/";
  announcementsApi = "http://localhost:8902/api/";
  newsApi = "http://localhost:8903/api/";
} else {
  usersApi = "http://192.168.1.19:8900/api/";
  onlineShopApi = "http://192.168.1.19:8901/api/";
  announcementsApi = "http://192.168.1.19:8902/api/";
  newsApi = "http://192.168.1.19:8903/api/";
  coursesApi = "http://192.168.1.19:8904/api/";
}

export { usersApi, onlineShopApi, announcementsApi, newsApi, coursesApi };
