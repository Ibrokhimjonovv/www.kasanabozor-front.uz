import { ReactNode } from "react";

interface CourseCategory {
  guid: string;
  meta: string;
  title: string;
}

interface Course {
  guid: string;
  meta: string;
  title: string;
  short_description: string;
  thumbnail: string;
  category: CourseCategory;
}

interface CoursesContextType {
  categories: CourseCategory[];
  topCourses: Course[];
  newCourses: Course[];
  loading: boolean;
}

interface CoursesProviderProps {
  children: ReactNode;
}

export { CourseCategory, Course, CoursesContextType, CoursesProviderProps };
