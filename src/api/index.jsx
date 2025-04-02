import axios from "axios";

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch movies:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchAllThumbnails = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies/thumbnail`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch movies:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchAllMovies = async (page, filters = {}, options) => {
  try {
    const params = new URLSearchParams({ page });
    if (filters.category) {
      params.append("genre", sanitizeAndFormatString(filters.category));
    }
    if (filters.country) {
      params.append("country", sanitizeAndFormatString(filters.country));
    }
    if (filters.sort) {
      const str = filters.sort.split(" ");
      params.append("sortKey", str[0].toLowerCase());
      params.append("sortValue", str[1].toLowerCase());
    }
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movies?${params.toString()}`,
      options
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch movies:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchSeries = async (page, filters = {}, options) => {
  try {
    const params = new URLSearchParams({ page });
    if (filters.category) {
      params.append("genre", sanitizeAndFormatString(filters.category));
    }
    if (filters.country) {
      params.append("country", sanitizeAndFormatString(filters.country));
    }
    if (filters.sort) {
      const str = filters.sort.split(" ");
      params.append("sortKey", str[0].toLowerCase());
      params.append("sortValue", str[1].toLowerCase());
    }
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movies/series?${params.toString()}`,
      options
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch movies:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchFeatureFilms = async (page, filters = {}, options) => {
  try {
    const params = new URLSearchParams({ page });
    if (filters.category) {
      params.append("genre", sanitizeAndFormatString(filters.category));
    }
    if (filters.country) {
      params.append("country", sanitizeAndFormatString(filters.country));
    }
    if (filters.sort) {
      const str = filters.sort.split(" ");
      params.append("sortKey", str[0].toLowerCase());
      params.append("sortValue", str[1].toLowerCase());
    }
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movies/feature-films?${params.toString()}`,
      options
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch movies:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
export const fetchTVShows = async (page, filters = {}, options) => {
  try {
    const params = new URLSearchParams({ page });
    if (filters.category) {
      params.append("genre", sanitizeAndFormatString(filters.category));
    }
    if (filters.country) {
      params.append("country", sanitizeAndFormatString(filters.country));
    }
    if (filters.sort) {
      const str = filters.sort.split(" ");
      params.append("sortKey", str[0].toLowerCase());
      params.append("sortValue", str[1].toLowerCase());
    }
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movies/tv-shows?${params.toString()}`,
      options
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch movies:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchAnimated = async (page, filters = {}, options) => {
  try {
    const params = new URLSearchParams({ page });
    if (filters.category) {
      params.append("genre", sanitizeAndFormatString(filters.category));
    }
    if (filters.country) {
      params.append("country", sanitizeAndFormatString(filters.country));
    }
    if (filters.sort) {
      const str = filters.sort.split(" ");
      params.append("sortKey", str[0].toLowerCase());
      params.append("sortValue", str[1].toLowerCase());
    }
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movies/animated?${params.toString()}`,
      options
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch movies:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchAllMyList = async (options) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies/my-list?`, options);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch movies:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const detailFilm = async (slug, options) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movies/detail/${slug}`,
      options
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch movies:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchMovies = async (keyword, pageNumber, options) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movies/search-films?keyword=${encodeURIComponent(
        keyword
      )}&page=${pageNumber}`,
      options
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch movies:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchAllCategories = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies/categories`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch movies:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchAllCountries = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies/countries`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch movies:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchAllRanking = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies/ranking`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch movies:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchAllNotifications = async (options) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movies/notifications`,
      options
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch all notifications", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const getMyProfile = async (options) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/profile`,
      options
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch all notifications", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const getDashboard = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/admin/dashboard`, {
        withCredentials: true
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch all notifications", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const fetchAllReport = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/admin/all-report`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch all notifications", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const fetchAllHistory = async (options) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/history`, options
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch all notifications", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const fetchAllResult = async (keyword) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movies/search-results?keyword=${encodeURIComponent(keyword)}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch all notifications", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

const sanitizeAndFormatString = (str) => {
  return str.split(" ").join("");
};