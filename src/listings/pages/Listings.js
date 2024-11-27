import React, {useState, useEffect} from "react";
import "./Listings.css";
import ListingList from "../components/ListingList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Listings = () => {
    const { isLoading, error, sendRequest } = useHttpClient();
    const [listings, setListings] = useState([]);


    useEffect(() => {
        const fetchListings = async () => {
          try {
            const responseData = await sendRequest("http://localhost:8080/api/properties");
            console.log(responseData);
            if (responseData && responseData.properties) {
            setListings(responseData.properties);
            } else {
              throw new Error("No properties found");
            }
          } catch (err) {
            console.error("Failed to fetch listings", err);
          }
        };

        fetchListings();
    }, [sendRequest]);

    if (isLoading) {
        return <LoadingSpinner />
      }
    
      if (error) {
        return <div>Error fetching listings: {error.message}</div>;
      }
    
      return <ListingList items={listings} />;
    };


export default Listings;