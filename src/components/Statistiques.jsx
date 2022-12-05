import { createStyles, Group, Paper, SimpleGrid, Text } from '@mantine/core';
import { FaUserGraduate } from 'react-icons/fa';
import { FcMoneyTransfer } from 'react-icons/fc';
import { GrTransaction } from 'react-icons/gr'
import { useQuery } from 'react-query';
import { getCompteCount } from '../services/compteService';
import { getEtudiantCount } from '../services/etudiantService';
import { getOperationsCount } from '../services/operationService';

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
    color: "white"
  },

  icon: {
   color: 'white'
  },

  title: {
    color: "white",
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));


const  Statistiques = () => {
  const { classes } = useStyles();

  const qcc = ['get_compte_count'];
  const {data:CompteCount} = useQuery(qcc, () => getCompteCount());

  const qoc = ['get_operation_count'];
  const {data:OperationCount} = useQuery(qoc, () => getOperationsCount());

  const qec = ['get_etudiant_count'];
  const {data:EtudiantCount} = useQuery(qec, () => getEtudiantCount());

  return (
    <div className={classes.root}>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'xs', cols: 1 },
        ]}
      >
        <Paper withBorder p="md" radius="md" className="bg-blue-500">
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
             Compte
          </Text>
          <FcMoneyTransfer className="text-white" size={50} stroke={1.5} />
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{CompteCount}</Text>
        </Group>

        <Text size="xs" color="dimmed" mt={7} className="text-white">
          Nombre total de Compte crées
        </Text>
      </Paper>
      <Paper withBorder p="md" radius="md" className="bg-green-500">
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            Transactions
          </Text>
          <GrTransaction className={classes.icon} size={50} stroke={1.5} />
        </Group>

        <Group align="flex-end" spacing="xs" mt={25} className="text-white">
          <Text className={classes.value}>{OperationCount}</Text>
        </Group>

        <Text size="xs" color="dimmed" mt={7} className="text-white">
          Nombre total de Transactions
        </Text>
      </Paper>
      <Paper withBorder p="md" radius="md" className="bg-amber-500">
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            Etudiants
          </Text>
          <FaUserGraduate className={classes.icon} size={50} stroke={1.5} />
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{EtudiantCount}</Text>
        </Group>

        <Text size="xs" color="dimmed" mt={7} className="text-white">
          Nombre Total d'étudiants
        </Text>
      </Paper>
      </SimpleGrid>
    </div>
  );
}

export default Statistiques;