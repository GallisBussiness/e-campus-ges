import { GiPayMoney } from 'react-icons/gi'
import { createStyles, Card, Text, SimpleGrid, UnstyledButton, Group, LoadingOverlay } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getServices } from '../services/serviceService';
import { AbilityContext, Can } from '../casl/can';
import { useContext } from 'react';

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
  

function Services() {
    const { classes } = useStyles();
    const ability = useContext(AbilityContext);
    const key = ['getAllServices'];
    const {data: services, isLoading} = useQuery(key, () => getServices());
  return (
    <>
          <Can I="manage" a="ticket" ability={ability}>
             <LoadingOverlay visible={isLoading} overlayBlur={2} />
     <div className="flex items-center justify-center w-1/2 mx-auto my-36">
        <Card withBorder radius="md" className={classes.card}>
            <Group position="apart">
              <Text className={classes.title}>PAIEMENT</Text>
            </Group>
            <SimpleGrid cols={3} mt="md">
            {services?.map((s,k) => (
                 <Link to={`/dashboard/services/${s._id}`} key={k} className={classes.item}>
              <UnstyledButton >
              <div className="flex flex-col items-center justify-center">
              <GiPayMoney size={40} />
              <Text size="xs" mt={7} className="uppercase text-xl font-bold">
                {s.nom}
              </Text>
              </div>
            </UnstyledButton>
              </Link>
            ))}
             
            </SimpleGrid>
          </Card>
  </div>
          </Can>
   
    </>
  )
}

export default Services