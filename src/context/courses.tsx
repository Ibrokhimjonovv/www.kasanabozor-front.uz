import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { coursesApi } from "../server";

import {
  CourseCategory,
  Course,
  CoursesContextType,
  CoursesProviderProps,
} from "@/types/courses";

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

const CoursesProvider: React.FC<CoursesProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [topCourses, setCoursesTop] = useState<Course[]>([]);
  const [newCourses, setNewCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(`${coursesApi}home-data/`);
        if (response.status === 200) {
          setCategories(response.data.categories);
          setCoursesTop(response.data.top);
          console.log(response.data);

          setNewCourses(response.data.new);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <CoursesContext.Provider
      value={{ categories, topCourses, newCourses, loading }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export { CoursesContext, CoursesProvider };
