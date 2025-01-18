const usersServerUrl            = "https://api.users.kasanabozor.uz/api/";
const eCommerseServerUrl        = "https://api.ecommerse.kasanabozor.uz/api/";
const coursesServerUrl          = "http://127.0.0.1:8902/api/";
const announcementsServerUrl    = "https://api.announcements.kasanabozor.uz/api/";
const mediaServerUrl            = "https://media.kasanabozor.uz/media/"
const messagingServerUrl        = "https://ws.messaging.kasanabozor.uz/";


const formatLink = (link) => {
  return String(link).replaceAll('/media', '');
}

export {
  usersServerUrl,
  eCommerseServerUrl,
  coursesServerUrl,
  announcementsServerUrl,
  messagingServerUrl,
  mediaServerUrl,
  formatLink
};

