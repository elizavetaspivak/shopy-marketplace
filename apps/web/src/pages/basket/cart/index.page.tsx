import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Box, Card, Flex, Group, Table, Text } from '@mantine/core';

import { CardResponce, useCheckoutCart, useGetCart } from '../../../resources/cart/cart.api';
import EmptyPage from '../components/emptyPage/emptyPage';
import CartRow from '../components/cartRow/cartRow';
import { BasicButton } from '../../components/basic-button/basicButton';
import { loadStripe } from '@stripe/stripe-js';
import config from '../../../config';
import classes from './cart.module.css';

const ths = (
  <Table.Tr c={'#767676'}>
    <Table.Th>Item</Table.Th>
    <Table.Th>Unit Price</Table.Th>
    <Table.Th>Quantity</Table.Th>
    <Table.Th />
  </Table.Tr>
);

const Cart: NextPage = () => {
  const { data: carts, isLoading: isCartLoading, isFetched } = useGetCart();
  const { mutateAsync: checkoutCart, isSuccess } = useCheckoutCart();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const price = carts?.reduce((acc, el) => acc + el.product?.price * el.quantity, 0);
    price && setTotalPrice(price);
  }, [carts]);

  const makePayment = async () => {
    if (config.STRIPE_PK) {
      const stripe = await loadStripe(config.STRIPE_PK);

      const test = await checkoutCart();

      const res = await stripe?.redirectToCheckout({ sessionId: test.id });

      if (res?.error) {
        console.log(res.error, 'error');
      }
    }
  };

  if (isFetched && carts && !carts.length) {
    return <EmptyPage />;
  }

  const rows = carts?.map((element: CardResponce) => <CartRow key={element._id} cart={element} />);

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <Flex justify="space-between" mt={'30px'}>
        <Box w="70%">
          <Table captionSide="bottom">
            <Table.Thead>{ths}</Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Box>
        <Box>
          <Card w="100%" shadow="sm" padding="xs" radius="md" withBorder>
            <Group justify="space-between" mt="xs" mb="xs">
              <Text className={classes.summary} fw={700}>
                Summary
              </Text>
            </Group>

            <Group justify="space-between" mt="xs" mb="xs">
              <Text fw={500} className={classes.totalPrice} size="sm" c="dimmed">
                Total price
              </Text>
              <Text className={classes.summary} fw={700} size="sm">
                ${totalPrice}
              </Text>
            </Group>

            <BasicButton
              fullWidth
              onClick={makePayment}
              variant={'filled'}
              text={'Proceed to Checkout'}
              backGroundColor={'blue'}
              marginTop={'md'}
            />
          </Card>
        </Box>
      </Flex>
    </>
  );
};

export default Cart;
