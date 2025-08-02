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
      {/* Revolutionary Hero Section */}
      <Section variant="hero" size="lg">
        <Container size="wide">
          <div className="react19-hero">
            <div className="react19-hero__background">
              <div className="react19-floating-react">
                <Icon icon="logos:react" className="react19-floating-react__icon" />
              </div>
              <div className="react19-particles"></div>
            </div>
            
            <div className="react19-hero__content">
              <div className="react19-hero__badge">
                <div className="react19-badge">
                  <div className="react19-badge__glow"></div>
                  <Icon icon="mdi:new-box" className="react19-badge__icon" />
                  <span className="react19-badge__text">React 19 - Now Available</span>
                </div>
              </div>
              
              <h1 className="react19-hero__title">
                <span className="react19-hero__title-main">React 19</span>
                <span className="react19-hero__title-highlight">Features & Examples</span>
                <span className="react19-hero__title-sub">Hands-On Learning</span>
              </h1>
              
              <p className="react19-hero__description">
                Learn about Server Actions, useOptimistic updates, and useActionState through 
                interactive examples and practical code demonstrations.
              </p>
              
              <div className="react19-hero__actions">
                <Button variant="primary" size="lg" icon="mdi:rocket-launch" elevated glowEffect="primary">
                  Experience React 19
                </Button>
                <Button variant="glass" size="lg" icon="mdi:play" className="react19-hero__demo-btn">
                  Watch Demo
                </Button>
              </div>
              
              <div className="react19-hero__metrics">
                <div className="react19-metric">
                  <div className="react19-metric__value">70%</div>
                  <div className="react19-metric__label">Less Boilerplate</div>
                </div>
                <div className="react19-metric">
                  <div className="react19-metric__value">2x</div>
                  <div className="react19-metric__label">Faster Development</div>
                </div>
                <div className="react19-metric">
                  <div className="react19-metric__value">∞</div>
                  <div className="react19-metric__label">Possibilities</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Why Upgrade Section */}
      <Section variant="feature" size="lg">
        <Container size="wide">
          <Section.Header centered>
            <Badge variant="success" icon="mdi:rocket-launch">
              Major Improvements
            </Badge>
            <Section.Title size="xl">Why Upgrade to React 19?</Section.Title>
            <Section.Subtitle>
              Revolutionary features that transform how you build modern web applications
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Grid columns="auto-fit" minWidth="300px" gap="xl">
              {[
                {
                  icon: 'mdi:server',
                  title: 'Server Actions',
                  description: 'Handle forms and server operations seamlessly without custom APIs',
                  highlight: 'New',
                  color: 'primary'
                },
                {
                  icon: 'mdi:lightning-bolt',
                  title: 'Optimistic Updates',
                  description: 'Instant UI updates with automatic rollback on errors',
                  highlight: 'Enhanced',
                  color: 'success'
                },
                {
                  icon: 'mdi:auto-fix',
                  title: 'Auto Compiler',
                  description: 'Automatic optimizations without manual memoization',
                  highlight: 'Preview',
                  color: 'warning'
                },
                {
                  icon: 'mdi:web',
                  title: 'Web Standards',
                  description: 'Better integration with native browser APIs and standards',
                  highlight: 'Improved',
                  color: 'info'
                }
              ].map((feature, index) => (
                <Card key={index} variant="feature" size="md" interactive>
                  <Card.Header>
                    <div className="feature-icon-container">
                      <Icon icon={feature.icon} className={`feature-icon feature-icon--${feature.color}`} />
                      <Badge variant={feature.color as any} size="sm">{feature.highlight}</Badge>
                    </div>
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

      {/* Stunning useOptimistic Demo */}
      <Section variant="content" size="lg">
        <Container size="wide">
          <div className="react19-demo-section">
            <div className="react19-demo-header">
              <div className="react19-demo-badge">
                <Icon icon="mdi:lightning-bolt" className="react19-demo-badge__icon" />
                <span>Lightning Fast</span>
              </div>
              <h2 className="react19-demo-title">
                useOptimistic <span className="react19-demo-title__highlight">Magic</span>
              </h2>
              <p className="react19-demo-subtitle">
                Watch as your UI updates instantly, even before the server responds
              </p>
            </div>

            <div className="react19-demo-showcase">
              <div className="react19-todo-app">
                <div className="react19-todo-header">
                  <h3 className="react19-todo-title">Modern Todo App</h3>
                  <div className="react19-todo-stats">
                    <span className="react19-todo-count">{optimisticTodos.length} tasks</span>
                    <span className="react19-todo-completed">{optimisticTodos.filter(t => t.completed).length} done</span>
                  </div>
                </div>
                
                <div className="react19-todo-add">
                  <Button 
                    onClick={addTodo} 
                    disabled={isAddingTodo}
                    loading={isAddingTodo}
                    className="react19-add-btn"
                    variant="primary"
                    size="lg"
                    icon={isAddingTodo ? "mdi:loading" : "mdi:plus"}
                  >
                    {isAddingTodo ? 'Creating magic...' : 'Add Task Instantly'}
                  </Button>
                </div>

                <div className="react19-todo-list">
                  {optimisticTodos.map((todo, index) => (
                    <div 
                      key={todo.id}
                      className={`react19-todo-item ${todo.completed ? 'react19-todo-item--completed' : ''} ${(todo as TodoItem & { pending?: boolean }).pending ? 'react19-todo-item--pending' : ''}`}
                      onClick={() => toggleTodo(todo.id)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="react19-todo-check">
                        <Icon 
                          icon={todo.completed ? 'mdi:check-circle' : 'mdi:circle-outline'} 
                          className="react19-todo-check__icon"
                        />
                      </div>
                      <div className="react19-todo-content">
                        <span className="react19-todo-text">{todo.text}</span>
                        <span className="react19-todo-time">
                          {new Date(todo.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="react19-todo-ripple"></div>
                    </div>
                  ))}
                </div>

                {optimisticTodos.some(todo => todo.completed) && (
                  <div className="react19-todo-cleanup">
                    <Button 
                      onClick={deleteCompletedTodos} 
                      variant="glass"
                      size="md"
                      icon="mdi:delete-sweep"
                      className="react19-cleanup-btn"
                    >
                      Clear Completed ({optimisticTodos.filter(todo => todo.completed).length})
                    </Button>
                  </div>
                )}
              </div>

              <div className="react19-code-panel">
                <div className="react19-code-header">
                  <div className="react19-code-tabs">
                    <div className="react19-code-tab react19-code-tab--active">useOptimistic.tsx</div>
                  </div>
                </div>
                <div className="react19-code-content">
                  <CodeBlock language="typescript">
{`// ✨ React 19 useOptimistic Hook
const [optimisticTodos, addOptimistic] = useOptimistic(
  todos,
  (state, action) => {
    switch (action.type) {
      case 'add':
        return [...state, action.payload]
      case 'toggle':
        return state.map(todo => 
          todo.id === action.payload.id 
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      default:
        return state
    }
  }
)

// 🚀 Instant UI updates
startTransition(() => {
  addOptimistic({ type: 'add', payload: newTodo })
})

// 🎯 Real API call happens in background
try {
  await saveTodoToServer(newTodo)
  setTodos(current => [...current, newTodo])
} catch (error) {
  // Auto rollback on error!
}`}
                  </CodeBlock>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Beautiful useActionState Demo */}
      <Section variant="feature" size="lg">
        <Container size="wide">
          <div className="react19-form-section">
            <div className="react19-form-header">
              <div className="react19-form-badge">
                <Icon icon="mdi:form-select" className="react19-form-badge__icon" />
                <span>Smart Forms</span>
              </div>
              <h2 className="react19-form-title">
                useActionState <span className="react19-form-title__highlight">Revolution</span>
              </h2>
              <p className="react19-form-subtitle">
                Forms that handle state, validation, and submission automatically
              </p>
            </div>

            <div className="react19-form-showcase">
              <div className="react19-modern-form">
                <div className="react19-form-container">
                  <div className="react19-form-glass">
                    <h3 className="react19-form-form-title">Contact Form</h3>
                    <p className="react19-form-form-subtitle">Experience the future of form handling</p>
                    
                    <form action={submitAction} className="react19-form-form">
                      <div className="react19-form-field">
                        <div className="react19-form-input-group">
                          <Icon icon="mdi:account" className="react19-form-input-icon" />
                          <input 
                            id="title"
                            name="title"
                            type="text" 
                            placeholder="Your name"
                            className="react19-form-input"
                            required
                          />
                          <div className="react19-form-input-focus"></div>
                        </div>
                      </div>

                      <div className="react19-form-field">
                        <div className="react19-form-textarea-group">
                          <Icon icon="mdi:message-text" className="react19-form-textarea-icon" />
                          <textarea 
                            id="description"
                            name="description"
                            placeholder="Tell us about your experience with React 19..."
                            rows={4}
                            className="react19-form-textarea"
                            required
                          />
                          <div className="react19-form-textarea-focus"></div>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isPending}
                        loading={isPending}
                        className="react19-form-submit"
                        variant="primary"
                        size="lg"
                        icon={isPending ? "mdi:loading" : "mdi:send"}
                        fullWidth
                      >
                        {isPending ? 'Sending message...' : 'Send Message'}
                      </Button>

                      {state.success && state.message && (
                        <div className="react19-form-success">
                          <Icon icon="mdi:check-circle" className="react19-form-success-icon" />
                          <span className="react19-form-success-text">{state.message}</span>
                        </div>
                      )}

                      {state.error && (
                        <div className="react19-form-error">
                          <Icon icon="mdi:alert-circle" className="react19-form-error-icon" />
                          <span className="react19-form-error-text">{state.error}</span>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>

              <div className="react19-form-code">
                <div className="react19-form-code-header">
                  <div className="react19-form-code-tabs">
                    <div className="react19-form-code-tab react19-form-code-tab--active">useActionState.tsx</div>
                  </div>
                </div>
                <div className="react19-form-code-content">
                  <CodeBlock language="typescript">
{`// 🎯 React 19 useActionState Hook
async function submitMessage(prevState, formData) {
  const name = formData.get('title')
  const message = formData.get('description')
  
  // Built-in validation
  if (!name || !message) {
    return { 
      error: 'Please fill in all fields', 
      success: false 
    }
  }
  
  try {
    // Automatic server handling
    await sendMessage({ name, message })
    return { 
      message: 'Thank you! Message sent successfully!', 
      success: true 
    }
  } catch (error) {
    return { 
      error: 'Failed to send message. Please try again.', 
      success: false 
    }
  }
}

// ✨ One hook handles everything
const [state, submitAction, isPending] = useActionState(
  submitMessage, 
  { success: false }
)

// 🚀 Zero boilerplate form
<form action={submitAction}>
  <input name="title" required />
  <textarea name="description" required />
  <button disabled={isPending}>Submit</button>
</form>`}
                  </CodeBlock>
                </div>
              </div>
            </div>
          </div>
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

      {/* Server Actions - The Game Changer */}
      <Section variant="feature" size="lg">
        <Container size="wide">
          <Section.Header centered>
            <Badge variant="info" icon="mdi:server">
              Revolutionary Feature
            </Badge>
            <Section.Title size="xl">Server Actions - The Game Changer</Section.Title>
            <Section.Subtitle>
              Eliminate boilerplate, enhance performance, and simplify full-stack development
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Grid columns="auto-fit" minWidth="400px" gap="2xl" className="grid--responsive">
              {/* Before vs After Comparison */}
              <Card variant="comparison" size="lg" interactive>
                <Card.Header icon="mdi:compare">
                  <Card.Title>Before vs After Server Actions</Card.Title>
                </Card.Header>
                <Card.Content>
                  <div className="comparison-table">
                    <div className="comparison-row comparison-header">
                      <div className="comparison-cell">Before (React 18)</div>
                      <div className="comparison-cell">After (React 19)</div>
                    </div>
                    <div className="comparison-row">
                      <div className="comparison-cell comparison-cell--before">
                        <div className="comparison-item">❌ Manual API routes</div>
                        <div className="comparison-item">❌ Complex form handling</div>
                        <div className="comparison-item">❌ Separate validation logic</div>
                        <div className="comparison-item">❌ Loading state management</div>
                      </div>
                      <div className="comparison-cell comparison-cell--after">
                        <div className="comparison-item">✅ Automatic server handling</div>
                        <div className="comparison-item">✅ Native form integration</div>
                        <div className="comparison-item">✅ Built-in validation</div>
                        <div className="comparison-item">✅ Automatic loading states</div>
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              {/* Enhanced Benefits */}
              <Stack gap="lg">
                {[
                  {
                    icon: 'mdi:rocket',
                    title: 'Zero Boilerplate', 
                    description: 'Write server logic directly in components. No API routes, no fetch calls.',
                    metric: '70% Less Code'
                  },
                  {
                    icon: 'mdi:security',
                    title: 'Security by Default',
                    description: 'CSRF protection, request validation, and secure handling built-in.',
                    metric: '100% Secure'
                  },
                  {
                    icon: 'mdi:flash',
                    title: 'Performance First',
                    description: 'Progressive enhancement with instant client-side interactions.',
                    metric: '50% Faster'
                  }
                ].map((item, index) => (
                  <Card key={`server-action-${index}`} variant="feature" size="md" interactive>
                    <Card.Header>
                      <div className="metric-container">
                        <Icon icon={item.icon} className="feature-icon feature-icon--large" />
                        <Badge variant="success" size="sm">{item.metric}</Badge>
                      </div>
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

      {/* Enhanced Migration Guide */}
      <Section variant="cta" size="lg">
        <Container size="wide">
          <Section.Header centered>
            <Badge variant="primary" icon="mdi:rocket-launch">
              Ready to Upgrade?
            </Badge>
            <Section.Title size="xl">Your React 19 Migration Journey</Section.Title>
            <Section.Subtitle>
              A comprehensive, battle-tested guide to upgrading safely and efficiently
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