import { Badge, Box, Card, Grid, Group, Image, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { DeleteProductIcon } from '../../components/icons/deleteProductIcon';
import React from 'react';
import { useDeleteProduct, useUpdateProduct } from '../../../resources/product/product.api';
import { Product } from 'app-types/src/product.types';
import { SaleStatus } from 'schemas/src/product.schema';

type PrivateProductProps = {
  product: Product;
};

export const PrivateProduct = ({ product }: PrivateProductProps) => {
  const { mutate: deleteProduct, isPending } = useDeleteProduct();
  const { mutate: updateProduct, isPending: isUpdate } = useUpdateProduct();

  return (
    <Grid.Col span={2.3} key={product._id}>
      <Card w="270px" h="266px" shadow="sm" padding="xs" radius="md" withBorder>
        <Card.Section style={{ position: 'relative' }}>
          <UnstyledButton
            style={{ position: 'absolute', top: 10, right: 10 }}
            onClick={() => deleteProduct({ productId: product._id })}
          >
            <ThemeIcon variant="white" radius="sm" size="md" color="gray">
              <Box w="60%">
                <DeleteProductIcon />
              </Box>
            </ThemeIcon>
          </UnstyledButton>
          <Image fit="cover" src={product.imageUrl} height={160} alt="Norway" />
          <UnstyledButton
            style={{ position: 'absolute', bottom: 10, right: 10 }}
            onClick={() =>
              updateProduct({
                id: product._id,
                saleStatus: product.saleStatus === SaleStatus.ON_SALE ? SaleStatus.SOLD : SaleStatus.ON_SALE,
              })
            }
          >
            {product.saleStatus === SaleStatus.ON_SALE ? (
              <Badge bg="#FEF4E6" c="#F79009">
                On sale
              </Badge>
            ) : (
              <Badge bg="#E8F7F0" c="#17B26A">
                Sold
              </Badge>
            )}
          </UnstyledButton>
        </Card.Section>

        <Group justify="space-between" mt="sm" mb="xs">
          <Text style={{ fontSize: '20px' }} fw={700}>
            {product.title}
          </Text>
        </Group>

        <Group justify="space-between" mt="sm" mb="xs">
          <Text fw={500} style={{ fontSize: '14px' }} size="sm" c="dimmed">
            Price:
          </Text>
          <Text style={{ fontSize: '20px' }} fw={700} size="sm">
            ${product.price}
          </Text>
        </Group>
      </Card>
    </Grid.Col>
  );
};
