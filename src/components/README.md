# Components

It is composed by `atomic design` flow and you must follow the rules below.  

## Atomic Design

### Atoms

The most minimum components, such as `Button`, `LOGO` and so on, so the atoms has reusability.

### Molecules

It is middle size components and created by multiple `atoms` like `Atoms + Atoms + ... = Molecules`.

### Organisms

`Molecules + Molecules + ... = Organisms`, and these components only be able to change the state by `dispatch(actions)` or `useEffect (side effects)`.

### Templates

`Organisms + Organisms + ... = Templates`, so each of these represents a single page you can access from the url. It includes `Error Pages`. (Error pages are called when access the wrong hash or path).

### Pages

The components which act routing.