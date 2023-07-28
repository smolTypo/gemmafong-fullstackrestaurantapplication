import { gql, useQuery } from "@apollo/client";
import { centsToDollars } from "@/utils/centsToDollars";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";

import Image from "next/image";
import Loader from "@/components/Loader";
import React, { useState } from "react"; // Add the React and useState imports

import Link from "next/link"; // Add the Link import

const GET_RESTAURANT_DISHES = gql`
  query ($id: ID!) {
    restaurant(id: $id) {
      data {
        id
        attributes {
          name
          dishes {
            data {
              id
              attributes {
                name
                description
                priceInCents
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

function DishCard({ data }) {
  const { addItem, setShowCart } = useAppContext();

  function handleAddItem() {
    addItem(data);
    setShowCart(true);
  }

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="h-full bg-gray-100 rounded-2xl">
        <Image
          className="w-full rounded-2xl"
          height={300}
          width={300}
          src={`${
            process.env.STRAPI_URL || "https://strapi-7u75.onrender.com"
          }${data.attributes.image.data.attributes.url}`}
          alt=""
        />
        <div className="p-8">
          <div className="group inline-block mb-4" href="#">
            <h3 className="font-heading text-xl text-gray-900 hover:text-gray-700 group-hover:underline font-black">
              {data.attributes.name}
            </h3>
            <h2>${centsToDollars(data.attributes.priceInCents)}</h2>
          </div>
          <p className="text-sm text-gray-500 font-bold">
            {data.attributes.description}
          </p>
          <div className="flex flex-wrap md:justify-center -m-2">
            <div className="w-full md:w-auto p-2 my-6">
              <button
                className="block w-full px-12 py-3.5 text-lg text-center text-white font-bold bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-600 rounded-full"
                onClick={handleAddItem}
              >
                + Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Restaurant() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.id, query: "" },
  });

  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  if (error) return "Error Loading Dishes";
  if (loading) return <Loader />;

  const restaurant = data?.restaurant?.data?.attributes;

  if (!restaurant) return <h1>No Dishes Found</h1>;

  const filteredDishes = restaurant.dishes.data.filter((dish) =>
    dish.attributes.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-green-600">{restaurant.name}</h1>

      <br></br>
      {/* Search Bar */}
      <div className="mb-6">
        <input
          className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          type="text"
          placeholder="Search dishes"
          value={query}
          onChange={handleSearch}
        />
      </div>

     <div className="text-left mt-8">
        <Link
          href="/"
          passHref
          className="block text-green-600 font-semibold hover:underline"
        >
          &larr; Back to All Restaurants
        </Link>
      </div>
            
      <div className="py-16 px-8 bg-white rounded-3xl">
        <div className="max-w-7xl mx-auto">
          {filteredDishes.length > 0 ? (
            <div className="flex flex-wrap -m-4 mb-6">
              {filteredDishes.map((res) => (
                <DishCard key={res.id} data={res} />
              ))}
            </div>
          ) : (
            <p>No dishes found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

