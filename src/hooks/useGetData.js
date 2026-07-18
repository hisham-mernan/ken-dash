import { useEffect, useState } from "react";
import axiosInstance from "../service/axiosInstance";

function useGetData(endpoint, formatter, fetchOnLoadPage = true, setValue) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [refetchData, setRefetchData] = useState();
  const fetchData = async () => {
    if (!fetchOnLoadPage) return;
    try {
      setLoading(true);
      const response = await axiosInstance.get(endpoint);
      const fetchedData = response.data;

      if (formatter) {
        setData(formatter(fetchedData) || []);
      } else if (setValue) {
        Object.entries(fetchedData).map(([key, value]) => {
          setValue(key, value);
        });
      } else {
        setData(fetchedData || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);

      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (fetchOnLoadPage) {
      fetchData();
    }
  }, []);
  useEffect(() => {
    if (refetchData) {
      fetchData();
    }
  }, [refetchData]);

  return { data, setData, loading, fetchData, error, setRefetchData };
}

export default useGetData;
