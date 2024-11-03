import { CryptoDataType } from "@/app/utils/types";
import React from "react";

const List = ({ item, index }: { item: CryptoDataType; index: number }) => {
  return (
    <tr
      className={`
    ${
      index % 2 === 0 ? "bg-[#cfcece]" : "bg-white"
    } font-medium px-3 py-2 grid grid-cols-2 max-md:gap-4 md:grid-cols-4 *:whitespace-nowrap *:tracking-tight 
    `}
    >
      <td className="flex-col flex">
        <span className="font-bold md:hidden">💰 Coin</span>
        <span>{item.name}</span>
      </td>
      <td className="flex-col flex">
        <span className="font-bold md:hidden"> 🗒️ Code</span>
        <span>{item.symbol}</span>
      </td>
      <td className="flex flex-col">
        <span className="font-bold md:hidden">🤑 Price</span>
        <span>
          {parseFloat(item.price_usd).toLocaleString("en-US", {
            currency: "USD",
            style: "currency",
          })}
        </span>
      </td>
      <td className="flex flex-col">
        <span className="font-bold md:hidden">📈 Total Supply</span>
        <span>
          {item.tsupply} {item.symbol}
        </span>
      </td>
    </tr>
  );
};

export default List;
