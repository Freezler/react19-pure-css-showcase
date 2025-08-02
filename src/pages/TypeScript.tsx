import { Icon } from '@iconify/react'
import { CodeBlock } from '../components/ui/CodeBlock'
import { useState } from 'react'

export function TypeScript() {
  const [selectedDemo, setSelectedDemo] = useState<'inference' | 'strict' | 'react19'>('inference')

  const demos = {
    inference: {
      title: 'Type Inference Magic',
      description: 'TypeScript automatically infers types, reducing boilerplate',
      code: `// ✨ TypeScript infers these types automatically
const user = {
  id: 1,
  name: "Alice",
  isActive: true,
  preferences: {
    theme: "dark",
    notifications: true
  }
} // Type: { id: number; name: string; isActive: boolean; ... }

// Generic function with inference
function createApiResponse<T>(data: T, status = 200) {
  return {
    data,
    status,
    timestamp: new Date().toISOString()
  }
} // Return type inferred automatically

const userResponse = createApiResponse(user)
// Type: { data: typeof user; status: number; timestamp: string }
`
    },
    strict: {
      title: 'Strict Type Safety',
      description: 'Catch errors at compile time, not runtime',
      code: `// 🛡️ Strict null checks prevent runtime errors
interface UserProfile {
  name: string
  email?: string // Optional property
  avatar?: string | null // Explicitly nullable
}

function displayUser(profile: UserProfile) {
  // ❌ TypeScript error: Object is possibly undefined
  // console.log(profile.email.toLowerCase())
  
  // ✅ Proper null checking
  if (profile.email) {
    console.log(profile.email.toLowerCase())
  }
  
  // ✅ Optional chaining (TypeScript 3.7+)
  console.log(profile.email?.toLowerCase() ?? 'No email')
}

// 🎯 Discriminated unions for type safety
type ApiState = 
  | { status: 'loading' }
  | { status: 'success'; data: any[] }
  | { status: 'error'; message: string }

function handleApiState(state: ApiState) {
  switch (state.status) {
    case 'loading':
      return <div>Loading...</div>
    case 'success':
      // TypeScript knows 'data' exists here
      return <div>{state.data.length} items</div>
    case 'error':
      // TypeScript knows 'message' exists here
      return <div>Error: {state.message}</div>
  }
}
`
    },
    react19: {
      title: 'React 19 + TypeScript',
      description: 'Enhanced type safety with React 19 features',
      code: `// 🚀 React 19 Server Components with TypeScript
import { ReactNode } from 'react'

interface ServerComponentProps {
  children: ReactNode
  fallback?: ReactNode
}

// Server Component (runs on server)
async function UserProfile({ userId }: { userId: string }) {
  // ✅ TypeScript ensures userId is string
  const user = await fetchUser(userId)
  
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  )
}

// 🎯 React 19 Actions with type safety
function useUserActions() {
  const [isPending, startTransition] = useTransition()
  
  const updateUser = async (formData: FormData) => {
    startTransition(async () => {
      // TypeScript ensures type safety in server actions
      const name = formData.get('name') as string
      const email = formData.get('email') as string
      
      await updateUserProfile({ name, email })
    })
  }
  
  return { updateUser, isPending }
}

// 🌟 Enhanced form handling with React 19
function ProfileForm() {
  const { updateUser, isPending } = useUserActions()
  
  return (
    <form action={updateUser}>
      <input name="name" type="text" required />
      <input name="email" type="email" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  )
}
`
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header__content">
          <div className="page-header__icon">
            <Icon icon="logos:typescript-icon" />
          </div>
          <div className="page-header__text">
            <h1 className="page-header__title">TypeScript Integration</h1>
            <p className="page-header__subtitle">
              Type-safe React development with enhanced developer experience and compile-time error prevention
            </p>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* TypeScript Benefits Section */}
        <section className="content-section">
          <h2 className="section-title">Why TypeScript?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-card__icon">
                <Icon icon="mdi:shield-check" />
              </div>
              <h3 className="benefit-card__title">Type Safety</h3>
              <p className="benefit-card__description">
                Catch errors at compile time, not runtime. Prevent common bugs like undefined property access.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">
                <Icon icon="mdi:lightbulb" />
              </div>
              <h3 className="benefit-card__title">IntelliSense</h3>
              <p className="benefit-card__description">
                Enhanced autocomplete, refactoring, and navigation. Better developer experience across all editors.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">
                <Icon icon="mdi:rocket" />
              </div>
              <h3 className="benefit-card__title">Scalability</h3>
              <p className="benefit-card__description">
                Maintain large codebases with confidence. Clear interfaces and contracts between components.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">
                <Icon icon="mdi:account-group" />
              </div>
              <h3 className="benefit-card__title">Team Collaboration</h3>
              <p className="benefit-card__description">
                Self-documenting code with clear types. Easier onboarding and code reviews.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="content-section">
          <h2 className="section-title">Interactive TypeScript Examples</h2>
          <div className="demo-tabs">
            <div className="demo-tabs__nav">
              <button
                className={`demo-tabs__button ${selectedDemo === 'inference' ? 'demo-tabs__button--active' : ''}`}
                onClick={() => setSelectedDemo('inference')}
              >
                <Icon icon="mdi:auto-fix" />
                Type Inference
              </button>
              <button
                className={`demo-tabs__button ${selectedDemo === 'strict' ? 'demo-tabs__button--active' : ''}`}
                onClick={() => setSelectedDemo('strict')}
              >
                <Icon icon="mdi:shield" />
                Strict Mode
              </button>
              <button
                className={`demo-tabs__button ${selectedDemo === 'react19' ? 'demo-tabs__button--active' : ''}`}
                onClick={() => setSelectedDemo('react19')}
              >
                <Icon icon="logos:react" />
                React 19
              </button>
            </div>
            <div className="demo-tabs__content">
              <div className="demo-content">
                <div className="demo-content__header">
                  <h3 className="demo-content__title">{demos[selectedDemo].title}</h3>
                  <p className="demo-content__description">{demos[selectedDemo].description}</p>
                </div>
                <CodeBlock
                  code={demos[selectedDemo].code}
                  language="typescript"
                  showLineNumbers
                />
              </div>
            </div>
          </div>
        </section>

        {/* TypeScript Configuration */}
        <section className="content-section">
          <h2 className="section-title">Our TypeScript Configuration</h2>
          <div className="config-showcase">
            <div className="config-showcase__content">
              <h3>Optimized for React 19</h3>
              <p>
                Our TypeScript setup is configured for maximum type safety with React 19 features,
                including server components, actions, and the latest React APIs.
              </p>
              <div className="config-highlights">
                <div className="config-highlight">
                  <Icon icon="mdi:check-circle" />
                  <span>Strict mode enabled</span>
                </div>
                <div className="config-highlight">
                  <Icon icon="mdi:check-circle" />
                  <span>Path mapping configured</span>
                </div>
                <div className="config-highlight">
                  <Icon icon="mdi:check-circle" />
                  <span>React 19 types included</span>
                </div>
                <div className="config-highlight">
                  <Icon icon="mdi:check-circle" />
                  <span>ES2022 target for modern features</span>
                </div>
              </div>
            </div>
            <div className="config-showcase__code">
              <CodeBlock
                code={`{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noEmit": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/utils/*": ["./src/utils/*"]
    }
  },
  "include": ["src", "types"],
  "exclude": ["node_modules"]
}`}
                language="json"
                title="tsconfig.json"
              />
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="content-section">
          <h2 className="section-title">TypeScript Best Practices</h2>
          <div className="best-practices">
            <div className="practice-card">
              <div className="practice-card__header">
                <Icon icon="mdi:star" />
                <h3>Use Strict Mode</h3>
              </div>
              <p>Enable strict TypeScript settings for maximum type safety and early error detection.</p>
            </div>
            <div className="practice-card">
              <div className="practice-card__header">
                <Icon icon="mdi:puzzle" />
                <h3>Prefer Type Inference</h3>
              </div>
              <p>Let TypeScript infer types when possible. Only add explicit types when inference isn't sufficient.</p>
            </div>
            <div className="practice-card">
              <div className="practice-card__header">
                <Icon icon="mdi:shield-outline" />
                <h3>Use Discriminated Unions</h3>
              </div>
              <p>Model complex state with discriminated unions for type-safe state management.</p>
            </div>
            <div className="practice-card">
              <div className="practice-card__header">
                <Icon icon="mdi:code-braces" />
                <h3>Generic Components</h3>
              </div>
              <p>Create reusable components with generics for flexible, type-safe component APIs.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}