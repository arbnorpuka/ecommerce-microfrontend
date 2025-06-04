# Microfrontend Architecture Research Example

This project demonstrates various aspects of microfrontend architecture through a practical implementation. It showcases how different teams can work independently while maintaining a cohesive user experience.

## Project Structure

```
packages/
├── host/           # Container application
├── mfe1/           # Microfrontend 1 (Product Catalog - React)
├── mfe2/           # Microfrontend 2 (Shopping Cart - React)
├── mfe3/           # Microfrontend 3 (Checkout - Vue)
└── shared/         # Shared components, theme, context, and utilities
```

## Key Features

*   **Host Application:** Serves as the main shell, provides navigation, and hosts shared functionalities.
    *   Displays a **Product Slider** on the home page with "Add to Cart" functionality.
*   **Product Catalog (MFE1 - React):** Displays a list of products fetched from an API, allowing users to add items to the cart.
*   **Shopping Cart (MFE2 - React):** Shows items added to the cart, allows quantity updates, item removal, and proceeding to checkout.
*   **Checkout (MFE3 - Vue):** A Vue-based microfrontend that displays the order summary from `localStorage` and allows users to simulate placing an order. It clears the cart using a custom event system that updates other MFEs.
*   **Shared Library:** Contains common UI components (Button, Notification), theme, cart context, notification context, and utility functions, ensuring consistency and reusability across microfrontends.

## Research Aspects Demonstrated

### 1. Technical Independence and Team Autonomy
- Each microfrontend is a separate package with its own dependencies
- Teams can choose their own development tools and practices
- Independent deployment cycles

### 2. Technology Flexibility
- Support for different frameworks (React in mfe1, mfe2, host; Vue in mfe3)
- Independent technology choices per team
- Framework-agnostic communication patterns

### 3. Incremental Upgrades and Risk Reduction
- Isolated deployment of individual features
- Gradual migration path
- Independent versioning

### 4. Build-Time Integration
- Module Federation for build-time integration
- Shared dependencies optimization
- Build-time type checking

### 5. Runtime Integration via JavaScript
- Dynamic loading of microfrontends
- Runtime communication patterns (e.g., custom events for cart clearing between Vue MFE and React MFEs)
- Event-based architecture

### 6. Web Components
- Framework-agnostic components
- Shadow DOM encapsulation
- Custom element definitions

### 7. Shared State Management
- Cross-microfrontend state management for cart using `localStorage` and React Context.
- Event-based communication (custom `window` events) to synchronize state changes across different framework MFEs (e.g., clearing cart from Vue MFE updates React MFE).
- Shared context patterns for notifications and cart.

### 8. Performance Overhead
- Lazy loading of microfrontends
- Shared dependency optimization
- Performance monitoring

### 9. Styling and Design Consistency
- Shared design system
- CSS-in-JS solutions
- Theme consistency

### 10. Team Structure Alignment
- Clear ownership boundaries
- Independent team workflows
- Cross-team collaboration patterns

### 11. Documentation and Governance
- Clear integration patterns
- API documentation
- Versioning strategy

### 12. Learning Curve and Developer Experience
- Developer tooling
- Local development setup
- Debugging strategies

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development servers:
```bash
npm start
```

3. Access the applications:
- Host: http://localhost:3000
- MFE1 (Product Catalog): http://localhost:3001
- MFE2 (Shopping Cart): http://localhost:3002
- MFE3 (Checkout): http://localhost:3003

## Development

Each microfrontend can be developed independently:

```bash
# Start individual applications
npm run start:host
npm run start:mfe1
npm run start:mfe2
npm run start:mfe3
```

## Building for Production

```bash
npm run build
```

## Contributing

Each team should:
1. Work within their designated microfrontend
2. Follow the established communication patterns
3. Maintain backward compatibility
4. Document their changes 