import { Anchor, Box, Card, Grid } from '@mantine/core';
import Link from 'next/link';
import { RoutePath } from '../../../../routes';
import { NewProductIcon } from '../../../components/icons/newProductIcon';
import React from 'react';
import classes from './createNewProduct.module.css';

export const CreateNewProduct = () => {
  return (
    <Grid.Col span={2.3}>
      <Anchor style={{ textDecoration: 'none' }} component={Link} href={RoutePath.CreateProduct} c="#2B77EB">
        <Card className={classes.card} w="270px" h="266px" shadow="md" padding="lg" radius="md" withBorder>
          <Box>
            <NewProductIcon />
          </Box>
          <Box c="#2B77EB" style={{ textDecoration: 'none' }}>
            New Product
          </Box>
        </Card>
      </Anchor>
    </Grid.Col>
  );
};
