import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";

export function useLoadingWithRefresh() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  //when you have to do something when the page is loaded
  //in this case we are doing in root component
  useEffect(() => {
    //making server request for /api/refresh
    //anonymous function ()() invoking directly and taking one callback function
    (async () => {
      try {
        //returns response object having data
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/refresh`,
          {
            withCredentials: true,
          }
        );

        //once the data will get contains user and token will dispatch to the store
        dispatch(setAuth(data));

        //once everything done will stop loading
        setLoading(false);

        console.log(data);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  });

  return { loading };
}
