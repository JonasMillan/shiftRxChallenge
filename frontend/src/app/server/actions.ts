"use server";

import { getToken } from "./auth";
import { AuctionType, EditAuctionType, PostBid } from "../commons/types";
import { revalidatePath } from "next/cache";

export async function deleteAuction(id: number) {
  const token = await getToken();
  const response: Response = await fetch(`http://api:4200/api/auctions/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  let deleteResponse;
  if (response.ok) {
    deleteResponse = { success: true };
  } else {
    const errorData = await response.json();
    deleteResponse = { success: false, errorMessage: errorData.message };
  }
  revalidatePath("/dashboard");
  return deleteResponse;
}

export async function createAuction(params: AuctionType) {
  const token = await getToken();

  const response: Response = await fetch("http://api:4200/api/auctions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...params }),
  });

  let createResponse;
  if (response.ok) {
    createResponse = { success: true };
  } else {
    const errorData = await response.json();
    createResponse = { success: false, errorMessage: errorData.message };
  }
  revalidatePath("/dashboard");
  return createResponse;
}

export async function editAuction(params: EditAuctionType, auctionId: number) {
  const token = await getToken();
  const response: Response = await fetch(
    `http://api:4200/api/auctions/${auctionId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...params }),
    }
  );

  if (response.ok) {
    return { success: true };
  } else {
    const errorData = await response.json();
    return { success: false, errorMessage: errorData.message };
  }
}

export async function placeBit(params: PostBid, auctionId: number) {
  const token = await getToken();

  const response: Response = await fetch(
    `http://api:4200/api/auctions/${auctionId}/bid`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...params }),
    }
  );

  let createResponse;
  if (response.ok) {
    createResponse = { success: true };
  } else {
    const errorData = await response.json();
    createResponse = { success: false, errorMessage: errorData.message };
  }
  revalidatePath(`/auctions/${auctionId}`);
  return createResponse;
}