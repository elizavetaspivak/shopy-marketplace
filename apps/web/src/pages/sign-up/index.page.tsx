import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  Anchor,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { accountApi } from 'resources/account';

import { handleError } from 'utils';

import { RoutePath } from 'routes';
import config from 'config';

import { EMAIL_REGEX, PASSWORD_REGEX } from 'app-constants';

const schema = z.object({
  email: z.string().toLowerCase().regex(EMAIL_REGEX, 'Email format is incorrect.'),
  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      'The password must contain 6 or more characters with at least one letter (a-z) and one number (0-9).',
    ),
});

type SignUpParams = z.infer<typeof schema>;

type SignUpResponse = { signupToken?: string };

const passwordRules = [
  {
    title: 'Be 6-50 characters',
    done: false,
  },
  {
    title: 'Have at least one letter',
    done: false,
  },
  {
    title: 'Have at least one number',
    done: false,
  },
];

const SignUp: NextPage = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [signupToken, setSignupToken] = useState<string | null>(null);
  const [registered, setRegistered] = useState(false);

  const [passwordRulesData, setPasswordRulesData] = useState(passwordRules);
  const [opened, setOpened] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignUpParams>({ resolver: zodResolver(schema) });

  const passwordValue = watch('password', '').trim();

  useEffect(() => {
    const updatedPasswordRulesData = [...passwordRules];

    updatedPasswordRulesData[0].done = passwordValue.length >= 6 && passwordValue.length <= 50;
    updatedPasswordRulesData[1].done = /[a-zA-Z]/.test(passwordValue);
    updatedPasswordRulesData[2].done = /\d/.test(passwordValue);

    setPasswordRulesData(updatedPasswordRulesData);
  }, [passwordValue]);

  const { mutate: signUp, isPending: isSignUpPending } = accountApi.useSignUp<SignUpParams>();

  const onSubmit = (data: SignUpParams) =>
    signUp(data, {
      onSuccess: (response: SignUpResponse) => {
        if (response.signupToken) setSignupToken(response.signupToken);

        setRegistered(true);
        setEmail(data.email);
      },
      onError: (e) => handleError(e, setError),
    });

  const label = (
    <SimpleGrid cols={1} spacing="xs" p={4}>
      <Text>Password must:</Text>

      {passwordRulesData.map((ruleData) => (
        <Checkbox key={ruleData.title} label={ruleData.title} checked={ruleData.done} color="white" iconColor="dark" />
      ))}
    </SimpleGrid>
  );

  if (registered) {
    redirect('/marketplace');
    return;
  }

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>

      <Stack w={400} gap={20}>
        <Stack gap={32}>
          <Title style={{ fontSize: '26px' }}>Sign Up</Title>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={20}>
              <TextInput
                {...register('email')}
                label="Email Address"
                placeholder="Enter email Address"
                error={errors.email?.message}
                radius="md"
                w="408px"
              />

              <Tooltip label={label} opened={opened} withArrow>
                <PasswordInput
                  {...register('password')}
                  label="Password"
                  placeholder="Enter password"
                  onFocus={() => setOpened(true)}
                  onBlur={() => setOpened(false)}
                  error={errors.password?.message}
                  radius="md"
                  w="408px"
                />
              </Tooltip>
            </Stack>

            <Button type="submit" loading={isSignUpPending} radius="md" fullWidth mt={32} bg="#2B77EB">
              Create Account
            </Button>
          </form>
        </Stack>

        <Stack gap={32}>
          <Group justify="center" gap={12}>
            Have an account?
            <Anchor component={Link} href={RoutePath.SignIn} c="#2B77EB">
              Sign In
            </Anchor>
          </Group>
        </Stack>
      </Stack>
    </>
  );
};

export default SignUp;
