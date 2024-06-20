import React from 'react';
import { NextPage } from 'next';
import { Box, Button, Flex, Image, Table, UnstyledButton } from '@mantine/core';
import { CardResponce, useRemoveCart, useUpdateCart } from '../../../../resources/cart/cart.api';
import { IconX } from '@tabler/icons-react';
import classes from './cartRow.module.css';

const CartRow: NextPage<{ cart: CardResponce }> = ({ cart }) => {
  const { mutate: updateCart } = useUpdateCart<{ id: string; quantity: number }>();
  const { mutate: removeCart } = useRemoveCart();

  const handleUpdateCart = (id: string, quantity: number) => {
    if (quantity > 0) {
      updateCart({ id, quantity });
    }
  };

  return (
    <>
      <Table.Tr key={cart.product?.title}>
        <Table.Td w={'600px'}>
          <Flex align="center" justify="flex-start">
            <Box className={classes.imageBox}>
              <Image
                fit="cover"
                m={'0 auto'}
                w={80}
                h={80}
                style={{ objectPosition: 'center', borderRadius: '8px' }}
                src={cart.product?.imageUrl}
              />
            </Box>

            <Box ml={'20px'} fw={'bold'} fz={'16px'}>
              {cart.product?.title}
            </Box>
          </Flex>
        </Table.Td>
        <Table.Td w={'150px'} align={'center'} mr={'100px'}>
          <Box mr={'30px'}>${cart.product?.price}</Box>
        </Table.Td>
        <Table.Td w={'120px'} align={'center'}>
          <Flex align="center" justify="space-between">
            <UnstyledButton onClick={() => handleUpdateCart(cart._id, cart.quantity - 1)} fz={'23px'} c={'gray'}>
              -
            </UnstyledButton>
            <Box>{cart.quantity}</Box>
            <UnstyledButton onClick={() => handleUpdateCart(cart._id, cart.quantity + 1)} fz={'23px'} c={'gray'}>
              +
            </UnstyledButton>
          </Flex>
        </Table.Td>
        <Table.Td align={'right'}>
          <Button
            variant="transparent"
            color="gray"
            size="xs"
            radius="xs"
            leftSection={<IconX size={16} />}
            onClick={() => removeCart({ id: cart._id })}
          >
            Remove
          </Button>
        </Table.Td>
      </Table.Tr>
    </>
  );
};

export default CartRow;
