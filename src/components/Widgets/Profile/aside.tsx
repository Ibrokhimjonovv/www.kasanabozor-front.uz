import { FC } from "react";
import { NavLink } from "react-router-dom";
import { CoursesIcon, ProfileIcon, StatisticsIcon } from "@/components/icons/profile";

const ProfileSideBarList = [
  {
    text: "Shaxsiy ma’lumotlarim",
    activeIcon: <ProfileIcon />,
    inactiveIcon: <ProfileIcon color="#767676" />,
    lead: "/profile/overview/",
  },
  {
    text: "Statistika",
    activeIcon: <StatisticsIcon />,
    inactiveIcon: <StatisticsIcon color="#767676" />,
    lead: "/profile/statistics/",
  },
  {
    text: "Mahsulotlarim",
    activeIcon: <ProfileIcon />,
    inactiveIcon: <ProfileIcon color="#767676" />,
    lead: "/profile/products/",
  },
  {
    text: "Yoqqan mahsulotlar",
    activeIcon: <ProfileIcon />,
    inactiveIcon: <ProfileIcon color="#767676" />,
    lead: "/profile/liked-products/",
  },
  {
    text: "E’lonlarim",
    activeIcon: <ProfileIcon />,
    inactiveIcon: <ProfileIcon color="#767676" />,
    lead: "/profile/announcements/",
  },
  {
    text: "Saqlangan e’lonlar",
    activeIcon: <ProfileIcon />,
    inactiveIcon: <ProfileIcon color="#767676" />,
    lead: "/profile/saved-announcements/",
  },
  {
    text: "Kurslarim",
    activeIcon: <CoursesIcon />,
    inactiveIcon: <CoursesIcon color="#767676" />,
    lead: "/profile/courses/",
  },
  {
    text: "Yoqqan kurslar",
    activeIcon: <ProfileIcon />,
    inactiveIcon: <ProfileIcon color="#767676" />,
    lead: "/profile/liked-courses/",
  },
  {
    text: "Xabarlar",
    activeIcon: <ProfileIcon />,
    inactiveIcon: <ProfileIcon color="#767676" />,
    lead: "/profile/messages/",
  },
  {
    text: "Xabarnomalar",
    activeIcon: <ProfileIcon />,
    inactiveIcon: <ProfileIcon color="#767676" />,
    lead: "/profile/notifications/",
  },
];

const GenerateProfileSideBarLinkClass = ({
  isActive,
}: {
  isActive: boolean;
}): string => {
  if (isActive) {
    return "flex items-center gap-1 py-1.5 px-3 rounded-lg bg-white text-brand font-semibold transition-colors";
  } else {
    return "flex items-center gap-1 py-1.5 px-3 rounded-lg text-text hover:text-branding hover:bg-branding transition-colors";
  }
};

const ProfileSideBarComponent: FC = () => {
  return (
    <>
      <div className="aside" style={{ minHeight: "calc(100vh - 128px)" }}>
        <div className="content flex gap-y-1 flex-col bg-white py-5 px-1.5 rounded-lg">
          {ProfileSideBarList.map((value, index) => (
            <NavLink
              key={index}
              to={value.lead}
              className={GenerateProfileSideBarLinkClass}
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <span className="icon">
                    {isActive ? value.activeIcon : value.inactiveIcon}
                  </span>
                  <span className="text">{value.text}</span>
                </>
              )}
            </NavLink>
          ))}

          <NavLink
            to={"/auth/logout/"}
            className="flex items-center gap-1 py-1 px-3 rounded-lg bg-white text-red-400 font-semibold transition-colors"
          >
            <span className="icon"></span>
            <span className="text">Chiqish</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default ProfileSideBarComponent;
