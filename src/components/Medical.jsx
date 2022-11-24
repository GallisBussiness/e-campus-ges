import { createStyles, Card, Text, SimpleGrid, UnstyledButton, Group } from '@mantine/core';
import { FaNotesMedical } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

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


function Medical() {

    const { classes, theme } = useStyles();

    const navigate = useNavigate()

    const goToOperation = (price) => {
      navigate('/dashboard/operation', {state: {price}})
    }

  return (
    <>
     <div className="flex items-center justify-center w-1/2 mx-auto my-36">
         <Card withBorder radius="md" className={classes.card}>
    <Group position="apart">
      <Text className={classes.title}>MEDICAL</Text>
    </Group>
    <SimpleGrid cols={1} mt="md">
    <UnstyledButton onClick={() => goToOperation(50)} className={classes.item}>
      <FaNotesMedical color={theme?.colors.red[6]} size={32} />
      <Text size="xs" mt={7}>
        CONSULTATIONS
      </Text>
    </UnstyledButton>
    </SimpleGrid>
  </Card>
     </div>
    </>
  )
}

export default Medical