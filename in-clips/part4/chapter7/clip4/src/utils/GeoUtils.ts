export const kakaoApiKey = 'd120c4129d84963f1f425d17e2752852';

export const getAddressFromCoords = (
  latitude: number,
  longitude: number,
): Promise<string | null> => {
  return fetch(
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
    {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${kakaoApiKey}`,
      },
    },
  )
    .then(result => result.json())
    .then(result => {
      console.log(result);
      if (result.meta.total_count === 0) {
        return null;
      }

      if (result.documents.length === 0) {
        return null;
      }

      const addressItem = result.documents[0];
      return addressItem.address.address_name;
    });
};
