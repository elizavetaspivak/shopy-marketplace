import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Anchor, Box, Button } from '@mantine/core';
import { ShopyPaymentFailed } from 'public/images';
import Link from 'next/link';
import { RoutePath } from '../../../routes';
import { BasicButton } from '../../components/basic-button/basicButton';
import classes from './paymentFailed.module.css';

const PaymentFailed: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <Box className={classes.container}>
        <Box m={'0 auto'} h={'293px'} bg={'white'} className={classes.contentBox}>
          <ShopyPaymentFailed className={classes.icon} />
          <Box pt={'20px'} fz={'24px'} fw={600}>
            Payment Failed
          </Box>
          <Box pt={'15px'} fz={'16px'} c={'#767676'}>
            Sorry, your payment failed.
          </Box>
          <Box pb={'20px'} fz={'16px'} c={'#767676'}>
            Would you like to try again?
          </Box>
          <Anchor component={Link} href={RoutePath.Basket} c="#2B77EB">
            <BasicButton backGroundColor={'#2B77EB'} variant={'filled'} text={'Back To Cart'} />
          </Anchor>
        </Box>
      </Box>
    </>
  );
};

export default PaymentFailed;
