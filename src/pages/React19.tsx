import { useState, useRef, useOptimistic, useActionState, startTransition } from 'react';
import { Icon } from '@iconify/react';
import { 
  Card, 
  Button, 
  Section, 
  Badge, 
  Container,
  Stack,
  Grid,
  Cluster,
  CodeBlock
} from '../components/ui'

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  timestamp: number;
}

export function React19() {
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: '1',
      text: 'Learn useOptimistic hook',
      completed: true,
      timestamp: Date.now() - 60000
    },
    {
      id: '2', 
      text: 'Implement optimistic updates',
      completed: false,
      timestamp: Date.now() - 30000
    }
  ]);

  const formRef = useRef<HTMLFormElement>(null);

  // React 19 useOptimistic demo - proper pattern
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, action: { type: 'add' | 'toggle' | 'delete', payload: TodoItem | { id: string } | null }) => {
      switch (action.type) {
        case 'add':
          return [...state, action.payload];
        case 'toggle':
          return state.map(todo => 
            todo.id === action.payload.id 
              ? { ...todo, completed: !todo.completed }
              : todo
          );
        case 'delete':
          return state.filter(todo => !todo.completed);
        default:
          return state;
      }
    }
  );

  // React 19 useActionState demo - proper pattern
  async function submitMessage(prevState: { success: boolean; message?: string; error?: string }, formData: FormData) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const title = formData.get('title') as string;
      const description = formData.get('description') as string;
      
      if (!title || !description) {
        return { error: 'Please fill in all fields', success: false };
      }
      
      // Simulate successful submission
      return { message: 'Feedback submitted successfully!', success: true };
    } catch (error) {
      return { error: 'Failed to submit feedback', success: false };
    }
  }

  const [state, submitAction, isPending] = useActionState(submitMessage, { success: false });
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  async function addTodo() {
    setIsAddingTodo(true);
    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      text: `New todo ${Date.now()}`,
      completed: false,
      timestamp: Date.now()
    };

    startTransition(() => {
      // Optimistically add the todo
      addOptimisticTodo({ type: 'add', payload: newTodo });
    });

    // Simulate API call to persist the todo
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Update actual state after API success
      setTodos(current => [...current, newTodo]);
    } catch (error) {
      // In a real app, you'd handle the error and maybe remove the optimistic update
      console.error('Failed to add todo:', error);
    } finally {
      setIsAddingTodo(false);
    }
  }

  async function toggleTodo(id: string) {
    const todo = optimisticTodos.find(t => t.id === id);
    if (!todo) return;

    // Optimistically toggle the todo
    startTransition(() => {
      addOptimisticTodo({ type: 'toggle', payload: { id } });
    });

    // Update the actual state
    setTodos(current => 
      current.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  function deleteCompletedTodos() {
    // Optimistically delete completed todos
    startTransition(() => {
      addOptimisticTodo({ type: 'delete', payload: null });
    });

    // Update the actual state
    setTodos(current => current.filter(todo => !todo.completed));
  }


  return (
    <div className="page-transition-container">
      {/* Hero Section */}
      <Section variant="hero" size="lg">
        <Container size="wide">
          <Stack gap="xl" align="center">
            <Icon icon="logos:react" className="text-6xl" />
            <Section.Header centered>
              <Section.Title size="3xl" gradient>
                React 19 Features
              </Section.Title>
              <Section.Subtitle>
                Explore the latest React capabilities including useOptimistic, useActionState, 
                Server Actions, and concurrent rendering improvements
              </Section.Subtitle>
            </Section.Header>
          </Stack>
        </Container>
      </Section>

      {/* useOptimistic Demo */}
      <Section variant="content" size="lg">
        <Container size="wide">
          <Section.Header>
            <Badge variant="primary" icon="mdi:lightning-bolt">
              Hook Demo
            </Badge>
            <Section.Title size="xl">useOptimistic Hook</Section.Title>
            <Section.Subtitle>
              Instant UI updates with automatic rollback on failure
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Grid columns="auto-fit" minWidth="350px" gap="2xl" className="grid--responsive">
              <Card variant="default" size="lg">
                <Card.Header>
                  <Card.Title>Interactive Demo</Card.Title>
                </Card.Header>
                <Card.Content>
                  <Stack gap="lg">
                    <Button 
                      onClick={addTodo} 
                      icon={isAddingTodo ? "mdi:loading" : "mdi:plus"} 
                      disabled={isAddingTodo}
                      loading={isAddingTodo}
                      fullWidth
                    >
                      {isAddingTodo ? 'Adding Todo...' : 'Add Todo Optimistically'}
                    </Button>

                    <Stack gap="sm">
                      {optimisticTodos.map(todo => (
                        <Card 
                          key={todo.id}
                          variant="default"
                          size="sm"
                          interactive
                          onClick={() => toggleTodo(todo.id)}
                          className={`${(todo as TodoItem & { pending?: boolean }).pending ? 'todo-pending' : ''} ${todo.completed ? 'todo-strikethrough' : ''}`}
                        >
                          <Card.Content>
                            <Cluster gap="sm" justify="between" align="center">
                              <Cluster gap="sm" align="center">
                                <Icon 
                                  icon={todo.completed ? 'mdi:check-circle' : 'mdi:circle-outline'} 
                                  className="text-accent"
                                />
                                <span className={todo.completed ? 'todo-completed' : ''}>{todo.text}</span>
                              </Cluster>
                              <span className="meta-text">
                                {new Date(todo.timestamp).toLocaleTimeString()}
                              </span>
                            </Cluster>
                          </Card.Content>
                        </Card>
                      ))}
                    </Stack>

                    {optimisticTodos.some(todo => todo.completed) && (
                      <Button 
                        onClick={deleteCompletedTodos} 
                        variant="danger"
                        icon="mdi:delete" 
                        fullWidth
                      >
                        Delete Completed Todos ({optimisticTodos.filter(todo => todo.completed).length})
                      </Button>
                    )}
                  </Stack>
                </Card.Content>
              </Card>

              <Card variant="info" size="lg">
                <Card.Header>
                  <Card.Title>Code Example</Card.Title>
                </Card.Header>
                <Card.Content>
                  <CodeBlock language="typescript">
{`// React 19 useOptimistic
const [optimisticTodos, addOptimisticTodo] = useOptimistic(
  todos,
  (state, newTodo) => [...state, newTodo]
);

// Optimistic update
startTransition(() => {
  addOptimisticTodo(newTodo);
});`}
                  </CodeBlock>
                </Card.Content>
              </Card>
            </Grid>
          </Section.Content>
        </Container>
      </Section>

      {/* useActionState Demo */}
      <Section variant="feature" size="lg">
        <Container size="wide">
          <Section.Header>
            <Badge variant="success" icon="mdi:form-select">
              Form Handling
            </Badge>
            <Section.Title size="xl">useActionState Hook</Section.Title>
            <Section.Subtitle>
              Advanced form handling with built-in state management
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Grid columns="auto-fit" minWidth="350px" gap="2xl" className="grid--responsive">
              <Card variant="default" size="lg">
                <Card.Header>
                  <Card.Title>Interactive Form</Card.Title>
                </Card.Header>
                <Card.Content>
                  <form action={submitAction}>
                    <Stack gap="lg">
                      <Stack gap="xs">
                        <label htmlFor="title" className="field-label">Title</label>
                        <input 
                          id="title"
                          name="title"
                          type="text" 
                          placeholder="Enter feedback title"
                          className="form-input"
                          required
                        />
                      </Stack>

                      <Stack gap="xs">
                        <label htmlFor="description" className="field-label">Description</label>
                        <textarea 
                          id="description"
                          name="description"
                          placeholder="Describe your feedback"
                          rows={4}
                          className="form-input"
                          required
                        />
                      </Stack>

                      <Button 
                        type="submit" 
                        disabled={isPending}
                        loading={isPending}
                        icon={isPending ? "mdi:loading" : "mdi:send"}
                        fullWidth
                      >
                        {isPending ? 'Submitting...' : 'Submit Feedback'}
                      </Button>

                      {state.success && state.message && (
                        <div className="status-message status-message--success">
                          <Icon icon="mdi:check-circle" className="text-success" />
                          <span className="text-success">{state.message}</span>
                        </div>
                      )}

                      {state.error && (
                        <div className="status-message status-message--error">
                          <Icon icon="mdi:alert-circle" className="text-error" />
                          <span className="text-error">{state.error}</span>
                        </div>
                      )}
                    </Stack>
                  </form>
                </Card.Content>
              </Card>

              <Card variant="info" size="lg">
                <Card.Header>
                  <Card.Title>Code Example</Card.Title>
                </Card.Header>
                <Card.Content>
                  <CodeBlock language="typescript">
{`// React 19 useActionState
async function submitMessage(prevState, formData) {
  const title = formData.get('title');
  return { message: 'Success!', success: true };
}

const [state, submitAction, isPending] = useActionState(
  submitMessage, 
  { success: false }
);

// Form with action
<form action={submitAction}>
  <input name="title" required />
  <button disabled={isPending}>Submit</button>
</form>`}
                  </CodeBlock>
                </Card.Content>
              </Card>
            </Grid>
          </Section.Content>
        </Container>
      </Section>

      {/* Concurrent Features */}
      <Section variant="content" size="lg">
        <Container size="wide">
          <Section.Header centered>
            <Badge variant="warning" icon="mdi:cached">
              Performance
            </Badge>
            <Section.Title size="xl">Concurrent Features</Section.Title>
            <Section.Subtitle>
              Improved rendering performance and user experience
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Grid columns="auto-fit" minWidth="280px" gap="xl">
              {[
                {
                  icon: 'mdi:timer',
                  title: 'Time Slicing',
                  description: 'Break up long-running work to keep the UI responsive'
                },
                {
                  icon: 'mdi:priority-high',
                  title: 'Priority-based Updates',
                  description: 'Critical updates (like user input) get higher priority'
                },
                {
                  icon: 'mdi:pause',
                  title: 'Suspense Integration',
                  description: 'Better integration with Suspense for data fetching'
                },
                {
                  icon: 'mdi:transition',
                  title: 'Automatic Batching',
                  description: 'Multiple state updates batched for better performance'
                }
              ].map((feature, index) => (
                <Card key={`concurrent-${index}`} variant="feature" size="md">
                  <Card.Header icon={feature.icon}>
                    <Card.Title>{feature.title}</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <Card.Description>{feature.description}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Grid>
          </Section.Content>
        </Container>
      </Section>

      {/* Server Actions Preview */}
      <Section variant="feature" size="lg">
        <Container size="wide">
          <Section.Header centered>
            <Badge variant="info" icon="mdi:server">
              Server Actions
            </Badge>
            <Section.Title size="xl">Server Actions (Preview)</Section.Title>
            <Section.Subtitle>
              Server-side form handling with client-side benefits
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Grid columns="auto-fit" minWidth="350px" gap="2xl" className="grid--responsive">
              <Stack gap="lg">
                {[
                  {
                    icon: 'mdi:rocket',
                    title: 'Progressive Enhancement', 
                    description: 'Forms work without JavaScript, enhanced with React'
                  },
                  {
                    icon: 'mdi:security',
                    title: 'Built-in Security',
                    description: 'CSRF protection and request validation automatically handled'
                  },
                  {
                    icon: 'mdi:sync',
                    title: 'Seamless Integration',
                    description: 'Client and server state management unified'
                  }
                ].map((item, index) => (
                  <Card key={`server-action-${index}`} variant="default" size="sm">
                    <Card.Header icon={item.icon}>
                      <Card.Title size="md">{item.title}</Card.Title>
                    </Card.Header>
                    <Card.Content>
                      <Card.Description>{item.description}</Card.Description>
                    </Card.Content>
                  </Card>
                ))}
              </Stack>

              <Card variant="info" size="lg">
                <Card.Header>
                  <Card.Title>Server Action Example</Card.Title>
                </Card.Header>
                <Card.Content>
                  <CodeBlock language="typescript">
{`// Server Action (runs on server)
async function submitFeedback(formData: FormData) {
  'use server'
  
  const feedback = {
    title: formData.get('title'),
    description: formData.get('description')
  }
  
  await saveFeedback(feedback)
  redirect('/feedback/success')
}

// Client Component
<form action={submitFeedback}>
  <input name="title" />
  <button type="submit">Submit</button>
</form>`}
                  </CodeBlock>
                </Card.Content>
              </Card>
            </Grid>
          </Section.Content>
        </Container>
      </Section>

      {/* Migration Guide */}
      <Section variant="cta" size="lg">
        <Container size="wide">
          <Section.Header centered>
            <Badge variant="primary" icon="mdi:map">
              Migration
            </Badge>
            <Section.Title size="xl">Migration Guide</Section.Title>
            <Section.Subtitle>
              Step-by-step guide to upgrading to React 19
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Grid columns="auto-fit" minWidth="300px" gap="lg">
              {[
                {
                  step: '1',
                  title: 'Update Dependencies',
                  description: 'Upgrade React and React DOM to version 19',
                  code: 'npm install react@19 react-dom@19'
                },
                {
                  step: '2', 
                  title: 'Update TypeScript Types',
                  description: 'Install latest type definitions',
                  code: 'npm install @types/react@19 @types/react-dom@19'
                },
                {
                  step: '3',
                  title: 'Refactor Components',
                  description: 'Replace manual optimistic updates with useOptimistic',
                  code: 'const [optimisticState, addOptimistic] = useOptimistic(state, reducer)'
                },
                {
                  step: '4',
                  title: 'Update Forms', 
                  description: 'Migrate to useActionState for better form handling',
                  code: 'const [state, dispatch, isPending] = useActionState(action, initialState)'
                }
              ].map((step, index) => (
                <Card key={`migration-${step.step}`} variant="default" size="lg">
                  <Card.Header>
                    <Badge variant="primary" size="sm">{step.step}</Badge>
                    <Card.Title>{step.title}</Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <Stack gap="md">
                      <Card.Description>{step.description}</Card.Description>
                      <CodeBlock language="zsh">
                        {step.code}
                      </CodeBlock>
                    </Stack>
                  </Card.Content>
                </Card>
              ))}
            </Grid>
          </Section.Content>
        </Container>
      </Section>
    </div>
  );
}