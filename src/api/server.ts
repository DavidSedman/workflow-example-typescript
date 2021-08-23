import { api } from 'api';

const port = 8080;

api.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
