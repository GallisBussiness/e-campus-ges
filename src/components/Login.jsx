import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Stack,
} from '@mantine/core';
import { useContext, useEffect} from 'react';
import { AbilityContext, Can } from '../casl/can';
import { AbilityBuilder, PureAbility } from '@casl/ability';

function updateAbility(ability, user) {
  const { can,cannot, rules } = new AbilityBuilder(PureAbility);

  if (user.role === 'admin') {
    can('manage', 'all');
  } else {
    cannot('create', 'depotr');
    can('create','depot')
  }

  ability.update(rules);
}


export function AuthenticationForm(props) {

  const ability = useContext(AbilityContext);
  

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  useEffect(() => {
    const user = {name: "Mamdou",role: "user"};
    updateAbility(ability, user)
  }, [ability]);

  return (
    <div className="flex items-center justify-center h-screen w-1/3 mx-auto">
    <Paper radius="md" p="xl" withBorder {...props} className="w-full">
      <Text size="lg" weight={500}>
        E-CAMPUS GESTION
      </Text>
      <Can I="create" a="depot" ability={ability}>
        <button onClick={()=> console.log('create depot')}>Create Depot</button>
      </Can>
      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="gallis@child.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
          />
        </Stack>

        <Group position="apart" mt="xl">
          <Button type="submit" className="bg-blue-700">Se Connecter</Button>
        </Group>
      </form>
    </Paper>
    </div>
    
  );
}