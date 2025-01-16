import { Link } from 'react-router-dom';

import { RoutePath } from '../constant/route';
import { PageWrapper } from '../App.styled';

const NotFound = () => {
  return (
    <PageWrapper vertical align="center">
      <h1>Not Found</h1>
      <Link to={RoutePath.FANCY_FORM}>Back to Fancy Form</Link>
    </PageWrapper>
  );
};

export default NotFound;
