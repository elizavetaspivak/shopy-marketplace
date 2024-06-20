import { Card, Grid, Group, Image, Text } from '@mantine/core';
import { BasicButton } from '../../../components/basic-button/basicButton';
import React from 'react';
import { ProductResponce } from '../../../../resources/product/product.api';
import queryClient from '../../../../query-client';
import { useCreateCart } from '../../../../resources/cart/cart.api';

type ProductProps = {
  product: ProductResponce;
};

export const Product = ({ product }: ProductProps) => {
  const { mutate: createCart } = useCreateCart();

  const handleCreateCart = (id: string) => {
    createCart(
      { productId: id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['cartCount'] });
        },
      },
    );
  };

  return (
    <Grid.Col span={4} key={product._id}>
      <Card w="100%" h="100%" shadow="sm" padding="xs" radius="lg" withBorder>
        <Card.Section style={{ position: 'relative' }}>
          <Image fit="cover" src={product.imageUrl} height={160} alt="Norway" />
        </Card.Section>

        <Group justify="space-between" mt="xs" mb="xs">
          <Text style={{ fontSize: '20px' }} fw={700}>
            {product.title}
          </Text>
        </Group>

        <Group justify="space-between" mt="xs" mb="xs">
          <Text fw={500} style={{ fontSize: '14px' }} size="sm" c="dimmed">
            Price:
          </Text>
          <Text style={{ fontSize: '20px' }} fw={700} size="sm">
            ${product.price}
          </Text>
        </Group>

        <BasicButton
          fullWidth
          onClick={() => handleCreateCart(product._id)}
          variant={'filled'}
          text={' Add to Cart'}
          backGroundColor={'blue'}
          marginTop={'md'}
          radius="md"
        />
      </Card>
    </Grid.Col>
  );
};
