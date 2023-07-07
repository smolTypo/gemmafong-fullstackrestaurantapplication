import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import Loader from "./Loader";

const QUERY = gql`
  query GetRestaurants {
    restaurants {
      data {
        id
        attributes {
          name
          description
          image {
            data {
              attributes {
                url
              }
            }
          }
          dishes {
            id
            name
            description
            price
          }
        }
      }
    }
  }
`;

function RestaurantCard({ data }) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="h-full bg-gray-100 rounded-2xl">
        <Image
          className="w-full rounded-2xl"
          height={300}
          width={300}
          src={`${process.env.STRAPI_URL || "https://strapi-7u75.onrender.com"}${
            data.attributes.image.data[0].attributes.url
          }`}
          alt=""
        />
        <div className="p-8">
          <h3 className="mb-3 font-heading text-xl text-gray-900 hover:text-gray-700 group-hover:underline font-black">
            {data.attributes.name}
          </h3>
          <p className="text-sm text-gray-500 font-bold">
            {data.attributes.description}
          </p>
          <div className="flex flex-wrap md:justify-center -m-2">
            <div className="w-full md:w-auto p-2 my-6">
              <Link
                className="block w-full px-12 py-3.5 text-lg text-center text-white font-bold bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-600 rounded-full"
                href={`/restaurant/${data.id}`}
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RestaurantList(props) {
  const { loading, error, data } = useQuery(QUERY);

  if (error) return "Error loading restaurants";
  if (loading) return <Loader />;

  const restaurant = data.restaurants.data.find(
    (restaurant) => restaurant.id === props.restaurantId
  );

  if (!restaurant) return <h1>Restaurant not found</h1>;

  const searchQuery = restaurant.attributes.dishes.filter((dish) =>
    dish.name.toLowerCase().includes(props.query.toLowerCase())
  );

  if (searchQuery.length !== 0) {
    return (
      <div className="py-16 px-8 bg-white rounded-3xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap -m-4 mb-6">
            {searchQuery.map((dish) => (
              <div key={dish.id}>
                <h4 className="mt-4 text-gray-900 font-bold">{dish.name}</h4>
                <p className="text-gray-500">{dish.description}</p>
                <p className="text-gray-700 font-bold">${dish.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>No Dishes Found</h1>;
  }
}

export default RestaurantList;

