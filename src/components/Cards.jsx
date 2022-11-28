import { createStyles, Card, Text, SimpleGrid, UnstyledButton, Group } from '@mantine/core';

import { FcMoneyTransfer } from 'react-icons/fc'
import { Link } from 'react-router-dom';
import Services from './Services';


const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    width: '100%'
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: 90,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
    },
  },
}));


function Cards() {
  const { classes, theme } = useStyles();

  return (
    <>
    <Services />
  <div className="flex items-center justify-center w-1/2 mx-auto my-36">
        <Card withBorder radius="md" className={classes.card}>
            <Group position="apart">
              <Text className={classes.title}>DEPOT</Text>
            </Group>
            <SimpleGrid cols={1} mt="md">
              <Link to="/dashboard/depot" className={classes.item}>
              <UnstyledButton >
              <div className="flex flex-col items-center justify-center">
                <FcMoneyTransfer color={theme?.colors.green[6]} size={32} />
              <Text size="xs" mt={7}>
              DEPOT COMPTE E-CAMPUS
              </Text>
              </div>
            </UnstyledButton>
              </Link>
            </SimpleGrid>
          </Card>
  </div>
    </>
  )
}

export default Cards