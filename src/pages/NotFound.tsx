import { Icon } from '@iconify/react'
import { Link } from '@tanstack/react-router'
import { Container, Stack, Cluster, Card, Button } from '../components/ui'

export function NotFound() {
  return (
    <div className="page-transition-container">
      <Container size="narrow">
        <Stack gap="xl" align="center">
        <div className="error-icon">
          <Icon icon="mdi:emoticon-confused" />
        </div>

        <h1 className="error-title">404 - Page Not Found</h1>

        <p className="error-description">
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>

        <Cluster gap="md" justify="center">
          <Button as={Link} to="/" variant="primary" icon="mdi:home">
            Go Home
          </Button>
          <Button 
            variant="secondary" 
            icon="mdi:arrow-left"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </Cluster>

        <Card variant="default" size="md">
          <Card.Header>
            <Card.Title>Quick Links</Card.Title>
          </Card.Header>
          <Card.Content>
            <Cluster gap="md" justify="center">
              <Button as={Link} to="/" variant="ghost" size="sm" icon="mdi:home">
                Home
              </Button>
              <Button as={Link} to="/about" variant="ghost" size="sm" icon="mdi:information">
                About
              </Button>
            </Cluster>
          </Card.Content>
        </Card>
        </Stack>
      </Container>
    </div>
  )
}
