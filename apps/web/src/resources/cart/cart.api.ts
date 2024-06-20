import { useMutation, useQuery } from '@tanstack/react-query';

import { apiService } from 'services';

import queryClient from '../../query-client';
import { sendNotification } from '../../pages/components/notifications/notification';

interface CreateCartResponce {
  productId: string;
}

export type CardResponce = {
  _id: string;
  quantity: number;
  product: {
    title: string;
    imageUrl: string;
    price: number;
  };
  paymentDate: string | null;
};

export const useCreateCart = <T>() =>
  useMutation<CreateCartResponce, unknown, T>({
    mutationFn: (data: T) => apiService.post('/cart/create', data),
    onSuccess: (data) => {
      sendNotification('Everything is okay', 'Your product was added to cart', 'teal');
    },
  });

export const useGetCart = () =>
  useQuery<CardResponce[]>({
    queryKey: ['cart'],
    queryFn: () => apiService.get('/cart/list'),
  });

export const useGetHistory = () =>
  useQuery<CardResponce[]>({
    queryKey: ['history'],
    queryFn: () => apiService.get('/cart/history'),
  });

export const useGetCartCounts = () =>
  useQuery<{ results: any[] }>({
    queryKey: ['cartCount'],
    queryFn: () => apiService.get('/cart/counts'),
  });

export const useUpdateCart = <T extends { id: string; quantity: number }>() =>
  useMutation<any, unknown, T>({
    mutationFn: (data: T) => apiService.put(`/cart/${data.id}`, { quantity: data.quantity }),
    onSuccess: (item) => {
      queryClient.setQueryData(['cart'], (prev: CardResponce[]) =>
        prev.map((cart) => (cart._id === item._id ? item : cart)),
      );
      sendNotification('Everything is okay', 'Your product was updated successfully', 'teal');
    },
  });

export const useCheckoutCart = () =>
  useMutation({
    mutationFn: () => apiService.post(`/cart/create-checkout-session`),
  });

export const useRemoveCart = <T extends { id: string }>() =>
  useMutation<any, unknown, T>({
    mutationFn: (data: T) => apiService.delete(`/cart/${data.id}`),
    onSuccess: (item) => {
      queryClient.setQueryData(['cart'], (prev: CardResponce[]) => prev.filter((cart) => cart._id !== item._id));
      queryClient.invalidateQueries({ queryKey: ['cartCount'] });
      sendNotification('Everything is okay', 'Your product was deleted successfully', 'teal');
    },
  });
