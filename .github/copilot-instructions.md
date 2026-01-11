# Copilot Instructions for Streamiva OIDC Keycloak Theme

## Project Purpose

**Streamiva** is a modern Keycloak login theme designed for content streamers. The design philosophy emphasizes a gaming-oriented vibe while maintaining a contemporary and user-friendly aesthetic. The visual identity centers on the brand's purple (`#5e17eb`) and white color scheme, creating a vibrant yet professional appearance suitable for streamer communities and gaming platforms.

## Project Overview

This is a **Keycloak login theme** built with React, TypeScript, Tailwind CSS v4, shadcn/ui, and Keycloakify v11. It provides customizable UI for all 35+ Keycloak authentication pages, email templates with i18n support, and Storybook integration.

## Architecture & Data Flow

### Core Layers

1. **KcContext** (`src/login/KcContext.ts`)

    - Extends Keycloakify's context with custom properties (client baseUrl, darkMode flag)
    - Provides access to Keycloak server state (realm, user, messages, etc.)
    - Use `useKcContext()` hook in all pages to access authenticated session data

2. **Page Router** (`src/login/pages/PageIndex.tsx`)

    - Routes to 40+ page components based on `kcContext.pageId` (e.g., "login.ftl", "register.ftl")
    - Each page: import `useKcContext()` and assert the expected `pageId` at the top

3. **Template Component** (`src/login/components/Template/Template.tsx`)

    - Wraps all pages with consistent layout: header, alerts, form, social providers, info section
    - Handles theme toggle, language selection, dark mode via `ThemeProvider`
    - Manages Keycloak CSS class application via `useKcClsx()`

4. **i18n System** (`src/login/i18n.ts` and `src/email/i18n.ts`)
    - Built with i18next + react-i18next for login pages
    - Email templates use separate `i18n.ts` with translation files in `src/email/locales/{en,fr,ar}/`
    - Custom translations are defined inline in `i18n.ts` files (e.g., "welcomeMessage", "organization.selectTitle")

### Key Integration Points

-   **Keycloakify**: Converts React components to Freemarker templates during build; uses `keycloakify build`
-   **Vite Build Pipeline**: TypeScript compilation → React build → Keycloakify processing → Email theme generation
-   **Email Templates**: Generated via `keycloakify-emails` plugin in `vite.config.ts` postBuild hook

## Critical Workflows

### Development

```bash
pnpm dev                    # HMR on localhost:5173
pnpm storybook              # Component preview on port 6006
pnpm emails:preview         # Preview email templates
```

### Production Build

```bash
pnpm build                  # TypeScript + Vite build
pnpm build-keycloak-theme  # Build + Keycloakify (generates .jar)
pnpm format                 # Prettier formatting (run before commit)
```

### Email Development

```bash
pnpm emails:check          # Validate email templates (jsx-email)
pnpm emails:preview        # Open email preview in browser
```

## Project Conventions

### Design & Branding

-   **Primary Color**: Purple (`#5e17eb`) - used for accents, buttons, and interactive elements
-   **Text**: White on dark backgrounds; dark text on light backgrounds (respects light/dark mode)
-   **Vibe**: Gaming-oriented + modern + streamer-friendly; bold, energetic, yet professional
-   **Accessibility**: Maintain contrast ratios for WCAG compliance across both light and dark themes
-   Dark mode support is critical given the gaming/streamer demographic preference

### Page Component Pattern

```typescript
// src/login/pages/{category}/{Name}/Page.tsx
export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "expected.ftl");  // ← Always assert!
    const { msg } = useI18n();

    return <Template {...props}>{children}</Template>;
}
```

### UI Components

-   Use shadcn/ui components from `src/components/ui/` (Button, Input, Select, etc.)
-   All components use Radix UI primitives + Tailwind CSS v4
-   Dark mode support via `theme-provider.tsx` context
-   Style with Tailwind classes directly (no CSS files for components)

### i18n Key Naming

-   Login pages: CamelCase keys like `"loginAccountTitle"`, `"organization.selectTitle"`
-   Email templates: Use dot notation for namespaces (e.g., `"requiredAction.UPDATE_PASSWORD"`)
-   Lookup with `msg()` or `msgStr()` from `useI18n()`

### File Organization

-   **Pages**: `src/login/pages/{feature}/{PageName}/` (Form.tsx, Info.tsx, SocialProviders.tsx as sub-components)
-   **Shared Logic**: `src/login/shared/` (e.g., redirectUrlOrigin)
-   **Components**: `src/components/` (Theme, Languages, UI library)
-   **Email Assets**: `src/email/assets/`, templates in `src/email/templates/`

## Common Tasks

### Adding a New Login Page

1. Create directory: `src/login/pages/{category}/{PageName}/`
2. Create `Page.tsx` with proper context assertion
3. Add to `src/login/pages/PageIndex.tsx` with pageId mapping
4. Use Template component for layout consistency
5. Test in Storybook

### Customizing Email Templates

1. Edit template in `src/email/templates/{template-name}.tsx`
2. Add translations to `src/email/locales/{locale}/translation.json`
3. Run `pnpm emails:preview` to test
4. Build includes email theme generation automatically

### Dark Mode Implementation

-   Theme state managed in `ThemeProvider` (localStorage key: "isDarkMode")
-   Classes applied to root via `html` and `body` elements
-   Radix UI + Tailwind handle dark variant CSS via `data-state` attributes
-   Access theme state: `useTheme()` from `theme-provider.tsx`

## Dependencies to Know

-   **@keycloakify/login-ui**: Core login page types, hooks (`useKcContext`, `useKcClsx`)
-   **@radix-ui/\***: Accessible component primitives (Checkbox, Dropdown, Dialog, etc.)
-   **tailwindcss/vite**: v4 Tailwind integration (no CSS file imports needed)
-   **i18next + react-i18next**: Multi-language support
-   **jsx-email**: Email template rendering with TypeScript
-   **keycloakify-emails**: Email build plugin
-   **lucide-react**: Icon library (used in Template component)
-   **clsx**: Conditional class name utility (paired with Tailwind)

## Type Safety Notes

-   All pages must import and use `type KcContext` from `KcContext.ts`
-   Extend `KcContextExtension` type if adding new properties to context
-   Email templates are fully typed via jsx-email and React
-   Theme and language state is typed in respective provider files

## Build Output

-   Login theme JAR: `dist/keycloak-theme/{theme-name}.jar` (deployed to Keycloak)
-   Email theme: Generated in Keycloakify build dir during postBuild
-   Static assets: Placed in `dist/` alongside theme resources

## Debugging Tips

-   **Missing translations**: Check `msg()` key exists in both `en` and `ar`/`fr` sections of i18n.ts
-   **Assertion errors**: Ensure `assert(kcContext.pageId === "expected.ftl")` matches actual page
-   **Style issues**: Remember Tailwind v4 uses native CSS nesting; check `@apply` syntax if using
-   **Email preview failing**: Run `pnpm emails:check` to validate JSX-Email structure
