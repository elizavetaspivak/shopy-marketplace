import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Grid, Title } from '@mantine/core';

import { productApi } from '../../resources/product';
import { CreateNewProduct } from './components/createNewProduct';
import { PrivateProduct } from './components/privateProduct';

const Products: NextPage = () => {
  const { data: products } = productApi.useGetMyProducts();

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <Title order={2}>Your Products</Title>

      <Grid gutter="sm">
        <CreateNewProduct />
        {products?.results?.map((p) => <PrivateProduct key={p._id} product={p} />)}
      </Grid>
    </>
  );
};

export default Products;
