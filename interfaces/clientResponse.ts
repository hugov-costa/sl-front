import { Client } from "./client";

export interface CreateClientResponse {
  message: string;
}

export interface DeleteClientResponse {
  message: string;
}

export interface GetClientResponse {
  data: Client;
}

export interface ListClientsResponse {
  data: Client[];
}

export interface UpdateClientResponse {
  message: string;
}
