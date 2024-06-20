import React, {NextPage} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {Alert, Anchor, Button, Group, PasswordInput, Stack, TextInput, Title} from '@mantine/core';
import {zodResolver} from '@hookform/resolvers/zod';
import {IconAlertCircle} from '@tabler/icons-react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {accountApi} from 'resources/account';

import {handleError} from 'utils';

import {RoutePath} from 'routes';

import {EMAIL_REGEX} from 'app-constants';

const schema = z.object({
  email: z.string().toLowerCase().regex(EMAIL_REGEX, 'Email format is incorrect.'),
  password: z.string().min(1, 'Please enter password'),
});

type SignInParams = z.infer<typeof schema> & { credentials?: string };

const SignIn: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInParams>({ resolver: zodResolver(schema) });

  const { mutate: signIn, isPending: isSignInPending } = accountApi.useSignIn<SignInParams>();

  const onSubmit = (data: SignInParams) =>
    signIn(data, {
      onError: (e) => handleError(e, setError),
    });

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>

      <Stack w={400} gap={20}>
        <Stack gap={32}>
          <Title style={{fontSize: '26px'}}>Sign In</Title>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={20}>
              <TextInput
                {...register('email')}
                label="Email Address"
                placeholder="Enter email address"
                error={errors.email?.message}
                radius='md'
                w="408px"
              />

              <PasswordInput
                {...register('password')}
                label="Password"
                placeholder="Enter password"
                error={errors.password?.message}
                radius='md'
                w="408px"
              />

              {errors.credentials && (
                <Alert icon={<IconAlertCircle />} color="red">
                  {errors.credentials.message}
                </Alert>
              )}

            </Stack>

            <Button type="submit" loading={isSignInPending}  radius='md' fullWidth mt={32} bg='#2B77EB'>
              Sign in
            </Button>
          </form>
        </Stack>

        <Stack gap={32}>

          <Group justify="center" gap={12}>
            Don’t have an account?
            <Anchor component={Link} href={RoutePath.SignUp} c='#2B77EB'>
              Sign up
            </Anchor>
          </Group>
        </Stack>
      </Stack>
    </>
  );
};

export default SignIn;
