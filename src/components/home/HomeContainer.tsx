"use client";
import React, { useEffect, useState } from "react";
import List from "./List";
import { CryptoDataType } from "@/app/utils/types";

const HomeContainer = () => {
  const endpoint = `https://api.coinlore.net/api/tickers/`;
  const [data, setData] = useState<CryptoDataType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10; // No of items per page
  const fetchNore = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${endpoint}`);
      const result = await response.json();
      if (result && result.data) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    (async () => {
      await fetchNore();
    })();
  }, []);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (page < Math.ceil(data.length / itemsPerPage)) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="text-black font-spaceGrotesk bg-white rounded-lg w-fit mx-auto">
      <table className="text-start shadow-2xl rounded-lg lg:min-w-[800px] max-w-4xl">
        <thead className="hidden md:block ">
          <tr className="bg-white *:text-start rounded-t-lg grid grid-cols-4 font-bold px-3 py-2">
            {/* i could have used object.keys to dynamically render the header but not possible since we are not using the keys */}
            <th>💰 Coin</th>
            <th>🗒️ Code</th>
            <th>🤑 Price</th>
            <th>📈 Total Supply</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <>
              {Array.from({ length: 10 }).map((_, index) => {
                return (
                  <tr key={index}>
                    <td
                      colSpan={4}
                      className={`${
                        index % 2 === 0 ? "bg-[#bcbcbc]" : "bg-white"
                      } animate-pulse h-10`}
                    ></td>
                  </tr>
                );
              })}
            </>
          )}
          {!loading && data.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No data found
              </td>
            </tr>
          )}
          {!loading &&
            data.length > 0 &&
            paginatedData.map((item, index) => {
              return <List key={item.id} item={item} index={index} />;
            })}
        </tbody>

        <tfoot>
          {/* the buttons could also become a component as well for reusability */}
          <tr className="flex justify-between items-end px-3 py-2 font-bold">
            <td>
              {page > 1 && (
                <button
                  onClick={handlePrevPage}
                  className="flex gap-2 items-center active:border-yellow-300 active:border"
                >
                  <svg
                    width="16px"
                    height="20px"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 9H5.414l3.293-3.293a.999.999 0 10-1.414-1.414l-5 5a.999.999 0 000 1.414l5 5a.997.997 0 001.414 0 .999.999 0 000-1.414L5.414 11H17a1 1 0 100-2z"
                      fill="black"
                    />
                  </svg>
                  <span>Previous</span>
                </button>
              )}
            </td>
            <td>
              <button
                onClick={handleNextPage}
                className="flex gap-2 items-center active:border-yellow-300 active:border"
              >
                <span>Next</span>
                <svg
                  width="16px"
                  height="20px"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.707 9.293l-5-5a.999.999 0 10-1.414 1.414L14.586 9H3a1 1 0 100 2h11.586l-3.293 3.293a.999.999 0 101.414 1.414l5-5a.999.999 0 000-1.414z"
                    fill="black"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default HomeContainer;
