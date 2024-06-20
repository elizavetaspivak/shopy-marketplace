import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Anchor, Box } from '@mantine/core';
import { ShopyBaloon } from 'public/images';
import Link from 'next/link';
import { RoutePath } from '../../../../routes';
import { BasicButton } from '../../../components/basic-button/basicButton';
import classes from './emptyPage.module.css';

const EmptyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <Box className={classes.container}>
        <Box className={classes.contentBox}>
          <ShopyBaloon style={{ width: '45%' }} />
          <Box fz={'20px'} fw={'bold'}>
            Oops, there's nothing here yet!
          </Box>
          <Box fz={'14px'} mt={'20px'}>
            You haven't made any purchases yet.
          </Box>
          <Box fz={'14px'} mb={'20px'}>
            Go to the marketplace and make purchases.
          </Box>
          <Anchor component={Link} href={RoutePath.Marketplace} c="#2B77EB">
            <BasicButton backGroundColor={'#2B77EB'} variant={'filled'} text={'Go To Marketplace'} />
          </Anchor>
        </Box>
      </Box>
    </>
  );
};

export default EmptyPage;
