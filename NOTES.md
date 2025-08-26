### Key Design Decisions
- State Management: Used React's built-in useState instead of Redux/Zustand for simplicity. All state lives in the Dashboard component and flows down as props.
- Data Fetching: Implemented debounced search (300ms) to avoid excessive API calls while typing. Separated static data (warehouses, KPIs) from dynamic product data to optimize re-renders.
- UI Architecture: Built with shadcn/ui components for consistency. Used a drawer pattern for product actions rather than modal to save screen space and provide better mobile experience.
### Trade-offs Made
- Performance vs Simplicity: Chose client-side filtering over server-side pagination for faster interactions, but this won't scale beyond ~1000 products.
- Real-time vs Batch Updates: Updates happen optimistically (UI updates immediately) but don't sync across users. Good for demo, needs WebSocket/polling for production.
- Validation: Basic client-side validation only. Transfer quantity checks exist but no comprehensive error handling for edge cases.
### Improvements with More Time
- Error Handling: Add proper error states, retry mechanisms, and user feedback for failed operations.
- Performance: Implement virtual scrolling for large datasets, server-side search/filtering, and proper caching strategy.
- UX Enhancements: Add confirmation dialogs for critical actions, undo functionality, bulk operations, and keyboard shortcuts for power users.