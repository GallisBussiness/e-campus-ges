import { createStyles, Card, Text, SimpleGrid, UnstyledButton, Group, LoadingOverlay } from '@mantine/core';
import {  MdQrCodeScanner} from 'react-icons/md';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getpaymentSubjectsByService } from '../services/paymentsubject';
import { getService } from '../services/serviceService';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.white,
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


function Service() {

    const {id} = useParams();
    const { classes } = useStyles();
    const navigate = useNavigate()
    const key = ['getAllPayement', id];
    const keys = ['getService', id];
    const {data: service} = useQuery(keys, () => getService(id));
    const {data: payements, isLoading} = useQuery(key, () => getpaymentSubjectsByService(id));

    const goToOperation = (price,payementId) => {
      navigate('/dashboard/operation', {state: {price, payement: payementId}})
    }


  return (
    <>
    <LoadingOverlay visible={isLoading} overlayBlur={2} />
     <div className="flex items-center justify-center w-1/2 mx-auto my-36">
         <Card withBorder radius="md" className={classes.card}>
    <Group position="apart">
      <Text className={classes.title}>{service?.nom?.toUpperCase()}</Text>
    </Group>
    <SimpleGrid cols={3} mt="md">

        {payements?.map((p,k) => (
        <UnstyledButton key={k}  onClick={() => goToOperation(p.prix, p._id)} className={classes.item}>
            <MdQrCodeScanner size={100} />
            <Text size="xs" mt={7} className="uppercase text-3xl font-bold">
                {p.nom}
            </Text>
        </UnstyledButton>
        ))}
    </SimpleGrid>
  </Card>
     </div>
 
    </>
  )
}

export default Service