# Business Listings App

## Requirements

The requirements for the app are in accordance with those stated in the [link](https://gist.github.com/tunde-borderlesshr/7f37aa6672ccfc18dc7254955756be49).

Deliverables for this project are two links

1. The GitHub repository(which you have found if you are reading this)
2. A netlify [link](https://competent-bohr-f33147.netlify.app/) to the running application

### Project Setup and Design Approach

The UI Library of choice for this application is React. The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with a custom override - Create React App Configuration Override(CRACO) to allow for more configuration flexibility. Some of the design considerations necessary include(but not limited to)

1. Styling
2. Routing
3. State/Cache Management and Data Fetching
4. Performance

#### Styling

Styling for the project was done with [Tailwind CSS](https://tailwindcss.com/) and mostly makes use of the defaults available with tailwind but could easily be customized if there's a need for that

#### Routing

[React Router v5](https://reactrouter.com/) was used mostly because it offers a declarative approach to Routing closely related to the way React works

#### State/Cache Management

Mostly because the application is not really huge, I opted to use React's [context API](https://reactjs.org/docs/context.html) as the state manager for authentication, and also as the requirement states to use local storage to persist the state, there are custom hooks for querying and mutating state from local storage. The hooks directory in the source folder has all the hooks you might come across in every other place across the entire application and the context folder contains the context provider HOC and some custom hooks for setting and updating the authentication state.

For this section, there are some other alternatives - namely [Redux](https://redux.js.org/) which I explored but not in the source code but decided not to go with that because in the real world, query and mutating data(which we're managing through local storage) will be happening through API requests to a backend service and so it's not exactly client state which is where Redux really shines.

#### Performance

Here, I've decided not to use most of the performance hooks provided by React - well, because they usually add some [overhead](https://kentcdodds.com/blog/usememo-and-usecallback) to the codebase. However, there are some useCallback and useMemo hooks in the useAsync hook where it seems very necessary to prevent unnecessary application re-renders.
