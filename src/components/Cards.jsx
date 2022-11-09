import { createStyles, Card, Text, SimpleGrid, UnstyledButton, Group } from '@mantine/core';
import { BiRestaurant } from 'react-icons/bi'
import { FaBriefcaseMedical } from 'react-icons/fa'
import { MdLocalCafe, MdSportsSoccer } from 'react-icons/md'
import { FcMoneyTransfer } from 'react-icons/fc'
import { Link } from 'react-router-dom';


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
  <div className="flex items-center justify-center w-1/2 mx-auto my-36">
        <Card withBorder radius="md" className={classes.card}>
            <Group position="apart">
              <Text className={classes.title}>PAIEMENT</Text>
            </Group>
            <SimpleGrid cols={3} mt="md">
              <Link to="/restauration" className={classes.item}>
              <UnstyledButton >
              <div className="flex flex-col items-center justify-center">
              <BiRestaurant color={theme?.colors.green[6]} size={32} />
              <Text size="xs" mt={7}>
              RESTAURATIONS
              </Text>
              </div>
            </UnstyledButton>
              </Link>
            <Link to="/medical" className={classes.item}>
            <UnstyledButton>
            <div className="flex flex-col items-center justify-center">
              <FaBriefcaseMedical color={theme?.colors.red[6]} size={32} />
              <Text size="xs" mt={7}>
                MEDICAL
              </Text>
              </div>
            </UnstyledButton>
            </Link>
            <UnstyledButton className={classes.item}>
              <MdSportsSoccer color={theme?.colors.cyan[6]} size={32} />
              <Text size="xs" mt={7}>
                SPORT
              </Text>
            </UnstyledButton>
            <UnstyledButton  className={classes.item}>
            <div className="flex flex-col items-center justify-center">
              <MdLocalCafe color={theme?.colors.orange[6]} size={32} />
              <Text size="xs" mt={7}>
              CAFETARIAT
              </Text>
              </div>
            </UnstyledButton>
            </SimpleGrid>
          </Card>
  </div>
  <div className="flex items-center justify-center w-1/2 mx-auto my-36">
        <Card withBorder radius="md" className={classes.card}>
            <Group position="apart">
              <Text className={classes.title}>DEPOT</Text>
            </Group>
            <SimpleGrid cols={1} mt="md">
              <Link to="/depot" className={classes.item}>
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