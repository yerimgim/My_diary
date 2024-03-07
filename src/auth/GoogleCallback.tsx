import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id_token = searchParams.get('id_token');
  const access_token = searchParams.get('access_token');

  console.log(access_token);

  const getStrapiAuth = async (url: string, params: object) => {
    const response = await axios.get(url, { params });
    if (response.status === 200) {
      console.log(response.data.jwt);
      console.log(response.data); // id, displayName
      localStorage.setItem('accessToken', response.data.jwt);
      localStorage.setItem('tempId', response.data.user.email);
      response.data.user.displayName = response.data.user.username;
      localStorage.setItem('user', JSON.stringify(response.data.user));
      //
      navigate('/calendar', { replace: true });
    } else {
      console.log('err');
      return <></>;
    }
  };
  // Strapi
  //
  const url = `${import.meta.env.VITE_REST_API_KEY}/api/auth/google/callback`;
  const params = {
    id_token: id_token,
    access_token: access_token,
  };

  getStrapiAuth(url, params);

  return <div>loading..</div>;
};

export default GoogleCallback;
