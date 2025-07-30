import { useState, useRef, useEffect } from 'react';
import { 
  useOptimisticMutation, 
  useAdvancedForm, 
  useViewTransitions,
  useIntersectionObserver,
  useLazyLoad,
  useWebShare,
  useNotifications,
  useWebWorker,
  usePerformanceMonitoring,
  useSpeculation 
} from '../hooks/useAdvancedAPIs';
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
} from '../components/ui';
import { Icon } from '@iconify/react';

interface DemoItem {
  id: string;
  title: string;
  description: string;
  timestamp: number;
}

export function AdvancedAPIs() {
  const [items, setItems] = useState<DemoItem[]>([
    {
      id: '1',
      title: 'Initial Item',
      description: 'This is a pre-loaded item',
      timestamp: Date.now() - 10000
    }
  ]);

  // React 19 Optimistic Updates Demo
  const { data: optimisticItems, mutate } = useOptimisticMutation<DemoItem>(
    items,
    '/api/items'
  );

  // React 19 Advanced Form Demo
  const { state: formState, dispatch: submitForm, isPending, isSuccess, error } = useAdvancedForm<DemoItem>(
    '/api/form-submit',
    { data: {} as DemoItem, pending: false },
    { optimistic: true }
  );

  // View Transitions Demo
  const { navigate: transitionNavigate, setTransitionName, isSupported: viewTransitionsSupported } = useViewTransitions();

  // Intersection Observer Demo
  const [visibleElements, setVisibleElements] = useState<string[]>([]);
  const { observe: observeIntersection } = useIntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('data-element-id');
        if (id) {
          if (entry.isIntersecting) {
            setVisibleElements(prev => [...new Set([...prev, id])]);
          } else {
            setVisibleElements(prev => prev.filter(elementId => elementId !== id));
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  // Web Share Demo
  const { share, isSharing, shareResult, canShare, isSupported: shareSupported } = useWebShare();

  // Notifications Demo
  const { permission, requestPermission, showNotification, isSupported: notificationsSupported } = useNotifications();

  // Web Worker Demo
  const { workerId, isLoading: workerLoading, postMessage, isReady: workerReady, isSupported: workerSupported } = useWebWorker(`
    self.onmessage = function(e) {
      const { type, payload } = e.data;
      if (type === 'FIBONACCI') {
        const result = fibonacci(payload);
        self.postMessage({ type: 'FIBONACCI_RESULT', payload: result });
      }
    };
    function fibonacci(n) {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
  `);

  // Performance Monitoring Demo
  const { metrics, measureFunction, measureAsync, getVitals, getMemoryUsage } = usePerformanceMonitoring();

  // Speculation API Demo
  const { preloadPage, prefetchAPI, isSupported: speculationSupported } = useSpeculation();

  const demoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Setup intersection observer for demo elements
    if (demoRefs.current.length > 0) {
      observeIntersection(demoRefs.current.filter(Boolean));
    }
  }, [observeIntersection]);

  const addOptimisticItem = () => {
    const newItem: DemoItem = {
      id: Date.now().toString(),
      title: `Optimistic Item ${optimisticItems.length + 1}`,
      description: 'Added with optimistic updates',
      timestamp: Date.now()
    };
    mutate(newItem);
  };

  const handleShare = async () => {
    await share({
      title: 'Advanced APIs Demo',
      text: 'Check out these modern web APIs!',
      url: window.location.href
    });
  };

  const handleNotification = async () => {
    if (permission !== 'granted') {
      await requestPermission();
    }
    await showNotification('API Demo', {
      body: 'Modern web APIs are working!',
      icon: '/vite.svg'
    });
  };

  const calculateFibonacci = async () => {
    if (workerReady) {
      const result = await postMessage('FIBONACCI', 10);
      console.log('Fibonacci result:', result);
    }
  };

  return (
    <div className="advanced-apis-page">
      {/* Hero Section */}
      <Section variant="hero" size="lg">
        <Container size="wide">
          <Stack gap="xl" align="center">
            <Icon icon="mdi:api" className="text-6xl text-primary" />
            <Section.Header centered>
              <Section.Title size="3xl" gradient>
                Advanced Web APIs
              </Section.Title>
              <Section.Subtitle>
                Explore cutting-edge browser APIs with React 19 integration.
                Modern web platform capabilities at your fingertips.
              </Section.Subtitle>
            </Section.Header>
          </Stack>
        </Container>
      </Section>

      {/* React 19 Optimistic Updates */}
      <Section variant="content" size="lg">
        <Container size="wide">
          <Section.Header>
            <Badge variant="primary" icon="mdi:lightning-bolt">
              React 19
            </Badge>
            <Section.Title size="xl">Optimistic Updates</Section.Title>
            <Section.Subtitle>
              Instant UI updates with automatic rollback on server errors
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Grid columns="auto-fit" minWidth="350px" gap="2xl">
              <Card variant="feature" size="lg">
                <Card.Header>
                  <Card.Title>Interactive Demo</Card.Title>
                </Card.Header>
                <Card.Content>
                  <Stack gap="lg">
                    <Button 
                      onClick={addOptimisticItem}
                      icon="mdi:plus"
                      fullWidth
                    >
                      Add Item Optimistically
                    </Button>

                    <Stack gap="sm">
                      {optimisticItems.map((item) => (
                        <Card 
                          key={item.id}
                          variant="default"
                          size="sm"
                          className={item.pending ? 'animate-pulse-glow' : ''}
                        >
                          <Card.Content>
                            <Cluster gap="sm" justify="between" align="center">
                              <Stack gap="xs">
                                <div className="font-medium">{item.title}</div>
                                <div className="text-sm text-muted">{item.description}</div>
                              </Stack>
                              {item.pending && (
                                <Badge variant="warning" size="sm">Pending</Badge>
                              )}
                            </Cluster>
                          </Card.Content>
                        </Card>
                      ))}
                    </Stack>
                  </Stack>
                </Card.Content>
              </Card>

              <Card variant="info" size="lg">
                <Card.Header>
                  <Card.Title>Implementation</Card.Title>
                </Card.Header>
                <Card.Content>
                  <CodeBlock language="typescript">
{`const { data, mutate } = useOptimisticMutation(
  initialData,
  '/api/endpoint'
);

// Instant UI update
mutate(newItem);`}
                  </CodeBlock>
                </Card.Content>
              </Card>
            </Grid>
          </Section.Content>
        </Container>
      </Section>

      {/* Intersection Observer */}
      <Section variant="feature" size="lg">
        <Container size="wide">
          <Section.Header>
            <Badge variant="success" icon="mdi:eye">
              Observer API
            </Badge>
            <Section.Title size="xl">Intersection Observer</Section.Title>
            <Section.Subtitle>
              Efficient visibility detection for scroll animations and lazy loading
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Grid columns="auto-fit" minWidth="300px" gap="xl">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  ref={(el) => demoRefs.current[num - 1] = el}
                  data-element-id={`demo-${num}`}
                  className="scroll-reveal"
                >
                  <Card 
                    variant="tech" 
                    size="md"
                    className={visibleElements.includes(`demo-${num}`) ? 'animate-bounce-elastic' : ''}
                  >
                    <Card.Header icon="mdi:eye-check">
                      <Card.Title>Element {num}</Card.Title>
                    </Card.Header>
                    <Card.Content>
                      <p>
                        {visibleElements.includes(`demo-${num}`) 
                          ? "🟢 Visible in viewport!" 
                          : "⚪ Not visible yet"}
                      </p>
                    </Card.Content>
                  </Card>
                </div>
              ))}
            </Grid>
          </Section.Content>
        </Container>
      </Section>

      {/* Web Share API */}
      <Section variant="content" size="lg">
        <Container size="wide">
          <Section.Header>
            <Badge variant="secondary" icon="mdi:share">
              Web Platform
            </Badge>
            <Section.Title size="xl">Web Share API</Section.Title>
            <Section.Subtitle>
              Native sharing capabilities integrated with the operating system
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Grid columns="auto-fit" minWidth="350px" gap="2xl">
              <Card variant="default" size="lg">
                <Card.Header>
                  <Card.Title>Share Demo</Card.Title>
                </Card.Header>
                <Card.Content>
                  <Stack gap="md">
                    <div className="text-center">
                      <Icon icon="mdi:share-variant" className="text-4xl text-secondary mb-4" />
                      <p>Support: {shareSupported ? '✅ Supported' : '❌ Not supported'}</p>
                      {shareResult !== null && (
                        <p className="mt-2">
                          Last share: {shareResult ? '✅ Success' : '❌ Failed'}
                        </p>
                      )}
                    </div>
                    
                    <Button 
                      onClick={handleShare}
                      disabled={!canShare || isSharing}
                      loading={isSharing}
                      icon="mdi:share"
                      fullWidth
                    >
                      {isSharing ? 'Sharing...' : 'Share This Page'}
                    </Button>
                  </Stack>
                </Card.Content>
              </Card>

              <Card variant="info" size="lg">
                <Card.Header>
                  <Card.Title>Implementation</Card.Title>
                </Card.Header>
                <Card.Content>
                  <CodeBlock language="typescript">
{`const { share, canShare } = useWebShare();

await share({
  title: 'My App',
  text: 'Check this out!',
  url: window.location.href
});`}
                  </CodeBlock>
                </Card.Content>
              </Card>
            </Grid>
          </Section.Content>
        </Container>
      </Section>

      {/* Web Notifications */}
      <Section variant="feature" size="lg">
        <Container size="wide">
          <Section.Header>
            <Badge variant="warning" icon="mdi:bell">
              Notifications
            </Badge>
            <Section.Title size="xl">Web Notifications</Section.Title>
            <Section.Subtitle>
              Push notifications with permission management
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Grid columns="auto-fit" minWidth="350px" gap="2xl">
              <Card variant="default" size="lg">
                <Card.Header>
                  <Card.Title>Notification Demo</Card.Title>
                </Card.Header>
                <Card.Content>
                  <Stack gap="md">
                    <div className="text-center">
                      <Icon icon="mdi:bell-ring" className="text-4xl text-warning mb-4" />
                      <p>Support: {notificationsSupported ? '✅ Supported' : '❌ Not supported'}</p>
                      <p>Permission: {permission}</p>
                    </div>
                    
                    <Button 
                      onClick={handleNotification}
                      icon="mdi:bell"
                      fullWidth
                      variant={permission === 'granted' ? 'primary' : 'outline'}
                    >
                      {permission === 'granted' ? 'Show Notification' : 'Request Permission'}
                    </Button>
                  </Stack>
                </Card.Content>
              </Card>

              <Card variant="info" size="lg">
                <Card.Header>
                  <Card.Title>Implementation</Card.Title>
                </Card.Header>
                <Card.Content>
                  <CodeBlock language="typescript">
{`const { 
  permission, 
  requestPermission, 
  showNotification 
} = useNotifications();

await showNotification('Title', {
  body: 'Message content',
  icon: '/icon.png'
});`}
                  </CodeBlock>
                </Card.Content>
              </Card>
            </Grid>
          </Section.Content>
        </Container>
      </Section>

      {/* Web Workers */}
      <Section variant="content" size="lg">
        <Container size="wide">
          <Section.Header>
            <Badge variant="info" icon="mdi:worker">
              Performance
            </Badge>
            <Section.Title size="xl">Web Workers</Section.Title>
            <Section.Subtitle>
              Offload heavy computations to background threads
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Grid columns="auto-fit" minWidth="350px" gap="2xl">
              <Card variant="default" size="lg">
                <Card.Header>
                  <Card.Title>Worker Demo</Card.Title>
                </Card.Header>
                <Card.Content>
                  <Stack gap="md">
                    <div className="text-center">
                      <Icon icon="mdi:cpu-64-bit" className="text-4xl text-info mb-4" />
                      <p>Support: {workerSupported ? '✅ Supported' : '❌ Not supported'}</p>
                      <p>Status: {workerReady ? '🟢 Ready' : workerLoading ? '🟡 Loading' : '🔴 Not ready'}</p>
                    </div>
                    
                    <Button 
                      onClick={calculateFibonacci}
                      disabled={!workerReady}
                      loading={workerLoading}
                      icon="mdi:calculator"
                      fullWidth
                    >
                      Calculate Fibonacci (Background)
                    </Button>
                  </Stack>
                </Card.Content>
              </Card>

              <Card variant="info" size="lg">
                <Card.Header>
                  <Card.Title>Implementation</Card.Title>
                </Card.Header>
                <Card.Content>
                  <CodeBlock language="typescript">
{`const { postMessage, isReady } = useWebWorker(\`
  self.onmessage = function(e) {
    // Heavy computation here
    const result = heavyCalculation(e.data);
    self.postMessage(result);
  };
\`);

const result = await postMessage('CALCULATE', data);`}
                  </CodeBlock>
                </Card.Content>
              </Card>
            </Grid>
          </Section.Content>
        </Container>
      </Section>

      {/* Performance Monitoring */}
      <Section variant="feature" size="lg">
        <Container size="wide">
          <Section.Header>
            <Badge variant="error" icon="mdi:speedometer">
              Monitoring
            </Badge>
            <Section.Title size="xl">Performance Observer</Section.Title>
            <Section.Subtitle>
              Real-time performance metrics and Core Web Vitals
            </Section.Subtitle>
          </Section.Header>

          <Section.Content>
            <Grid columns="auto-fit" minWidth="280px" gap="xl">
              <Card variant="stat" size="md">
                <Card.Content>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">
                      {metrics.lcp || 'N/A'}
                    </div>
                    <div className="text-sm text-muted">Largest Contentful Paint</div>
                  </div>
                </Card.Content>
              </Card>

              <Card variant="stat" size="md">
                <Card.Content>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success mb-2">
                      {metrics.fid || 'N/A'}
                    </div>
                    <div className="text-sm text-muted">First Input Delay</div>
                  </div>
                </Card.Content>
              </Card>

              <Card variant="stat" size="md">
                <Card.Content>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning mb-2">
                      {metrics.cls || 'N/A'}
                    </div>
                    <div className="text-sm text-muted">Cumulative Layout Shift</div>
                  </div>
                </Card.Content>
              </Card>
            </Grid>

            <div className="mt-8">
              <Card variant="info" size="lg">
                <Card.Header>
                  <Card.Title>Performance Measurement</Card.Title>
                </Card.Header>
                <Card.Content>
                  <CodeBlock language="typescript">
{`const monitoredFunction = measureFunction(
  heavyOperation,
  'heavy-operation'
);

const result = await measureAsync(
  asyncOperation,
  'async-operation'
);`}
                  </CodeBlock>
                </Card.Content>
              </Card>
            </div>
          </Section.Content>
        </Container>
      </Section>
    </div>
  );
}