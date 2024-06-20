import { useMutation, useQuery } from '@tanstack/react-query';
import { Product } from 'app-types/src/product.types';

import { apiService } from 'services';

import queryClient from 'query-client';

import { ListResult } from '../../types';
import { SaleStatus } from 'schemas/src/product.schema';
import { sendNotification } from '../../pages/components/notifications/notification';

export type ProductResponce = {
  _id: string;
  title: string;
  price: number;
  userId: string;
  imageUrl: string;
  fileReference: string;
  createdOn?: Date | undefined;
  updatedOn?: Date | undefined;
  deletedOn?: Date | null | undefined;
};

export const useCreateProduct = <T>() =>
  useMutation<Product, unknown, T>({
    mutationFn: (data: any) => apiService.post('/product/upload', data),
    onSuccess: (data) => sendNotification('Everything is okay', 'Your product was created successfully', 'teal'),
  });

export const useDeleteProduct = <T>() =>
  useMutation<any, unknown, T>({
    mutationFn: (data: any) => apiService.delete('/product/delete', data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myproducts'],
      });
      sendNotification('Everything is okay', 'Your product was deleted successfully', 'teal');
    },
  });

export const useUpdateProduct = <T extends { id: string; saleStatus: SaleStatus }>() =>
  useMutation<any, unknown, T>({
    mutationFn: (data: any) => apiService.put(`/product/${data.id}`, data),
    onSuccess: (item) => {
      console.log(item, 'item');
      queryClient.setQueryData(['myproducts'], (prev: { results: Product[] }) => ({
        ...prev,
        results: prev.results.map((product) => (product._id === item._id ? item : product)),
      }));
      sendNotification('Everything is okay', 'Your product was updated successfully', 'teal');
    },
  });

export const useGetMyProducts = (options = {}) =>
  useQuery<{ results: Product[] }>({
    queryKey: ['myproducts'],
    queryFn: () => apiService.get('/product/private'),
    ...options,
  });

export const useGetProducts = <T>(options: T) =>
  useQuery<ListResult<ProductResponce>>({
    queryKey: ['products', options],
    queryFn: () => apiService.get('/product/pagination', options),
  });
